import React from 'react';
import { avatars } from '../helpers/constants';

function Avatar({avatarID, username}) {
  return (
    <span className="avatar-block">
      <span className={avatars[avatarID] + " avatar-small"}></span>
      <span className="avatar-block__name">{username}</span>
    </span>
  );
}

export default Avatar;