import React from 'react'
import PlayerList from './PlayerList';
import GameChat from './GameChat';
import { useSelector } from 'react-redux';

function PlayerArea({ socket }) {
  const hostID = useSelector(state => state.game.roomHostID);
  const userID = useSelector(state => state.user.userID);
  const isGameStarted = useSelector(state => state.game.isGameStarted);
  const isRoundStarted = useSelector(state => state.game.isRoundStarted);

  const handlePlayerKick = (userID) => {
    socket.emit("room:kickPlayer", userID);
  };
  const handleStartGameClick = () => {
    socket.emit("game:start");
  }
  const handleGamePrivateClick = (e) => {
    socket.emit("game:private", e.target.checked);
  }

  let startGameBlock = "";
  if (hostID === userID) {
    startGameBlock = <div className="start-game-block">
      <div className="start-game-block__private">
        <input onChange={handleGamePrivateClick} id="in" type="checkbox" className="checkbox" />
        <label htmlFor="in">
          Сделать комнату приватной
        </label>
      </div>
      <div className="start-game-block__buttons">
        <button className="button-medium-filled" onClick={handleStartGameClick}>Начать</button>
      </div>
    </div>
  } else {
    startGameBlock = <div className="start-game-block">
        <p className="text">Ждем когда ведущий запустит игру...</p>
      </div>
  }
  return (
    <div className="player-area-block">
      <PlayerList onPlayerKick={handlePlayerKick} />
      {
        isGameStarted ?
          (isRoundStarted ?
              <GameChat socket={socket} />:
            <p>Ждем пока игрок выберет слово</p>
          )
          :
          startGameBlock
      }
    </div>
  )
}

export default PlayerArea
