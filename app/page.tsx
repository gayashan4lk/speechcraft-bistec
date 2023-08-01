'use client';
import { useState, useRef, useEffect } from 'react';
import data from '../data/speech-topics.json';
import { formatTime } from '@/utils/time-util-fns';

export default function Home() {
	const [topic, setTopic] = useState('');
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [savedTime, setSavedTime] = useState(0);
	const timerRef = useRef<any>(null);
	const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;

	function startTimer() {
		if (!isTimerRunning) {
			setSavedTime(0);
			setIsTimerRunning(true);
			timerRef.current = setInterval(() => {
				setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
			}, 1000);

			const randomIndex = Math.floor(Math.random() * data.length);
			setTopic(data[randomIndex].topic);
		}
	}

	function stopTimer() {
		if (isTimerRunning) {
			setSavedTime(elapsedTime);
			setIsTimerRunning(false);
			clearInterval(timerRef.current);
			setElapsedTime(0);
			setTopic('');
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
			<div className='my-20'>
				<TimerColorLight time={elapsedTime} />
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
					Press Space Bar key to start and stop.
				</h5>
			</div>
			{savedTime !== 0 && (
				<div className='my-10'>
					<h3 className='text-xl'>
						Your last time was{' '}
						<span className='font-bold'>{formatTime(savedTime)}</span> minutes.
					</h3>
				</div>
			)}
			<div id='app-version-number' className='my-5'>
				<span className='text-sm text-slate-400'>version {appVersion}</span>
			</div>
		</div>
	);
}

type TimerColorLightProps = {
	time: number;
};

function TimerColorLight({ time }: TimerColorLightProps) {
	function getCssRuleForColor(time: number): string {
		if (time >= 300) {
			return 'bg-red-500';
		} else if (time >= 240) {
			return 'bg-yellow-400';
		} else if (time >= 180) {
			return 'bg-green-500 ';
		} else {
			return 'bg-sky-300';
		}
	}

	return (
		<div
			className={`grid place-items-center w-[20rem] h-[20rem] rounded-full ${getCssRuleForColor(
				time
			)}`}
		>
			<h1 className='text-5xl font-bold text-white'>{formatTime(time)}</h1>
		</div>
	);
}
