
interface Catalog {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path?: string;
    overview?: string;
    vote_average: number;
    release_date?: string;
    media_type?: string;
}

export async function GetRecommendations(id: string, type: string): Promise<Catalog[]> {
    const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/recommendations`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                accept: "application/json",
            },
        }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.results.slice(0, 6) || [];
}