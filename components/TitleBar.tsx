'use client';

export interface TitleBarProps {
	topic: string;
}
export function TitleBar({ topic }: TitleBarProps) {
	return (
		<div className='my-3 mx-10 h-[8rem]'>
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
					<div className='mt-5 p-5 border-4 border-slate-200 bg-slate-100  rounded-lg'>
						<p className='text-3xl font-semibold text-left text-slate-500'>
							{topic}
						</p>
					</div>
				</>
			)}
		</div>
	);
}
