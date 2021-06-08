import React from 'react';
import Tool from './Tool';
import Range from './Range';
import { Brush, Circle, Rect, Eraser, Line, RectFilled, CircleFilled } from '../tools';
import { useDispatch, useSelector } from 'react-redux';
import { setTool, setLineWidth, setOpacity } from '../../../store/actions/toolActions';
import { pushToRedo, pushToUndo } from '../../../store/actions/canvasActions';

function ToolBar({socket}) {
  const dispatch = useDispatch();
  const canvas = useSelector(state => state.canvas.canvas);
  const undoList = useSelector(state => state.canvas.undoList);
  const redoList = useSelector(state => state.canvas.redoList);
  const [tools, setTools] = React.useState(toolsArr);
  const [thickness, setThickness] = React.useState(thicknessArr);

  const handleThicknessClick = (curTool) => {

    let newThickness = thickness.map(item => {
      let newThicknessItem = {
        ...item,
        active: false,
      }
      if (newThicknessItem.name === curTool.name) {
        newThicknessItem.active = true;
      }
      return newThicknessItem;
    })

    setThickness(newThickness);
    dispatch(setLineWidth(curTool.value));
  }
  const handleToolClick = (curTool) => {

    let newTools = tools.map(tool => {
      let newTool = {
        ...tool,
        active: false,
      }
      if (newTool.name === curTool.name) {
        newTool.active = true;
      }
      return newTool;
    })

    setTools(newTools);

    dispatch(setTool(new curTool.Component(canvas, socket)));
  }

  const handleRangeChange = (e) => {
    let opasity = e.target.value === "10" ? "1" : "0." + e.target.value;
    dispatch(setOpacity(opasity));
  }
  const undo = () => {
    if (undoList.length) {
      let dataUrl = undoList.pop();
      dispatch(pushToRedo(canvas.toDataURL()));
      socket.emit("image:change", dataUrl);
    }
  }
  const redo = () => {
    if (redoList.length) {
      let dataUrl = redoList.pop();
      dispatch(pushToUndo(canvas.toDataURL()));
      socket.emit("image:change", dataUrl);
    }
  }
  return (
    <div className="tool-bar-block">
      <div className="tool-bar-block__tools">
        {
          tools.map(tool => {
            let className = tool.name;
            if (tool.active) {
              className += " active";
            }
            return <Tool key={tool.name} onToolClick={() => handleToolClick(tool)}
              className={className} />
          })
        }
      </div>
      <div className="tool-bar-block__arrows">
        <button onClick={undo} className="arrow-previous"></button>
        <button onClick={redo} className="arrow-next"></button>
      </div>
      <div className="tool-bar-block__thickness">
        {
          thickness.map(tool => {
            let className = tool.name;
            if (tool.active) {
              className += " active";
            }
            return <Tool key={tool.name} onToolClick={() => handleThicknessClick(tool)}
              className={className}/>
          })
        }
      </div>
      <div className="tool-bar-block__opacity">
        <Range onChange={handleRangeChange}></Range>
      </div>
    </div>
  );
}
const thicknessArr = [
  {
    name: "thickness xs",
    active: true,
    value: 2,
  },
  {
    name: "thickness s",
    active: false,
    value: 5,
  },
  {
    name: "thickness m",
    active: false,
    value: 7,
  },
  {
    name: "thickness l",
    active: false,
    value: 10,
  },
  {
    name: "thickness xl",
    active: false,
    value: 15,
  },
]
const toolsArr = [
  {
    name: "pencil",
    Component: Brush,
    active: true,
  },
  {
    name: "square-fill",
    Component: RectFilled,
    active: false,
  },
  {
    name: "circle-fill",
    Component: CircleFilled,
    active: false,
  },
  {
    name: "line",
    Component: Line,
    active: false,
  },
  {
    name: "rubber",
    Component: Eraser,
    active: false,
  },
  {
    name: "square",
    Component: Rect,
    active: false,
  },
  {
    name: "circle",
    Component: Circle,
    active: false,
  },
]

export default ToolBar;
