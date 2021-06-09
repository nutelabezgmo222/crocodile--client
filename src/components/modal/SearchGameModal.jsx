import React from 'react';
import Modal from './Modal';
import Logo  from '../Logo';
function SearchGameModal({children}) {
  return (
    <Modal w="446" h="315" className="find-game-block dark">
      <h3 className="title text-medium">Ищем игру</h3>
      <Logo>
        <span className="logo-load"></span>
      </Logo>
      {
        children
      }
    </Modal>
  );
}

export default SearchGameModal;
