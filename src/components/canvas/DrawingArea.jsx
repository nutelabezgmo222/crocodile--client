import React from 'react';
import { Canvas, ToolBar, Avatar, Letters, Timer, ColorsBar, ChooseModal, WinnerModal } from '../index.js';
import { useSelector, useDispatch } from 'react-redux';
import { setWordHint } from '../../store/actions/userActions';
import { discardGameData } from '../../store/actions/gameActions';

function DrawingArea({ socket }) {
  const dispatch = useDispatch();
  const userID = useSelector(state => state.user.userID);
  const leaderID = useSelector(state => state.game.leaderID);
  const leader = useSelector(state => state.game.users.find(user => {
    return user.userID === leaderID;
  }));
  const isGameStarted = useSelector(state => state.game.isGameStarted);
  const isRoundStarted = useSelector(state => state.game.isRoundStarted);
  const modalData = useSelector(state => state.game.gameModal);
  const wordHint = useSelector(state => state.user.wordHint);
  const canvas = useSelector(state => state.canvas.canvas);

  const handleDownloadClick = (e) => {
    e.preventDefault();
    const dataUrl = canvas.toDataURL();
    const link = document.createElement('a');
    link.download = (Math.random()*1e18).toString(26) + '.jpg';
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  const handleWordChoose = (word) => {
    dispatch(setWordHint(word));
    socket.emit("game:wordChoose", word);
  }

  React.useEffect(() => {
    if (modalData.isSeen) {
      setTimeout(() => {
        dispatch(discardGameData());
      }, 5000)
    }
  }, [modalData.isSeen])
  
  return (
    <div className="drawing-area-block">
      <Canvas socket={socket}>
        {
          leader &&
          <Avatar avatarID={leader.avatarID} username={leader.username}/>
        }
        <Letters/>
        <Timer />
        {
          !modalData.isSeen && leader && leader.userID === userID && isGameStarted &&
          <ColorsBar/>
        }
        {
          !modalData.isSeen && leader && leader.userID === userID && isGameStarted &&
          <p className="word-hint">{wordHint}</p>
        }
        {
          modalData.isSeen &&
          <WinnerModal word={modalData.word} onDownloadClick={handleDownloadClick}>
            <p className="win-text">{modalData.winner ? "Победил игрок " + modalData.winner : "Никто не угадал слово"}</p>
            <p className="win-text">Новая игра начнется через 5 секунд.</p>
          </WinnerModal>
        }
        
      </Canvas>
      {
        !modalData.isSeen && leader && leader.userID === userID && isGameStarted &&
        <ToolBar socket={socket}/>
      }
      {
        !modalData.isSeen && leader && leaderID === userID && isGameStarted && !isRoundStarted &&
        <ChooseModal onWordChoose={handleWordChoose}></ChooseModal>
      }
    </div>
  )
}

export default DrawingArea
