'use client';
import { useState, useRef, useEffect } from 'react';
import { formatTime } from '@/utils/time-util-fns';
import { GetReadyTimer } from '@/components/GetReadyTimer';
import { SpeechTimer } from '@/components/SpeechTimer';
import {timeConfig} from "@/data/time-config";
import data from '../data/speech-topics.json';

const countDownPeriodInSeconds: number = timeConfig.countDownPeriodInSeconds;

export default function Home() {
	const [topic, setTopic] = useState('');
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [savedTime, setSavedTime] = useState(0);
	const timerRef = useRef<any>(null);
	const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;
	const [countDownTimer, setCountDownTimer] = useState(
		countDownPeriodInSeconds
	);
	const countDownIntervalId = useRef<any>(null);
	const [isSpeechInProgress, setIsSpeechInProgress] = useState(false);

	function startSpeech() {
		startCountDown();
		setTopic(generateRandomTopic());
		setIsSpeechInProgress(true);
	}

	function endSpeech() {
		setTopic('');
		if (countDownIntervalId !== null) {
			endCountDown();
		}
		if (isTimerRunning) {
			stopTimer();
		}
		setIsSpeechInProgress(false);
	}

	function startCountDown() {
		if (countDownIntervalId.current !== null) return; // Don't start if it's already started

		countDownIntervalId.current = setInterval(() => {
			setCountDownTimer((prevTimer: number) => {
				if (prevTimer <= 1) {
					clearInterval(countDownIntervalId.current);
					countDownIntervalId.current = null;
					afterCountDown();
					return 0;
				}
				return prevTimer - 1;
			});
		}, 1000);
	}

	function endCountDown() {
		if (countDownIntervalId.current !== null) {
			clearInterval(countDownIntervalId.current);
			countDownIntervalId.current = null;
		}
		setCountDownTimer(countDownPeriodInSeconds);
	}

	function afterCountDown() {
		startTimer();
		console.log('Countdown finished');
	}

	function startTimer() {
		if (!isTimerRunning) {
			setSavedTime(0);
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

	function generateRandomTopic(): string {
		const randomIndex = Math.floor(Math.random() * data.length);
		return data[randomIndex].topic;
	}

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.code === 'Space') {
				event.preventDefault();
				isSpeechInProgress ? endSpeech() : startSpeech();
			}
		};
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isSpeechInProgress]);

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
				{countDownIntervalId.current !== null || !isSpeechInProgress ? (
					<GetReadyTimer time={countDownTimer} />
				) : (
					<SpeechTimer time={elapsedTime} />
				)}
			</div>
			<div className='my-10'>
				<button
					onClick={isSpeechInProgress ? endSpeech : startSpeech}
					className='p-5 border-2 border-slate-300 bg-slate-200 rounded-full w-40 h-20 hover:border-3 hover:border-slate-400 hover:bg-slate-300'
				>
					<span className='text-2xl font-bold text-slate-700'>
						{isSpeechInProgress ? `STOP` : `GO`}
					</span>
				</button>
			</div>
			<div>
				<h5 className='text-sm font-semibold text-slate-400'>
					Press Space Bar to start and stop.
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
