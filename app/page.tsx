'use client';
import { useState, useRef, useEffect } from 'react';
import { formatTime } from '@/utils/time-util-fns';
import { GetReadyTimer } from '@/components/GetReadyTimer';
import { SpeechTimer } from '@/components/SpeechTimer';
import { timeConfig } from '@/data/time-config';
import data from '../data/speech-topics.json';
import { TitleBar } from '@/components/TitleBar';
import { GoButton } from '@/components/GoButton';

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
			<div className='md:mb-20 mb-5'>
				{countDownIntervalId.current !== null || !isSpeechInProgress ? (
					<GetReadyTimer time={countDownTimer} />
				) : (
					<SpeechTimer time={elapsedTime} />
				)}
			</div>
			<div className='md:my-10 my-5'>
				<GoButton
					isSpeechInProgress={isSpeechInProgress}
					endSpeech={endSpeech}
					startSpeech={startSpeech}
				/>
			</div>
			<div className="md:visible invisible">
				<h5 className='text-sm font-semibold text-slate-400'>
					Press Space Bar to start and stop.
				</h5>
			</div>
			<TitleBar topic={topic} />
			{savedTime !== 0 && (
				<div className='md:my-10 my-2'>
					<h3 className='text-xl'>
						Your last time was{' '}
						<span className='font-bold'>{formatTime(savedTime)}</span> minutes.
					</h3>
				</div>
			)}
			<div id='app-version-number' className='md:my-5 my-2'>
				<span className='text-sm text-slate-400'>version {appVersion}</span>
			</div>
		</div>
	);
}
