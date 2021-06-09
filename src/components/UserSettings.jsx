import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setAvatar } from '../store/actions/userActions';
import { avatars } from '../helpers/constants';


function UserSettings({onUserInfoChange}) {
  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const user = useSelector(state => state.user);
  const changeName = () => {
    if (user.username !== inputRef.current.value) {
      onUserInfoChange({
        type: "username",
        value: inputRef.current.value.trim(),
      })
    }
  }
  const changeAvatar = (way) => {
    let index = null;
    if ((user.avatarID + way) > Object.keys(avatars).length - 1) {
      index = 0;
    } else if ((user.avatarID + way) < 0) {
      index = Object.keys(avatars).length - 1;
    } else {
      index = user.avatarID + way;
    }

    onUserInfoChange({
        type: "avatarID",
        value: index,
    })
  }
  return (
    <div className="settings-block"> 
      <div className="settings-block__avatar">
        <span onClick={() => changeAvatar(-1)} className="arrow-left"></span>
        <span className={"avatar-big " + avatars[user.avatarID]}></span>
        <span onClick={() => changeAvatar(1)} className="arrow-right"></span>
      </div>
      <div className="settings-block__name">
        <input
          onBlur={changeName} ref={inputRef}
          type="text" className="input"
          placeholder="Ваше имя"
          defaultValue={user.username}
        />
      </div>
    </div>
  )
}

export default UserSettings
