import React from 'react';
import Message from './Message';
import AnswerField from './AnswerField';
import { useSelector, useDispatch } from 'react-redux';
import { setNewMessage } from '../../store/actions/gameActions';

function GameChat({ socket }) {
  const dispatch = useDispatch();

  let messages = useSelector(state => state.game.messages);
  let user = useSelector(state => state.user);
  let leaderID = useSelector(state => state.game.leaderID);
  let hostID = useSelector(state => state.game.roomHostID);

  let userID = user.userID;
  let userName = user.username;

  const handleSendMessage = (text) => {
    if(text !== ''){
      const msg = { from: userName, text: text };
      
      socket.emit("game:checkWord", msg);
    }
  };

  React.useEffect(() => {
    socket.on('game:newMessage', msg => {
      dispatch(setNewMessage(msg));
    });
    return () => {
      socket.removeListener('game:newMessage');
    }
  }, [])

  return (
    <div className="game-chat-block">
      <div className={(hostID === userID?"host":"") + " box"}>
        <ul className="game-chat-block__messages">
          {messages.map((msg, i) => <Message key={i} from={msg.from}>{msg.text}</Message>)}          
        </ul>
      </div>
      {
        leaderID !== userID &&
        <AnswerField onMessageSend={handleSendMessage}/>
      }
    </div>
  );
}

export default GameChat;
