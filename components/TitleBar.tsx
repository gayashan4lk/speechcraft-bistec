'use client';

export interface TitleBarProps {
	topic: string;
	label?: string;
}
export function TitleBar({ topic, label }: TitleBarProps) {
	return (
		<div className='md:my-10 my-4 md:mx-10 mx-4 h-auto md:h-[8rem]'>
			{topic === '' ? (
				<>
					<h1 className='text-3xl font-semibold text-center text-slate-700 mt-5'>
						Press GO to start
					</h1>
				</>
			) : (
				<>
					<h3 className='md:mb-5 mb-2 text-sm font-extrabold text-center text-slate-700'>
						{ label ? label : 'YOUR TOPIC'}
					</h3>
					<div className='md:p-8 p-4 md:border-4 border-2 border-slate-200 bg-slate-100 rounded-lg'>
						<p className='md:text-3xl text-xl font-semibold text-left text-slate-700'>
							{topic}
						</p>
					</div>
				</>
			)}
		</div>
	);
}
