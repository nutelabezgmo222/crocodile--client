import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setAvatar } from '../store/actions/userActions';
import { avatars } from '../helpers/constants';


function UserSettings() {
  const dispatch = useDispatch();
  const inputRef = React.useRef();
  const user = useSelector(state => state.user);
  const changeName = () => {
    if (user.username !== inputRef.current.value) {
      dispatch(setUsername(inputRef.current.value.trim()))
    }
  }
  const changeAvatar = (way) => {
    if ((user.avatarID + way) > Object.keys(avatars).length - 1) {
      dispatch(setAvatar(0));
    } else if ((user.avatarID + way) < 0) {
      dispatch(setAvatar(Object.keys(avatars).length - 1));
    } else {
      dispatch(setAvatar(user.avatarID + way))
    }
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
