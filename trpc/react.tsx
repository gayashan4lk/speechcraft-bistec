"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';

import {type AppRouter} from "@/server"

function getBaseUrl() {
	if (typeof window !== 'undefined')
    // browser should use relative path
    return '';
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`;
	
	return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
	config(opts) {
		return {
			links: [
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
					async headers() {
						return {
							'x-foo': 'bar',
						};
					}
				})
			]
		}
	},
	ssr: false,
});

export function TRPCNextProvider(props: {
	children: React.ReactNode;
}){

	
	return (
		<QueryClientProvider client={new QueryClient()}>
			<trpc.withTRPC>
				{props.children}
			</trpc.withTRPC>
		</QueryClientProvider>
	)
}



