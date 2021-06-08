import React from 'react';

function Color({colorCode, onClick, selectedColor}) {
  return (
    <button 
      className={ selectedColor === colorCode ?'active color-block':'color-block'} 
      style={{backgroundColor: colorCode}}
      onClick={()=>onClick(colorCode)}>
    </button>
  );
}

export default Color;