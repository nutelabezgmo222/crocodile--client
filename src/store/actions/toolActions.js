import { gmC } from "../../helpers/constants.js";

export const setColor = (color) => {
  return {
    type: gmC.SET_COLOR,
    payload: {
      color,
    },
  };
};
export const setTool = (tool) => {
  return {
    type: gmC.SET_TOOL,
    payload: {
      tool,
    },
  };
};
export const setLineWidth = (lineWidth) => {
  return {
    type: gmC.SET_LINE_WIDTH,
    payload: {
      lineWidth,
    }
  }
}

export const setOpacity = (opacity) => {
  return {
    type: gmC.SET_OPACITY,
    payload: {
      opacity,
    },
  };
};
