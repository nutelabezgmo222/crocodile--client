import React from 'react';
import Modal from './Modal';
import { Link } from 'react-router-dom'
function WarningModal({title ="", body ="", children}) {
  return (
    <Modal w="446" h="315" className="room-not-found-block dark">
      <h3 className="title text-medium">{ title }</h3>
        <span className="error-exclamation"></span>
        <p className="text-small">{body}</p>
        {
          children
        }
    </Modal>
  );
}

export default WarningModal;
