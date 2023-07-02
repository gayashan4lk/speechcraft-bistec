export default function Home() {
	return (
		<div className='min-h-screen p-5 flex flex-col items-center'>
			<div className='my-3'>
				<div className='mx-10'>
					<h3 className='text-sm font-extrabold text-center'>YOUR TOPIC</h3>
					<h1 className='text-3xl font-semibold text-left text-slate-500 mt-5'>
						What’s your take on the ‘never judge a book by its cover’ saying?
					</h1>
				</div>
			</div>
			<div className='my-20'>
				<div className='grid place-items-center w-[15rem] h-[15rem] bg-red-500 rounded-full'>
					<h1 className='text-4xl font-bold text-white'>00:00</h1>
				</div>
			</div>
			<div className='my-10'>
				<div>
					<button className='p-3 border-2 border-slate-300 bg-slate-200 rounded-full w-40 h-20 hover:border-3 hover:border-slate-400 hover:bg-slate-300'>
						<span className='text-2xl font-semibold'>GO</span>
					</button>
				</div>
			</div>
		</div>
	);
}
