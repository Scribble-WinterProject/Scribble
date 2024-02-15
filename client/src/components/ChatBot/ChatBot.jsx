import React, { useState } from 'react'

// import css
import "./ChatBot.css"
import { analyze } from '../../../openAi/config'

function ChatBot() {

  const [aiText, setaiText] = useState("Hello, how can I assist you today?");

    const [input, setinput] = useState("")
    const handleAiInputChange = (e)=> {
        setinput(e.target.value)
    }

    const handleAiInput = async() => {
        console.log(input)
        const res = await analyze(input)
        setaiText(res)
        console.log(res);
    }
    return (
      <div>
        <div className="chat-card">
          <div className="chat-header">
            <div className="h2">AI ChatBot</div>
          </div>
          <div className="chat-body">
            <div className="message incoming">
              <p>{aiText}</p>
            </div>
            <div className="message outgoing">
              <p>{input}</p>
            </div>
            {/* <div className="message incoming">
              <p>Sure, I'm here to help. What would you like to know?</p>
            </div> */}
          </div>
          <div className="chat-footer">
            <input
              placeholder="Type your message"
              type="text"
              onChange={handleAiInputChange}
            />
            <button onClick={handleAiInput}>Send</button>
          </div>
        </div>
      </div>
    );
}

export default ChatBot