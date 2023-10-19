'use client';
import { formatTime } from '@/utils/time-util-fns';
import {timeConfig} from "@/data/time-config";

const greenTimeInSeconds: number = timeConfig.greenTimeInSeconds;
const yellowTimeInSeconds: number = timeConfig.yellowTimeInSeconds;
const redTimeInSeconds: number = timeConfig.redTimeInSeconds;

type SpeechTimerProps = {
	time: number;
};
export function SpeechTimer({ time }: SpeechTimerProps) {

	function getCssRuleForColor(time: number): string {
		if (time >= redTimeInSeconds) {
			return 'bg-red-500';
		} else if (time >= yellowTimeInSeconds) {
			return 'bg-yellow-400';
		} else if (time >= greenTimeInSeconds) {
			return 'bg-green-500 ';
		} else {
			return 'bg-sky-300';
		}
	}

	return (
		<div>
			<h1 className='text-9xl font-bold text-white'>{formatTime(time)}</h1>
		</div>
	);
}
