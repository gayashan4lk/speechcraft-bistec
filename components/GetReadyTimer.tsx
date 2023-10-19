'use client';
import { formatTime } from '@/utils/time-util-fns';

type GetReadyTimerProps = {
	time: number;
};
export function GetReadyTimer({ time }: GetReadyTimerProps) {
	return (
		<div className='grid place-items-center w-[20rem] h-[20rem] rounded-full bg-sky-600'>
			<h1 className='text-6xl font-bold text-white'>Get Ready</h1>
			<h1 className='text-9xl font-bold text-white'>{formatTime(time)}</h1>
		</div>
	);
}
