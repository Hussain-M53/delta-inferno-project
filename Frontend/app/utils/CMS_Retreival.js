
export const fetchData = async (module) => {
    try {
        const query = `*[_type == "${module}"]`;
        const url = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/${process.env.NEXT_PUBLIC_SANITY_DATASET}?query=${encodeURIComponent(query)}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};
