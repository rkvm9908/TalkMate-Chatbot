import { useState, useEffect , useRef} from 'react'
import './App.css'
import { ChatInput } from './Components/ChatInput';
import { ChatMessages } from './Components/ChatMessages';
import Header from './Components/Header';
import Footer from './Components/Footer';

function App(){
            const [chatMessages,setChatMessages]  = useState([]);
            const [isLoading, setIsLoading] = useState(false);
            // const [chatMessages,setChatMessages] = array;
            // const chatMessages = array[0];
            // const setChatMessages = array[1];

            return(
                <div className="app-container">
                    <Header />
                    <ChatMessages 
                        chatMessages={chatMessages}
                        isLoading={isLoading}
                    />
                    <ChatInput 
                        chatMessages={chatMessages}
                        setChatMessages={setChatMessages}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                    <Footer />
                </div>
            );
        }

export default App
