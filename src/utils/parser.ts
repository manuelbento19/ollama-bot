export class Parser{
    toString(){
        let answer = ''
        
        return new TransformStream({
            transform(chunk, controller) {
                const {response} = JSON.parse(chunk);
                controller.enqueue(response)
                answer = response
            },
            flush(controller)  {
                if(!answer) return;
                controller.enqueue(answer)
            }
        })
    }
}