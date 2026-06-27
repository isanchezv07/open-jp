import type { APIRoute } from 'astro';
import { sentenceExercises } from '@/lib/data/sentences';

export async function getStaticPaths() {
    const keywords = new Set<string>();
    sentenceExercises.forEach(ex => {
        if (ex.keyword) {
            keywords.add(ex.keyword);
        }
    });

    return Array.from(keywords).map(keyword => ({ params: { keyword } }));
}

export const GET: APIRoute = async ({ params }) => {
    const keyword = params.keyword;

    if (!keyword) {
        return new Response(JSON.stringify({ error: 'Keyword required' }), { status: 400 });
    }

    try {
        const irasutoyaUrl = `https://www.irasutoya.com/feeds/posts/default?alt=json&q=${encodeURIComponent(keyword)}&max-results=20`;
        const response = await fetch(irasutoyaUrl);

        if (!response.ok) {
            throw new Error(`Error HTTP ${response.status}`);
        }

        const data = await response.json();
        const results = [];

        for (const entry of data.feed.entry || []) {
            const title = entry.title?.$t || '';
            let imageUrl = null;

            if (entry.media$thumbnail?.url) {
                imageUrl = entry.media$thumbnail.url
                    .replace('/s72-c/', '/s1600/')
                    .replace('=s72-c', '=s1600');
            }

            if (imageUrl) {
                results.push({ title, imageUrl });
            }
        }

        return new Response(JSON.stringify(results), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
};
