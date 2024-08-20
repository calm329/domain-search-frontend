exports.getSuggetion = async ({ queryKey }) => {
    const [term] = queryKey;

    const api_response = await fetch(`${process.env.REACT_APP_SERVER_URL}/domains/search-suggestions?keyword=${term}`);
    const simulatedResults = await api_response.json();

    return simulatedResults;
};

exports.checkDomainAvaiblity = async ({ queryKey }) => {
    const [term] = queryKey;

    const api_response = await fetch(`${process.env.REACT_APP_SERVER_URL}/domains/check-domain/${term}`);
    const simulatedResults = await api_response.json();

    return simulatedResults;
};