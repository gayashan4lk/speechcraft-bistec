import fs from 'fs';
import path from 'path';
//import topics from '../../../data/speech-topics.json';

export async function GET(request: Request, {params}: any) {
    try{
        const jsonFilePath = path.join(process.cwd(), "data", "")

        const textFilePath = path.join(process.cwd(), "data", "speech-topics-data.txt");
        const textContent = fs.readFileSync(textFilePath, 'utf-8');
        const textLines = textContent.split('\n');

        const textTopics : {id:number, topic: string}[] = []
        textLines.forEach((line) => {
            const [_id, _topic] = line.split('. ', 2);
            const id = parseInt(_id);
            const topic: {id: number, topic: string} = {
                id : id,
                topic: `${_topic}`
            }
            textTopics.push(topic);
        })

        //const result= topics.concat(textTopics);

        return new Response(JSON.stringify(textTopics), {
            status: 200,
            headers: {
                'content-type': 'application/json'
            }
        })
    } catch(error){
        console.error('Error reading the file: ', error);
        return new Response(JSON.stringify({error: "Error reading the file"}), {
            status: 500,
            headers: {
                'content-type': 'application/json'
            }
        })
    }
}