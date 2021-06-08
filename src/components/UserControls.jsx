import React from 'react'

function UserControls({ onQuickGameClick, onNewGameClick, onJoibByCodeClick }) {
  const inputRef = React.useRef();

  const onJoinByCode = () => {
    let code = inputRef.current.value.match(/^\w+$/g)
    if (code === null) {
      console.error("incorrect code value"); // need handle
    } else {
      onJoibByCodeClick(code);
    }
  }
  return (
    <div className="controls-block">
      <button className='button-long-filled' onClick ={onQuickGameClick}>Быстрая игра</button>
      <span>...или...</span>
      <button className='button-long-filled' onClick ={onNewGameClick}>Создать комнату</button>
      <span>...или...</span>
      <form className="form-with-inp-but">
        <input ref={inputRef} type="text" className="input" placeholder="Ссылка на комнату"/>
        <button className="button-short-filled" type="submit" onClick={onJoinByCode}>Ок</button>
      </form>
    </div>
  )
}

export default UserControls
