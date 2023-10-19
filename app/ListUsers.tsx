'use client'

import {trpc} from '@/trpc/server'

export default function ListUsers() {
	let {data, isLoading, isError, error} = trpc.hello.useQuery({text: 'gayashan'});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return error && <div>Error: {error.message}</div>;
	}

	return (
		<div>
			<p>{data?.greeting}</p>
		</div>
	)

}
