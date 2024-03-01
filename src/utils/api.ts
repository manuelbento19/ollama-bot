import { Parser } from "./parser";

const parser = new Parser();

export async function consumeAPI(prompt:string,signal:AbortSignal){
	const response = await fetch('http://localhost:11434/api/generate',{
		method: 'POST',
		body: JSON.stringify({
			model: 'llama2',
			prompt,
			stream: true
		}),
		signal
	})
	return response.body?.pipeThrough(new TextDecoderStream()).pipeThrough(parser.toString())
}