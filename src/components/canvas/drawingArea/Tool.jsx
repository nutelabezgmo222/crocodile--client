import React from 'react';

function Tool({className, onToolClick}) {
  return (
    <button className={className} onClick={onToolClick}></button>
  );
}

export default Tool;
