'use client';

export interface GoButtonProps {
	isSpeechInProgress: boolean;
	endSpeech: () => void;
	startSpeech: () => void;
}
export function GoButton({
	isSpeechInProgress,
	endSpeech,
	startSpeech,
}: GoButtonProps) {
	return (
		<button
			onClick={isSpeechInProgress ? endSpeech : startSpeech}
			className='p-5 border-2 border-slate-300 bg-slate-200 rounded-full w-40 h-20 hover:border-3 hover:border-slate-400 hover:bg-slate-300'
		>
			<span className='text-2xl font-bold text-slate-700'>
				{isSpeechInProgress ? `STOP` : `GO`}
			</span>
		</button>
	);
}
