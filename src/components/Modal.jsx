import React from 'react';
import styled from 'styled-components';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

// Modal Container
const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: modalOpen .3s ease-in-out; 
  @keyframes modalOpen {
    from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

  &.show {
    display: flex;
  }
`;

// Modal Content
const ModalContent = styled.div`
  background-color: #fff; /* White background */
  padding: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  width: 60%;
  text-align: center;
  position: relative;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  z-index: 1001;
  &.entering,
  &.exiting {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  &.entered {
    opacity: 1;
    transform: scale(1);
  }

`;

// Close Button
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

// Modal Overlay (the semi-transparent background outside the modal)
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999; 
`;


function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <ModalContainer className="modal">
      <ModalContent className="modal-content">
        <CloseButton className="close-button" onClick={onClose}>
          <CloseOutlinedIcon/>
        </CloseButton>
        {children}
      </ModalContent>
      <ModalOverlay className="modal-overlay" onClick={onClose}></ModalOverlay>
    </ModalContainer>
  );
}

export default Modal;
