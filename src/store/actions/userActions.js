import { gmC } from "../../helpers/constants.js";

export const setUsername = (username) => {
  return {
    type: gmC.SET_USERNAME,
    payload: {
      username,
    },
  };
};

export const setUserID = (userID) => {
  return {
    type: gmC.SET_USERID,
    payload: {
      userID,
    },
  };
};

export const setConnection = (isConnected) => {
  return {
    type: gmC.SET_CONNECTION,
    payload: {
      isConnected
    }
  }
}

export const setAvatar = (avatarID) => {
  return {
    type: gmC.SET_AVATAR,
    payload: {
      avatarID
    }
  }
}
export const setWordHint = (word) => {
  return {
    type: gmC.SET_WORD_HINT,
    payload: {
      word,
    },
  };
};


