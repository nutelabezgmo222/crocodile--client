import React from 'react'
import { Logo, UserSettings, UserControls } from '../components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { WarningModal } from '../components';

function StartPage({ onFindGameClick, onNewGameClick, onJoibByCodeClick, socketGetConnection }) {
  
  let totalPlayers = useSelector(state => state.game.totalPlayers);
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);

  const handleFindGameClick = () => {
    onFindGameClick(setLoading, setErrorMessage);
  }
  const hideErrorMessage = () => {
    setErrorMessage(null);
  }
  const findAbort = () => {
    window.location.reload();
  }

  React.useEffect(() => {
    socketGetConnection(true, 2000)
      .catch(msg => {
      if (msg instanceof Error) {
        console.error(msg.message); // handle reject connection
      } else {
        console.warn(msg);
      }
    });
  }, [])
  return (
    <div className="start-page-block">
      <span className="player-number">Игроков онлайн: {totalPlayers}</span>
      {
        loading ?
          <div>
            <p>Ищем игру...</p>
            <button onClick={findAbort}>Отмена</button>
          </div> :
          errorMessage ?
          <WarningModal title={errorMessage.title} body={errorMessage.body} >
              <Link to="/">
                <button onClick={hideErrorMessage} className="button-medium-filled">Ладно</button>
              </Link>
            </WarningModal>  
            :
          <div className="start-page__content">
            <Logo>
              <span className="logo-big"></span>
            </Logo>
            <UserSettings />
            <UserControls
              onNewGameClick={onNewGameClick}
              onQuickGameClick={handleFindGameClick}
              onJoibByCodeClick={onJoibByCodeClick}
            />
          </div>
      }
    </div>
  )
}

export default StartPage