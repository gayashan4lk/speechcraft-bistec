import {z} from 'zod';

import { procedure, router } from './trpc';

export const appRouter = router({
	hello: procedure
		.input(z.object({text: z.string()})).query((opt)=> {
		return {
			greeting: `Hello ${opt.input.text}`
		}
	})
})

export type AppRouter = typeof appRouter;