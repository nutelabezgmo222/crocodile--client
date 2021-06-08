import { gmC } from '../../helpers/constants.js';


export const setUsers = (users) => {
  return {
    type: gmC.SET_USERS,
    payload: {
      users
    }
  };
}
export const setRoomID = (roomID) => {
  return {
    type: gmC.SET_ROOMID,
    payload: {
      roomID
    }
  }
}
export const addUser = (user) => {
  return {
    type: gmC.ADD_USER,
    payload: {
      user
    }
  }
}
export const removeUser = (userID) => {
  return {
    type: gmC.REMOVE_USER,
    payload: {
      userID
    }
  }
}
export const setRoomHostID = (roomHostID) => {
  return {
    type: gmC.SET_ROOM_HOSTID,
    payload: {
      roomHostID
    }
  }
}
export const setGameStarted = (isGameStarted) => {
  return {
    type: gmC.SET_GAME_STARTED,
    payload: {
      isGameStarted,
    },
  };
};

export const setRoundStarted = (isRoundStarted) => {
  return {
    type: gmC.SET_ROUND_STARTED,
    payload: {
      isRoundStarted
    }
  }
}
export const setLetters = (letters) => {
  return {
    type: gmC.SET_LETTERS,
    payload: {
      letters
    }
  }
}
export const setGameModalData = (data, isSeen) => {
  return {
    type: gmC.SET_GAME_MODAL,
    payload: {
      winner: data.winner,
      word: data.word,
      isSeen: isSeen,
    },
  };
};

export const discardGameData = () => {
  return {
    type: gmC.DISCARD_GAME_DATA
  };
}

export const setGameCounter = (time) => {
  return {
    type: gmC.SET_GAME_COUNTER,
    payload: {
      counter: time
    }
  };
};

export const setNewMessage = (msg) => {
  return {
    type: gmC.SET_NEW_MESSAGE,
    payload: {
      message: msg
    }
  };
};

export const setTotalPlayers = (num) => {
  return {
    type: gmC.SET_TOTAL_PLAYERS,
    payload: {
      totalPlayers: num,
    }
  }
}

export const setLeaderID = (leaderID) => {
  return {
    type: gmC.SET_LEADER,
    payload: {
      leaderID,
    }
  }
}

export const setMessages = (messages) => {
  return {
    type: gmC.SET_MESSAGES,
    payload: {
      messages,
    },
  };
};