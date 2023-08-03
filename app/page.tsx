import AppContainer from "@/components/AppContainer";

async function getTopics(): Promise<{id: number, topic: string}[]> {
	let baseUrl;
	if(process.env.NEXT_PUBLIC_BASE_URL) {
		baseUrl = process.env.NEXT_PUBLIC_BASE_URL
	} else {
		baseUrl = process.env.VERCEL_URL
	}
	console.log(baseUrl);
	const res = await fetch(`${baseUrl}api/topics`);

	if(!res.ok){
		throw new Error('Failed to fetch speech topics.');
	}

	return res.json();
}

export default async function Home(){
	const topics = await getTopics();
	return <AppContainer speechTopics={topics} />
}