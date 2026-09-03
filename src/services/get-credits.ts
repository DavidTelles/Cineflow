
interface CastMember {
    id: number;
    name: string;
    profile_path?: string;
}

export async function GetCredits(id: string, type: string): Promise<CastMember[]> {
    const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/credits`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                accept: "application/json",
            },
        }
    );

    if (!response.ok) return [];

    const data = await response.json();
    return data.cast || [];
}