import React from 'react';
import Modal from './Modal';

function WinnerModal({children, word, onDownloadClick}) {

  return (
    <Modal w="280" className="winner-modal-block">
      <h3 className="title">{word}</h3>
      {
        children
      }
      <form className="form-with-inp-but">
        <button onClick={onDownloadClick} className="button-long-filled copy" type="submit">скачать картинку</button>
      </form>
    </Modal>
  );
}

export default WinnerModal;
