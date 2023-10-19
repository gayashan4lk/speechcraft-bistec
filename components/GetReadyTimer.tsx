'use client';
import { formatTime } from '@/utils/time-util-fns';

type GetReadyTimerProps = {
	time: number;
};
export function GetReadyTimer({ time }: GetReadyTimerProps) {
	return (
		<>
			<h1 className='text-6xl font-bold'>Get Ready</h1>
			<h1 className='text-4xl font-bold'>{formatTime(time)}</h1>
		</>
	);
}
