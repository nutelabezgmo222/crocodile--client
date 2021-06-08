import { gmC } from "../helpers/constants";

const initialState = {
  userID: "",
  username: '',
  avatarID: 0,
  isConnected: false,
  wordHint: "",
};


export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case gmC.SET_WORD_HINT: {
      return {
        ...state,
        wordHint: action.payload.word
      }
    }
    case gmC.SET_USERNAME: {
      return {
        ...state,
        username: action.payload.username
      }
    }
    case gmC.SET_USERID: {
      return {
        ...state,
        userID: action.payload.userID
      }
    }
    case gmC.SET_CONNECTION: {
      return {
        ...state,
        isConnected: action.payload.isConnected
      }
    }
    case gmC.SET_AVATAR: {
      return {
        ...state,
        avatarID: action.payload.avatarID,
      };
    }
    default: {
      return state;
    }
  }
};
