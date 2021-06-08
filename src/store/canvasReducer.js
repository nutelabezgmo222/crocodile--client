import { gmC } from "../helpers/constants";

const initialState = {
  canvas: null,
  undoList: [],
  redoList: [],
};

export const canvasReducer = (state = initialState, action) => {
  switch (action.type) {
    case gmC.PUSH_TO_UNDO: {
      const newUndoList = state.undoList.slice();
      newUndoList.push(action.payload.data);
      return {
        ...state,
        undoList: newUndoList,
      };
    }
    case gmC.PUSH_TO_REDO: {
      const newRedoList = state.redoList.slice();
      newRedoList.push(action.payload.data);
      return {
        ...state,
        redoList: newRedoList,
      };
    }
    case gmC.SET_CANVAS: {
      return {
        ...state,
        canvas: action.payload.canvas,
      };
    }
    default: {
      return state;
    }
  }
}