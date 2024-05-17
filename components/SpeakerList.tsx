import { ChangeEvent } from "react";
export interface SpeakerListProps {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
export const SpeakerList = ({ onChange }: SpeakerListProps) => {
  return (
    <div className="flex  p-5  justify-end w-1/4">
      <textarea
        title="Names"
        placeholder="Enter speaker names..."
        onChange={(e) => onChange(e)}
        className="w-fullh-screen p-4 bg-gray-200 border border-gray-400 rounded"
      ></textarea>
    </div>
  );
};
