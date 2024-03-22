import { FormEvent, useState } from 'react'
import './App.scss';
import {marked} from 'marked'
import { consumeAPI } from './utils/api';

function App() {
  let abortController = new AbortController();

  const [text, setText] = useState("")

  const getMarkdown = (content:string) => {
    if (content) {
      let markdown = marked(content)
      return { __html: markdown }
    }
  }

  const submit = async(event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const input = event.currentTarget[0] as HTMLTextAreaElement
    if(!input.value)
    return

    const prompt = input.value
    
    const response = await consumeAPI(prompt,abortController.signal)
		await response?.pipeTo(new WritableStream({
			write(data){
				setText(prev=>prev+data)
			}
		}),{
			signal: abortController.signal
		})    
  }

  return (
    <main>
      <section>
        <article contentEditable dangerouslySetInnerHTML={getMarkdown(text)}/>
      </section>
      <footer>
        <form onSubmit={submit}>
          <textarea name="prompt" placeholder="Ask a follow-up..."></textarea>
          <button type="submit">&uarr;</button>
        </form>
      </footer>
    </main>
  )
}

export default App
