import BotProfile from '../assets/profile1.ico';
import UserProfile from '../assets/profile2.ico';
import dayjs from 'dayjs';
import '../assets/css/ChatMessage.css';
function ChatMessage({message , sender, time}){
            // const message = props.message;
            // const sender = props.sender;
            //const {message, sender} = props;

            // if(sender === 'bot'){
            //     return(
            //     <div>
            //         <img src="profile2.ico" width="50" />
            //         {message}
            //     </div>
            // );
            // }
            return(
                <div className={
                    sender === 'user' 
                    ? 'chat-msg-user' 
                    : 'chat-msg-bot'
                }>
                    {sender === 'bot' && (
                        <img src={BotProfile} className="chat-profile" />
                    )}
                    <div className="msg-text">{message}
                        <div className="msg-time">
                            {dayjs(time).format('h:mma')}
                        </div>
                    </div>
                    {sender === 'user' && (
                        <img src={UserProfile} className="chat-profile" />
                    )}
                </div>
            );
        }
export {ChatMessage};