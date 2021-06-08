import { gmC } from "../../helpers/constants.js";

export const setCanvas = (canvas) => {
  return {
    type: gmC.SET_CANVAS,
    payload: {
      canvas,
    },
  };
};


export const pushToUndo = (data) => {
  return {
    type: gmC.PUSH_TO_UNDO,
    payload: {
      data,
    }
  }
}

export const pushToRedo = (data) => {
  return {
    type: gmC.PUSH_TO_REDO,
    payload: {
      data,
    },
  };
};