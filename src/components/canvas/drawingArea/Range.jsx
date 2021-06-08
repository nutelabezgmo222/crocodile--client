import React from 'react';

function Range({onChange}) {
  return (
    <>
        <span className="circle"></span>
        <div className="input-block">
          <input onChange={onChange} type="range" min="1" max="10" step="1"/>
        </div>
        <span className="circle-fill"></span>
    </>
  );
}

export default Range;
