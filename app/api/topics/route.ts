import fs from 'fs';
import path from 'path';
import topics from '../../../data/speech-topics.json';

export default async function handler(req: any, res: any) {
    try{
        const nextId = topics.length - 1;
        const filePath = path.join(process.cwd(), "data", "speech-topics-data.txt");
        const textContent = fs.readFileSync(filePath, 'utf-8');
        const textLines = textContent.split('\n');

        const textTopics: typeof topics = []
        textLines.forEach((line) => {
            const [_id, _topic] = line.split('. ', 2);
            const id = parseInt(_id) + nextId;
            const topic: {id: number, topic: string} = {
                id : id,
                topic: `${_topic}`
            }
            textTopics.push(topic);
        })

        const result= topics.concat(textTopics);

        // Send the entire result array, not just the first element
        res.status(200).json(result);
    } catch(error){
        console.error('Error reading the file: ', error);
        res.status(500).json({error: "Error reading the file"});
    }
}
