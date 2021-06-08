import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Timer() {
  const isRoundStarted = useSelector(state => state.game.isRoundStarted);
  const counter = useSelector(state => state.game.counter);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (isRoundStarted) {
      const timer = setInterval(() => {
        dispatch({type: "COUNTER_TICK"});
        if (counter <= 0) {
          clearInterval(timer);
        }
      }, 1000);
      return () => {
        clearInterval(timer);
      }
    }
  }, [isRoundStarted]);
  const minutes = Math.floor(counter / 60);
  const seconds = counter % 60;
  return (
    <span className="timer-block">
      {minutes > 9 ? minutes:'0'+minutes}:{seconds > 9 ? seconds:'0'+seconds}
    </span>
  );
}

export default Timer;