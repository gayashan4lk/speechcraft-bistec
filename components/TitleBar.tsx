'use client';

export interface TitleBarProps {
	topic: string;
}
export function TitleBar({ topic }: TitleBarProps) {
	return (
		<div className='my-3 mx-10 h-auto md:h-[8rem]'>
			{topic === '' ? (
				<>
					<h1 className='text-3xl font-semibold text-center text-slate-700 mt-5'>
						Press GO to start
					</h1>
				</>
			) : (
				<>
					<h3 className='text-sm font-extrabold text-center text-slate-700'>
						YOUR TOPIC
					</h3>
					<div className='md:mt-5 md:p-5 md:border-4 mt-1 p-2 border-2 border-slate-200 bg-slate-100 rounded-lg'>
						<p className='md:text-3xl text-lg font-semibold text-left text-slate-700'>
							{topic}
						</p>
					</div>
				</>
			)}
		</div>
	);
}
