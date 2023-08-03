import AppContainer from "@/components/AppContainer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000/';
async function getTopics(): Promise<{id: number, topic: string}[]> {
	const res = await fetch(`${baseUrl}api/topics`);

	if(!res.ok){
		throw new Error('Failed to fetch topics.');
	}

	return res.json();
}

export default async function Home(){
	const topics = await getTopics();
	return <AppContainer speechTopics={topics} />
}