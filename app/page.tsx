import AppContainer from "@/components/AppContainer";

async function getTopics(): Promise<{id: number, topic: string}[]> {
	let baseUrl;
	if(process.env.NEXT_PUBLIC_BASE_URL) {
		baseUrl = process.env.NEXT_PUBLIC_BASE_URL
	} else {
		baseUrl = `https://${process.env.VERCEL_URL}/`
	}
	console.log(baseUrl);
	const res = await fetch(`${baseUrl}api/topics`);

	console.log(res);
	if(!res.ok){
		console.log("res is not ok!")
		throw new Error('Failed to fetch speech topics.');
	}

	console.log("res is ok!")

	return res.json();
}

export default async function Home(){
	const topics = await getTopics();
	return <AppContainer speechTopics={topics} />
}