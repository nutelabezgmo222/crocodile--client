import React from 'react';
import Letter from './Letter';
import { useSelector } from 'react-redux';

function Letters() {
  let letters = useSelector(state => state.game.letters);
  return (
    <span className="letters-block">
      {
        letters.length ?
        letters.map((letter, i) => {
          return <Letter key={i}>{letter}</Letter>
        })
          :
        ""
      }
    </span>
  );
}

export default Letters;