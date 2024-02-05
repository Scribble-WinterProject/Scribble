import React from 'react'

// import css
import "./ChatBot.css"

function ChatBot() {
    return (
        <div>
            <div className="chat-card">
                <div className="chat-header">
                    <div className="h2">AI ChatBot</div>
                </div>
                <div className="chat-body">
                    <div className="message incoming">
                        <p>Hello, how can I assist you today?</p>
                    </div>
                    <div className="message outgoing">
                        <p>I have a question about your services.</p>
                    </div>
                    <div className="message incoming">
                        <p>Sure, I'm here to help. What would you like to know?</p>
                    </div>

                </div>
                <div className="chat-footer">
                    <input placeholder="Type your message" type="text" />
                    <button>Send</button>
                </div>
            </div>

        </div>
    )
}

export default ChatBot