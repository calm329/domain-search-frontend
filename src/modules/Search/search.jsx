import React, { useMemo, useState } from 'react';
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
import { LayoutGrid, Loader, Rows3 } from 'lucide-react';


const Search = () => {
    const { keyword } = useParams();
    const navigate = useNavigate();
    const [currentDomain, setCurrentDomain] = useState(null);
    const [domain, setDomain] = useState(keyword);
    const [sortOrder, setSortOrder] = useState("popularity");
    const [filter, setFilter] = useState("all");
    const [layout, setLayout] = useState("group");

    const trimedKeyword = decodeURIComponent(keyword).replace(/\s+/g, '');

    const { data: suggetionsData, isFetching: isSuggetionFetching } = useQuery({
        queryKey: [trimedKeyword],
        queryFn: getSuggetion,
        enabled: trimedKeyword !== "undefined",
        staleTime: Infinity,
        retry: 1,
        retryDelay: 2500,
    });

    const { data: domainStatus, isFetching } = useQuery({
        queryKey: [currentDomain],
        queryFn: checkDomainAvaiblity,
        enabled: !!currentDomain,
        staleTime: Infinity,
        retry: 1,
        retryDelay: 2500,
    });

    const sortedData = useMemo(() => {
        if (!suggetionsData?.extentions) return [];
        let _data;

        if (filter === "all") _data = suggetionsData?.extentions;
        else if (filter === "start") _data = suggetionsData?.extentions?.filter((_d) => _d.toLowerCase().startsWith(trimedKeyword));
        else if (filter === "end") _data = suggetionsData?.extentions?.filter((_d) => _d.toLowerCase().endsWith(trimedKeyword));

        if (sortOrder === 'popularity') return _data;

        return _data.slice().sort((a, b) => {
            if (sortOrder === 'length') {
                return a.length - b.length;
            } else if (sortOrder === 'alphabetical') {
                return a.replace(/[\^$]/g, "").localeCompare(b.replace(/[\^$]/g, ""));
            } else return a.length - b.length;
        });
    }, [suggetionsData, sortOrder, filter, trimedKeyword]);

    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        };

        return result;
    };

    const groupedItems = useMemo(() => chunkArray(sortedData, 4), [sortedData]);

    return (
        <div className='w-full min-h-[100vh] max-h-auto opensans bg-[#0D0D15] '>
            <Header />
            <div className='bg-[#1D1C28] py-8 flex justify-center text-center' >
                <div className='w-[350px] lg:w-[700px] h-[60px] flex items-center overflow-hidden rounded-lg'>
                    <input value={domain} onChange={(e) => setDomain(e.target.value)} placeholder='Search for a domain' className='opensans bg-transperant outline-none border-none h-[60px] w-full px-4 text-lg lg:text-2xl py-2' type="text" />
                    <div onClick={() => navigate(`/search/${domain}`)} className='bg-[#6feec7] w-[80px] h-full flex items-center justify-center cursor-pointer'>
                        <img className='w-[36px] text-[#111]' src={serachIcon} alt="" />
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col items-center gap-4 border-b text-white border-[#5a5a5a] px-4 py-4 lg:flex-row lg:justify-center lg:h-20'>
                <div className="flex flex-col lg:flex-row items-end gap-4 lg:gap-8">  {/* Adjusted gap here */}
                    <div className="flex items-center gap-4">  {/* Adjusted gap here */}
                        <p>Sort Results</p>
                        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className='min-w-[150px] h-10 opensans outline-none px-2 bg-[#6feec7] rounded-lg text-[#2A2A2A]'>
                            <option value="popularity">Popularity</option>
                            <option value="length">Length</option>
                            <option value="alphabetical">Alphabetical</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-4">  {/* Adjusted gap here */}
                        <p>Filter</p>
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className='min-w-[150px] h-10 opensans outline-none px-2 bg-[#6feec7] rounded-lg text-[#2A2A2A]'>
                            <option value="all">All</option>
                            <option value="start">Starts with term</option>
                            <option value="end">Ends with term</option>
                        </select>
                    </div>
                </div>

                <div className='items-center gap-4 mt-4 lg:mt-0 md:flex hidden'>
                    <LayoutGrid className='ml-5 cursor-pointer' onClick={() => setLayout("group")} color={(layout === "group") ? "#6feec7" : "#ffffff"} />
                    <Rows3 className='cursor-pointer' onClick={() => setLayout("list")} color={(layout === "list") ? "#6feec7" : "#ffffff"} />
                </div>
            </div>

            <div className='flex w-full min-h-[45vh] max-h-auto items-center my-10 flex-col px-4 text-center'>
                <p className='text-xl font-semibold text-white'>{trimedKeyword !== "undefined" ? `Search results for ${trimedKeyword}` : "Try searching domains"}</p>

                {isSuggetionFetching && <span className='text-white'><Loader size={40} className='animate-spin m-5' /></span>}

                <div className='mt-10 py-4 max-w-[1000px] w-full'>
                    {suggetionsData?.avaiblity && suggetionsData?.avaiblity?.map((mainDomain, index) => (
                        <div className='p-5 border border-[#6feec7] border-opacity-25 flex justify-between items-center' key={index}>
                            <p className={`${mainDomain.available ? "font-bold text-neutral-100" : "text-neutral-500 line-through font-light"}`}>{mainDomain?.domain}</p>
                            <div className='space-x-3'>
                                {mainDomain.available ?
                                    <a href='https://www.tkqlhce.com/click-100703940-15083053' target="_blank" rel="noreferrer">
                                        <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-[#2A2A2A]'>Register</button>
                                    </a> :
                                    <p className='text-neutral-500 font-light px-5 py-2'>Not Available</p>}
                            </div>
                        </div>
                    ))}
                </div>

                <div className='text-white py-4 mt-6 max-w-[1400px] w-full'>
                    {layout === "group" && <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 w-full'>
                        {groupedItems.map((results, index) => (
                            <div className='w-full' key={index}>
                                {results.map((result, index) => (
                                    <li className='sm:p-5 p-3 border border-[#6feec7] border-opacity-25 flex justify-between w-full overflow-hidden' key={index}>
                                        <div className='flex'>
                                            <p
                                                className='font-bold text-sm sm:text-base text-neutral-100 break-all'
                                                dangerouslySetInnerHTML={{ __html: result.toLowerCase().replace(trimedKeyword, `<span class='text-neutral-300 font-light'>${trimedKeyword}</span>`) }}
                                            />
                                        </div>
                                        <div className='space-x-3'>
                                            <Dialog>
                                                <DialogTrigger onClick={() => setCurrentDomain(result.replace(/[\^$]/g, ''))} className='hover:bg-[#6feec7] hover:bg-opacity-15 rounded-sm px-2 py-1 text-sm text-neutral-300'>
                                                    .com
                                                </DialogTrigger>
                                                <DialogContent className="bg-neutral-900 text-neutral-100 max-w-2xl w-full border-neutral-700 ring-0 px-4 py-6 mx-auto">
                                                    <DialogHeader className='w-full mb-4'>
                                                        <DialogTitle className="text-center text-base sm:text-3xl break-all w-full mb-4" style={{ wordBreak: 'break-all', overflowWrap: 'break-word' }}>
                                                            {currentDomain}.com
                                                        </DialogTitle>
                                                        <DialogDescription className="pt-5 text-center flex justify-center items-center text-base text-neutral-300">
                                                            {isFetching && <Loader size={40} className='animate-spin m-5' />}
                                                            {domainStatus?.available && <span>{currentDomain}.com is still available</span>}
                                                            {(domainStatus && (domainStatus.available === false)) && <span className='text-red-500'>{currentDomain}.com is not available</span>}
                                                        </DialogDescription>
                                                    </DialogHeader>

                                                    {domainStatus?.available && (
                                                        <DialogFooter className="flex flex-col space-y-3">
                                                            <a href='https://www.tkqlhce.com/click-100703940-15083053' target="_blank" rel="noreferrer" className="w-full">
                                                                <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-[#2A2A2A] w-full'>Get Here on Namecheap</button>
                                                            </a>
                                                            <a href='http://click.dreamhost.com/SHxV' target="_blank" rel="noreferrer" className="w-full sm:space-x-0">
                                                                <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-[#2A2A2A] w-full'>Best for Bloggers - Dreamhost</button>
                                                            </a>
                                                            <a href='https://www.a2hosting.com/?aid=5c763a8f6a0f3&bid=d6664600' target="_blank" rel="noreferrer" className="w-full mx-0">
                                                                <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-[#2A2A2A] w-full'>Best for Affiliates - A2 Hosting</button>
                                                            </a>
                                                            <a href='https://www.cloudways.com/en/?id=1755288' target="_blank" rel="noreferrer" className="w-full mx-0">
                                                                <button className='bg-[#6feec7] rounded-sm px-5 py-2  text-[#2A2A2A] w-full'>Best for Professional Business - Cloudways</button>
                                                            </a>
                                                        </DialogFooter>
                                                    )}
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        ))}
                    </div>}

                    {layout === "list" && <ul className='max-w-[1000px] w-full mx-auto px-4'>
                        {sortedData.map((result, index) => (
                            <li key={index} className='sm:p-5 p-3 border border-[#6feec7] border-opacity-25 flex justify-between w-full overflow-hidden'>
                                <div className='flex'>
                                    <p
                                        className='font-bold text-sm sm:text-base text-neutral-100 break-all'
                                        dangerouslySetInnerHTML={{ __html: result.toLowerCase().replace(trimedKeyword, `<span class='text-neutral-300 font-light'>${trimedKeyword}</span>`) }}
                                    />
                                </div>
                                <div className='space-x-3'>
                                    <Dialog>
                                        <DialogTrigger onClick={() => setCurrentDomain(result.replace(/[\^$]/g, ''))} className='hover:bg-[#6feec7] hover:bg-opacity-15 rounded-sm px-2 py-1 text-sm text-neutral-300'>
                                            .com
                                        </DialogTrigger>
                                        <DialogContent className="bg-neutral-900 text-neutral-100 border-neutral-700 ring-0 px-4 py-6 mx-auto">
                                            <DialogHeader className='w-full mb-4'>
                                                <DialogTitle className="text-center text-base sm:text-3xl break-all w-full mb-4" style={{ wordBreak: 'break-all', overflowWrap: 'break-word' }}>
                                                    {currentDomain}.com
                                                </DialogTitle>
                                                <DialogDescription className="pt-5 text-center flex justify-center items-center text-base text-neutral-300">
                                                    {isFetching && <Loader size={40} className='animate-spin m-5' />}
                                                    {domainStatus?.available && <span>{currentDomain}.com is still available</span>}
                                                    {(domainStatus && (domainStatus.available === false)) && <span className='text-red-500'>{currentDomain}.com is not available</span>}
                                                </DialogDescription>
                                            </DialogHeader>

                                            {domainStatus?.available && (
                                                <DialogFooter className="flex flex-col space-y-3">
                                                    <a href='https://www.tkqlhce.com/click-100703940-15083053' target="_blank" rel="noreferrer" className="w-full">
                                                        <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-[#2A2A2A] w-full'>Get Here on Namecheap</button>
                                                    </a>
                                                    <a href='http://click.dreamhost.com/SHxV' target="_blank" rel="noreferrer" className="w-full sm:space-x-0">
                                                        <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-[#2A2A2A] w-full'>Best for Bloggers - Dreamhost</button>
                                                    </a>
                                                    <a href='https://www.a2hosting.com/?aid=5c763a8f6a0f3&bid=d6664600' target="_blank" rel="noreferrer" className="w-full mx-0">
                                                        <button className='bg-[#6feec7] rounded-sm px-5 py-2 text-[#2A2A2A] w-full'>Best for Affiliates - A2 Hosting</button>
                                                    </a>
                                                    <a href='https://www.cloudways.com/en/?id=1755288' target="_blank" rel="noreferrer" className="w-full mx-0">
                                                        <button className='bg-[#6feec7] rounded-sm px-5 py-2  text-[#2A2A2A] w-full'>Best for Professional Business - Cloudways</button>
                                                    </a>
                                                </DialogFooter>
                                            )}
                                        </DialogContent>
                                    </Dialog>
                                </div>
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
            <Footer />
        </div>
    )
};

export default Search;