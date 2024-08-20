import React, { useState } from 'react';
import Header from '../../Components/Header/header';
import serachIcon from '../../assets/search.svg';
import Footer from '../../Components/Footer/footer';
import { useParams, useNavigate } from 'react-router-dom';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "../../Components/ui/dialog.jsx";
import { checkDomainAvaiblity, getSuggetion } from '../../lib/domain';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';


const Search = () => {
    const { keyword } = useParams();
    const navigate = useNavigate();
    const [currentDomain, setCurrentDomain] = useState(null);
    const [domain, setDomain] = useState(keyword);
    const [sortOrder, setSortOrder] = useState("popularity");
    const [filter, setFilter] = useState("all");

    const trimedKeyword = decodeURIComponent(keyword).replace(/\s+/g, '');

    const { data: suggetionsData } = useQuery({
        queryKey: [trimedKeyword],
        queryFn: getSuggetion,
        enabled: trimedKeyword !== "undefined",
        staleTime: Infinity
    });

    const { data: domainStatus, isFetching } = useQuery({
        queryKey: [currentDomain],
        queryFn: checkDomainAvaiblity,
        enabled: !!currentDomain,
        staleTime: Infinity
    });

    const sortedData = React.useMemo(() => {
        if (!suggetionsData?.extentions) return [];
        let _data;

        if (filter === "all") _data = suggetionsData?.extentions;
        else if (filter === "start") _data = suggetionsData?.extentions?.filter((_d) => _d.endsWith("$"));
        else if (filter === "end") _data = suggetionsData?.extentions?.filter((_d) => _d.startsWith("$"));

        if (sortOrder === 'popularity') return _data;

        return _data.slice().sort((a, b) => {
            if (sortOrder === 'length') {
                return a.length - b.length;
            } else if (sortOrder === 'alphabetical') {
                return a.replace(/[\^$]/g, "").localeCompare(b.replace(/[\^$]/g, ""));
            } else return a.length - b.length;
        });
    }, [suggetionsData, sortOrder, filter]);

    return (
        <div className='w-full min-h-[100vh] max-h-auto  opensans bg-[#0D0D15] '>
            <Header />
            <div className='bg-[#1D1C28] py-8 flex justify-center text-center' >
                <div className='w-[350px] lg:w-[700px] h-[60px] flex items-center overflow-hidden rounded-lg'>
                    <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder='Search for a domain' className='opensans  bg-transperant outline-none border-none h-[60px] w-full px-4 text-2xl py-2' type="text" />
                    <div onClick={() => navigate(`/search/${domain}`)} className=' bg-[#6feec7] w-[80px] h-full flex items-center justify-center cursor-pointer'>
                        <img className='w-[36px] text-[#111]' src={serachIcon} alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full h-20 flex justify-center items-center gap-4 border-b text-white border-[#5a5a5a]'>
                <p>Sort Results</p>
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className='h-10 opensans outline-none px-2  bg-[#6feec7] rounded-lg text-[#2A2A2A]'>
                    <option value="popularity">Popularity</option>
                    <option value="length">Length</option>
                    <option value="alphabetical">Alphabetical</option>
                </select>
                <p>Search Term Filter</p>
                <select value={filter} onChange={(e) => setFilter(e.target.value)} className='h-10 opensans outline-none px-2 bg-[#6feec7] rounded-lg text-[#2A2A2A]'>
                    <option value="all">All</option>
                    <option value="start">Starts with term</option>
                    <option value="end">Ends with term</option>
                </select>
            </div>
            <div className='flex  min-h-[45vh] max-h-auto items-center my-8 flex-col'>

                <p className='text-xl font-semibold text-white'>{trimedKeyword !== "undefined" ? `Search results for ${trimedKeyword}` : "Try searching domains"}</p>

                <div className='mt-10 py-4 max-w-[1000px] w-full px-4'>

                    {suggetionsData?.avaiblity && suggetionsData?.avaiblity?.map((mainDomain, index) => (
                        <div className='p-5 border border-[#6feec7] border-opacity-25 flex justify-between items-center'>
                            <p className={`${mainDomain.available ? "font-bold text-neutral-100" : "text-neutral-500 line-through font-light"}`}>{mainDomain?.domain}</p>
                            <div className='space-x-3'>
                                {mainDomain.available ?
                                    <a href='https://namecheapreferalurl.com' target="_blank" without rel="noreferrer">
                                        <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-[#2A2A2A]'>Register</button>
                                    </a> :
                                    <p className='text-neutral-500 font-light px-5 py-2'>Not Avaiblable</p>}
                            </div>
                        </div>
                    ))}
                </div>

                <ul className='text-white py-4 max-w-[1000px] w-full px-4 mt-6'>
                    {sortedData.map((result, index) => (
                        <li className='p-5 border border-[#6feec7] border-opacity-25 capitalize flex justify-between' key={index}>
                            <div className='flex'>
                                <p
                                    className='capitalize font-bold text-neutral-100'
                                    dangerouslySetInnerHTML={{ __html: result.replace(/\$/g, `<span class='capitalize text-neutral-300 font-light'>${trimedKeyword}</span>`) }}
                                />
                            </div>
                            <div className='space-x-3'>
                                <Dialog>
                                    <DialogTrigger onClick={() => setCurrentDomain(result.replace(/[\^$]/g, domain))} className='hover:bg-[#6feec7] hover:bg-opacity-15 rounded-sm px-2 py-1 text-sm text-neutral-300'>
                                        .com
                                    </DialogTrigger>
                                    <DialogContent className="bg-neutral-900 text-neutral-100 border-neutral-700 ring-0">
                                        <DialogHeader>
                                            <DialogTitle className="text-center text-3xl">{currentDomain}.com</DialogTitle>
                                            <DialogDescription className="pt-5 text-center flex justify-center items-center text-base text-neutral-300">
                                                {isFetching && <Loader size={40} className='animate-spin m-5' />}

                                                {domainStatus?.available && <span>{currentDomain}.com is still avaiblable</span>}
                                                {(domainStatus && (domainStatus.available === false)) &&
                                                    <span className='text-red-500'>{currentDomain}.com is not avaiblable</span>}
                                            </DialogDescription>
                                        </DialogHeader>

                                        {domainStatus?.available && <DialogFooter className={"sm:justify-center mt-5 sm:flex-col sm:space-x-0 gap-3"}>
                                            <a href='https://namecheapreferalurl.com' target="_blank" without rel="noreferrer">
                                                <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-[#2A2A2A] w-full'>Get Here on Namecheap</button>
                                            </a>
                                            <a href='https://namecheapreferalurl.com' target="_blank" without rel="noreferrer">
                                                <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-[#2A2A2A] w-full'>Get Free with Hosting on Dreamhost</button>
                                            </a>
                                        </DialogFooter>}
                                    </DialogContent>
                                </Dialog>

                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>

            </div>
            <Footer />
        </div>
    )
}

export default Search
