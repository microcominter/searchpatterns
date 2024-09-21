const axios = require('axios');
const cache = require('memory-cache');

module.exports.keyword_search = async function (req, res) {
    const query = req.params.query;
    const prefixes = ["who", "which", "where", "when", "what", "how", "can", "are", "will", "why", "is", "whome"];
    const categorizedSuggestions = {};
    const searchCounts = {};

    const searchQueries = prefixes.map(prefix => `${prefix} ${query}`);

    try {
        const responses = await Promise.all(searchQueries.map(searchQuery => {
            return axios.get('https://www.google.com/complete/search', {
                params: {
                    client: 'chrome',
                    q: searchQuery,
                    gl: req.body.country || 'in'
                }
            });
        }));

        for (let i = 0; i < prefixes.length; i++) {
            const prefix = prefixes[i];
            const cacheKey = `google_suggest_${searchQueries[i]}`;

            let cachedData = cache.get(cacheKey);
            if (cachedData) {
                categorizedSuggestions[prefix] = cachedData.suggestions;
                searchCounts[prefix] = cachedData.count;
                console.log(`${prefix} cached:`, cachedData);
                continue;
            }

            const response = responses[i];
            if (response.status === 200 && Array.isArray(response.data[1])) {
                const suggestions = response.data[1];
                const searchCount = suggestions.length;

                cache.put(cacheKey, { suggestions, count: searchCount }, 30 * 60 * 1000); // 30 minutes

                categorizedSuggestions[prefix] = suggestions;
                searchCounts[prefix] = searchCount;
            } else {
                console.error(`Unexpected API response for prefix "${prefix}":`, response.data);
                categorizedSuggestions[prefix] = [];
                searchCounts[prefix] = 0;
            }
        }

        // Debugging: Check final data structures before sending the response

        res.json({
            suggestions: categorizedSuggestions,
            counts: searchCounts
        });
    } catch (error) {
        console.error("Error during API requests or processing:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports.preposition_search=async function (req,res){
    const query = req.params.query;
    const prefixes = ["in", "at", "for", "from", "beside", "to", "about", "of", "from", "too"];
    const categorizedSuggestions = {};
    const searchCounts = {};

    const searchQueries = prefixes.map(prefix => `${prefix} ${query}`);

    try {
        const responses = await Promise.all(searchQueries.map(searchQuery => {
            return axios.get('https://www.google.com/complete/search', {
                params: {
                    client: 'chrome',
                    q: searchQuery,
                    gl: req.body.country || 'in'
                }
            });
        }));

        for (let i = 0; i < prefixes.length; i++) {
            const prefix = prefixes[i];
            const cacheKey = `google_suggest_${searchQueries[i]}`;

            let cachedData = cache.get(cacheKey);
            if (cachedData) {
                categorizedSuggestions[prefix] = cachedData.suggestions;
                searchCounts[prefix] = cachedData.count;
                console.log(`${prefix} cached:`, cachedData);
                continue;
            }

            const response = responses[i];
            if (response.status === 200 && Array.isArray(response.data[1])) {
                const suggestions = response.data[1];
                const searchCount = suggestions.length;

                cache.put(cacheKey, { suggestions, count: searchCount }, 30 * 60 * 1000); // 30 minutes

                categorizedSuggestions[prefix] = suggestions;
                searchCounts[prefix] = searchCount;
            } else {
                console.error(`Unexpected API response for prefix "${prefix}":`, response.data);
                categorizedSuggestions[prefix] = [];
                searchCounts[prefix] = 0;
            }
        }

        // Debugging: Check final data structures before sending the response

        res.json({
            suggestions: categorizedSuggestions,
            counts: searchCounts
        });
    } catch (error) {
        console.error("Error during API requests or processing:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports.comparision_search=async function (req,res){
    const query = req.params.query;
    const prefixes = ["like", "similar to", "also", "unlike", "similarly", "like wise", "however", "although", "yet", "still", "nevertheless", "despite"];
    const categorizedSuggestions = {};
    const searchCounts = {};

    const searchQueries = prefixes.map(prefix => `${prefix} ${query}`);

    try {
        const responses = await Promise.all(searchQueries.map(searchQuery => {
            return axios.get('https://www.google.com/complete/search', {
                params: {
                    client: 'chrome',
                    q: searchQuery,
                    gl: req.body.country || 'in'
                }
            });
        }));

        for (let i = 0; i < prefixes.length; i++) {
            const prefix = prefixes[i];
            const cacheKey = `google_suggest_${searchQueries[i]}`;

            let cachedData = cache.get(cacheKey);
            if (cachedData) {
                categorizedSuggestions[prefix] = cachedData.suggestions;
                searchCounts[prefix] = cachedData.count;
                console.log(`${prefix} cached:`, cachedData);
                continue;
            }

            const response = responses[i];
            if (response.status === 200 && Array.isArray(response.data[1])) {
                const suggestions = response.data[1];
                const searchCount = suggestions.length;

                cache.put(cacheKey, { suggestions, count: searchCount }, 30 * 60 * 1000); // 30 minutes

                categorizedSuggestions[prefix] = suggestions;
                searchCounts[prefix] = searchCount;
            } else {
                console.error(`Unexpected API response for prefix "${prefix}":`, response.data);
                categorizedSuggestions[prefix] = [];
                searchCounts[prefix] = 0;
            }
        }

        // Debugging: Check final data structures before sending the response

        res.json({
            suggestions: categorizedSuggestions,
            counts: searchCounts
        });
    } catch (error) {
        console.error("Error during API requests or processing:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}