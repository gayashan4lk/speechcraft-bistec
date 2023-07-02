'use client';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [savedTime, setSavedTime] = useState(0);
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
			setSavedTime(elapsedTime);
			setIsTimerRunning(false);
			clearInterval(timerRef.current);
			setElapsedTime(0);
		}
	}

	function formatTime(time: number): string {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	function paintColor(time: number): string {
		if (time >= 120) {
			return 'bg-red-500';
		} else if (time >= 90) {
			return 'bg-yellow-400';
		} else if (time >= 60) {
			return 'bg-green-500 ';
		} else {
			return 'bg-sky-300';
		}
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === 'Space') {
				event.preventDefault();
				isTimerRunning ? stopTimer() : startTimer();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isTimerRunning]);

	return (
		<div className='min-h-screen p-5 flex flex-col items-center'>
			<div className='my-3'>
				<div className='mx-10'>
					<h3 className='text-sm font-extrabold text-center'>YOUR TOPIC</h3>
					<h1 className='text-3xl font-semibold text-left text-slate-600 mt-5'>
						What’s your take on the ‘never judge a book by its cover’ saying?
					</h1>
				</div>
			</div>
			<div className='my-20'>
				<div
					className={`grid place-items-center w-[20rem] h-[20rem] rounded-full ${paintColor(
						elapsedTime
					)}`}
				>
					<h1 className='text-5xl font-bold text-white'>
						{formatTime(elapsedTime)}
					</h1>
				</div>
			</div>
			<div className='my-10'>
				<button
					onClick={isTimerRunning ? stopTimer : startTimer}
					className='p-5 border-2 border-slate-300 bg-slate-200 rounded-full w-40 h-20 hover:border-3 hover:border-slate-400 hover:bg-slate-300'
				>
					<span className='text-2xl font-bold text-slate-700'>
						{isTimerRunning ? `STOP` : `GO`}
					</span>
				</button>
			</div>
			<div>
				<h5 className='text-sm font-semibold text-slate-400'>
					Press Spacebar key to start and stop.
				</h5>
			</div>
			{savedTime !== 0 && (
				<div className='my-10'>
					<h3 className='text-xl'>
						Your last time was{' '}
						<span className='font-bold'>{formatTime(savedTime)}</span> mins.
					</h3>
				</div>
			)}
		</div>
	);
}
