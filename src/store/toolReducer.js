import { gmC } from "../helpers/constants";

const initialState = {
  tool: null,
  color: "rgba(0, 0, 0, 1)",
  lineWidth: 2,
  opacity: 1,
};

export const toolReducer = (state = initialState, action) => {
  switch (action.type) {
    case gmC.SET_LINE_WIDTH: {
      let tool = state.tool;
      if (tool !== null) {
        tool.lineWidth = action.payload.lineWidth;
      }
      return {
        ...state,
        tool: tool,
        lineWidth: action.payload.lineWidth,
      };
    }
      
    case gmC.SET_COLOR: {
      let tool = state.tool;
      const newColor = getNewColor(action.payload.color, state.opacity);

      if (tool !== null) {
        tool.strokeStyle = newColor;
        tool.fillStyle = newColor;
      }

      return {
        ...state,
        tool: tool,
        color: newColor,
      };
    }
      
    case gmC.SET_TOOL: {
      let tool = action.payload.tool;
      if (action.payload.tool === null && state.tool !== null) {
        state.tool.destroyEvents();
      }

      if (tool !== null) {
        tool.strokeStyle = state.color;
        tool.fillStyle = state.color;
        tool.lineWidth = state.lineWidth;
      }

      return {
        ...state,
        tool,
      };
    }
      
    case gmC.SET_OPACITY: {
      const newColor = getNewColor(state.color, action.payload.opacity);
      let tool = state.tool;

      if (tool !== null) {
        tool.fillStyle = newColor;
        tool.strokeStyle = newColor;
      }
      
      return {
        ...state,
        color: newColor,
        opacity: action.payload.opacity,
      };
    }
      
    default: {
      return state;
    }
  }
};


function getNewColor(color, opasity) {
  let colorArr = color.split(", ");
  colorArr[3] = opasity + ")";
  return colorArr.join(", ");
} 