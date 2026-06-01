import {useRef, useEffect, useState} from 'react';
import {ChatMessage} from './ChatMessage'; 
import '../assets/css/ChatMessages.css'

        function ChatMessages({chatMessages, isLoading}) {
            const chatMessagesRef = useRef(null);
            useEffect(() => {
                const containerElem = chatMessagesRef.current;
                if (containerElem) {
                    containerElem.scrollTop = 
                    containerElem.scrollHeight;
                }
            },[chatMessages,isLoading]);
            return (
                <div 
                    className="chat-messages-container"
                    ref={chatMessagesRef}
                    >
                    {chatMessages.map((chatMessage) => {
                        return(
                            <ChatMessage 
                                message={chatMessage.message}
                                sender={chatMessage.sender}
                                key={chatMessage.id}
                            />
                        );
                    })}
                </div>
            )
        }
export {ChatMessages};
