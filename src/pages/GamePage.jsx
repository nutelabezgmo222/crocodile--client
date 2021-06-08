import React from 'react'
import { useParams } from 'react-router-dom'  
import { PlayerArea, DrawingArea, Logo, WarningModal } from '../components';
import { Link } from 'react-router-dom';

function GamePage({onLobbyLoading, onPlayerKick, onStartGameClick, onWordChoose, socket}) {
  let { roomID } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [isRoomFound, setRoomFound] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState({});

  React.useEffect(() => {
    onLobbyLoading(roomID, setLoading, setRoomFound, setErrorMessage);
  }, [roomID])

  return (
    <div className="game-page-block">
      {
        loading ?
          <div>Loading</div> :
          !isRoomFound ?
            <WarningModal title={errorMessage.title} body={errorMessage.body} >
              <Link to="/">
                <button className="button-medium-filled">Ладно</button>
              </Link>
            </WarningModal>  
            :
            <div className="game-page-block__content">
              <Logo>
                <Link to="/" >
                  <button className="button-short-unfilled">
                      Назад
                  </button>
                </Link>
                <span className="logo-small"></span>
              </Logo>
              <DrawingArea
                socket={socket}
                onWordChoose={onWordChoose} />
              <PlayerArea
                socket={socket}
                onPlayerKick={onPlayerKick}
                onStartGameClick={onStartGameClick}
              />
            </div>
      }
    </div>
  )
}

export default GamePage