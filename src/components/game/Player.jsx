import React from 'react'
import { useSelector } from 'react-redux'
import Avatar from '../Avatar';

function Player({ username, userID, onPlayerKick, avatarID, pointCount }) {
  const hostID = useSelector(state => state.game.roomHostID);
  const curUserID = useSelector(state => state.user.userID);
  let removeButton = "";
  if (curUserID === hostID && curUserID !== userID) {
    removeButton = <button className="remove-player" onClick={() => onPlayerKick(userID)}>Kick</button>;
  }
  return (
    <li className="player-list__block__item">
      <Avatar avatarID={avatarID} username={username}/>
      <span className="score">
        <span className="point-count">{pointCount}</span>
        <span className="coin"></span>
      </span>
      {
        removeButton
      }
    </li>
  )
}

export default Player
