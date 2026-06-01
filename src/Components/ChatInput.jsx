import {useState } from 'react'
import dayjs from 'dayjs';
import Chatbot from '../assets/js/chatbot.js';
import '../assets/css/ChatInput.css';

function ChatInput({chatMessages, setChatMessages, isLoading, setIsLoading}) {
    const time = dayjs().valueOf();
    const [inputText, setInputText] = useState('');
            function saveInputText(event){
                setInputText(event.target.value);
            }
            async function sendMessage(event){
                    if (inputText === '' || isLoading ) return;
                    const userMessages = { 
                        message: inputText,
                        sender: 'user',
                        id: crypto.randomUUID(),
                        time: time
                    };
                    const loadingId = crypto.randomUUID();
                    const loadingMessage = {
                                message : 'Loading...',
                                sender : 'bot',
                                id : loadingId,
                                time : time
                            }

                    setChatMessages(prev => [
                        ...prev,
                        userMessages,
                        loadingMessage
                    ]);

                    setInputText('');
                    setIsLoading(true);

                    const response = await Chatbot.getResponseAsync(inputText);
                    setChatMessages(prev =>
                        prev.map(msg =>
                            msg.id === loadingId 
                            ? {...msg, message: response}
                            : msg
                        )
                    );
                    setIsLoading(false);
            }
            return (
                <div className="chat-input-container">
                    <input 
                        className="chat-input"
                        placeholder="Send a message to Chatbot" 
                        size = "30"
                        onKeyDown={(event)=>{event.key === 'Enter' && sendMessage()}}
                        onChange={saveInputText}
                        value={inputText}
                    />
                    <button
                        className="send-btn"
                        onClick={sendMessage}
                    >Send</button>
                </div>
            );
        }
export {ChatInput};