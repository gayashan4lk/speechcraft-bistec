"use client";

import { useState, useRef, useEffect } from "react";
import { formatTime } from "@/utils/time-util-fns";
import { timeConfig } from "@/data/time-config";
import data from "../data/speech-topics-chocolates.json";
import { TitleBar } from "@/components/TitleBar";
import { GoButton } from "@/components/GoButton";

const countDownPeriodInSeconds: number = timeConfig.countDownPeriodInSeconds;
const greenTimeInSeconds: number = timeConfig.greenTimeInSeconds;
const yellowTimeInSeconds: number = timeConfig.yellowTimeInSeconds;
const redTimeInSeconds: number = timeConfig.redTimeInSeconds;

export default function Home() {
  const [topic, setTopic] = useState("");
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [savedTime, setSavedTime] = useState(0);
  const timerRef = useRef<any>(null);
  const appVersion = process.env.NEXT_PUBLIC_APP_VERSION;
  const [countDownTime, setCountDownTime] = useState(countDownPeriodInSeconds);
  const countDownIntervalId = useRef<any>(null);
  const [isSpeechInProgress, setIsSpeechInProgress] = useState(false);
  const [showTimer, setShowTimer] = useState(true);

  useEffect(() => {
    if (countDownIntervalId.current !== null || !isSpeechInProgress) {
      setShowTimer(true);
    } else {
      setShowTimer(false);
    }
  }, [isSpeechInProgress, countDownIntervalId.current]);

  function startSpeech() {
    startCountDown();
    setTopic(generateRandomTopic());
    setIsSpeechInProgress(true);
  }

  function endSpeech() {
    setTopic("");
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
      setCountDownTime((prevTimer: number) => {
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
    setCountDownTime(countDownPeriodInSeconds);
  }

  function afterCountDown() {
    startTimer();
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

  function getCssRuleForColor(time: number): string {
    if (showTimer) {
      return "bg-white";
    }

    switch (true) {
      case time >= redTimeInSeconds:
        return "bg-red-500";

      case time >= yellowTimeInSeconds:
        return "bg-yellow-500";

      case time >= greenTimeInSeconds:
        return "bg-green-500 ";

      default:
        return "bg-sky-200";
    }
  }

  return (
    <div
      className={`min-h-screen p-5 flex flex-col items-center ${getCssRuleForColor(
        elapsedTime
      )}`}
    >
      <TitleBar topic={topic} />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-center">
          {showTimer ? (
            <>
              <h1 className="md:text-5xl text-3xl mb-5 font-bold text-slate-400">
                Get Ready
              </h1>
              <h1 className="md:text-7xl text-5xl font-bold text-slate-400">
                {formatTime(countDownTime)}
              </h1>
            </>
          ) : (
            <h1 className="md:text-9xl text-7xl font-bold text-white">
              {formatTime(elapsedTime)}
            </h1>
          )}
        </div>
      </div>

      {savedTime !== 0 && (
        <div className="fixed top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-3/4">
          <h3 className="md:text-xl text-sm text-slate-400">
            Last speech time was{" "}
            <span className="font-bold">{formatTime(savedTime)}</span> minutes.
          </h3>
        </div>
      )}

      <div className="md:mb-20 mb-10 fixed bottom-0">
        <GoButton
          isSpeechInProgress={isSpeechInProgress}
          endSpeech={endSpeech}
          startSpeech={startSpeech}
        />
      </div>
      <div
        id="app-version-number"
        className="md:my-2 my-2 mx-2 flex flex-col items-end fixed bottom-0 right-0"
      >
        <span className="md:text-sm text-xs text-slate-400">
          version {appVersion}
        </span>
      </div>
    </div>
  );
}
