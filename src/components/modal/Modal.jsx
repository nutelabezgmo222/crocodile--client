import React from 'react';

function Modal(props) {
  return (
    <div className={props.className+" modal-block"}>
      <div className="modal-block__content" style={{width: props.w+'px', height: props.h+'px'}}>
        {props.children}
      </div>
    </div>
  );
}

export default Modal;
