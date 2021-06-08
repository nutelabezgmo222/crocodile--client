import React from 'react'
import Player from './Player';
import { useSelector } from 'react-redux';

function PlayerList({onPlayerKick}) {
  const users = useSelector(store => store.game.users);
  return (
    <div className="player-list">
      <h3 className="player-list__title">Игроков {users.length} из {5}</h3>
      <ul className="player-list__block">
        {
        users &&
          users.map(user => {
          return <Player
            onPlayerKick={onPlayerKick}
            key={user.userID}
            {...user} />
        })}
      </ul>
    </div>
  )
}

export default PlayerList
