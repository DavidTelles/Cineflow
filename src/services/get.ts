export async function GetById(id: string, type: string, language = 'en-US') {

    const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}?language=${language}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                accept: "application/json",
            },
        }
    );

    const data = await response.json();

    return data;
}