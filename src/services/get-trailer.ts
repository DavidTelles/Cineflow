export async function GetTrailer(id: string, type: string): Promise<string | null> {
    const response = await fetch(
        `https://api.themoviedb.org/3/${type}/${id}/videos`,
        {
            headers: {
                Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
                accept: "application/json",
            },
        }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const trailer = data.results?.find(
        (video: { type?: string; site?: string; key?: string }) =>
            video.type === "Trailer" && video.site === "YouTube"
    );

    return trailer?.key || null;
}