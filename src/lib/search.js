exports.getSuggetion = async ({ queryKey }) => {
    const [_, trimmedTerm] = queryKey;
    const api_response = await fetch(`${process.env.REACT_APP_SERVER_URL}/domains/search-suggestions?keyword=${trimmedTerm}`);
    const simulatedResults = await api_response.json();

    return simulatedResults;
};