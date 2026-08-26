export default async function GET(
    request: Request,
    params: Promise<{id: string}>
) {
    const { id } = await params;
    const apitoken =  process.env.TMDB_API_TOKEN

    
}