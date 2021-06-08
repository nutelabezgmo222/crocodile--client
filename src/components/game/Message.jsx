import React from 'react';

function Message(props) {
  return (
    <li className="item">
      <span className="from">
        {props.from?props.from+": ":""}
      </span>
      <span className="text">
        {props.children}
      </span>
    </li>
  );
}

export default Message;
