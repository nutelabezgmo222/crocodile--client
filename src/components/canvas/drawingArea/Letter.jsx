import React from 'react';

function Letter(props) {
  return (
    <span className="letter">
      {props.children}
    </span>
  );
}

export default Letter;