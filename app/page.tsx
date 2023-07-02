'use client';
import { useState, useRef } from 'react';

export default function Home() {
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [savedTime, setSavedTime] = useState<number | null>(null);
	const timerRef = useRef<any>(null);

	function startTimer() {
		if (!isTimerRunning) {
			setIsTimerRunning(true);
			timerRef.current = setInterval(() => {
				setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
			}, 1000);
		}
	}

	function stopTimer() {
		if (isTimerRunning) {
			setIsTimerRunning(false);
			clearInterval(timerRef.current);
			setSavedTime(elapsedTime);
			setElapsedTime(0);
		}
	}

	function formatTime(time: number): string {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	function getColorLightColor(time: number): string {
		if (time >= 180) {
			return 'bg-red-500';
		} else if (time >= 150) {
			return 'bg-yellow-500';
		} else if (time >= 120) {
			return 'bg-green-500';
		} else {
			return 'bg-sky-500';
		}
	}

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
				<div
					className={`grid place-items-center w-[15rem] h-[15rem] rounded-full ${getColorLightColor(
						elapsedTime
					)}`}
				>
					<h1 className='text-4xl font-bold text-white'>
						{formatTime(elapsedTime)}
					</h1>
				</div>
			</div>
			<div className='my-10'>
				<div>
					<button
						onClick={isTimerRunning ? stopTimer : startTimer}
						className='p-3 border-2 border-slate-300 bg-slate-200 rounded-full w-40 h-20 hover:border-3 hover:border-slate-400 hover:bg-slate-300'
					>
						<span className='text-2xl font-semibold'>
							{isTimerRunning ? `STOP` : `GO`}
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}
