import React from 'react';

function AnswerField({ onMessageSend }) {
  let inputRef = React.useRef(null);
  return (
    <form className="form-with-inp-but">
      <input ref={inputRef} type="text" className="input" placeholder="Ваши догадки..."/>
      <button
        onClick={(e) => {
          e.preventDefault();
          onMessageSend(inputRef.current.value.trim().toLowerCase())
          inputRef.current.value = "";
        }}
        className="button-short-filled" type="submit">Ок</button>
    </form>
  );
}

export default AnswerField;
