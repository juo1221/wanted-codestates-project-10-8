import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const Modal = (props) => {
  const wrapperRef = useRef();
  // 모달 상태관리
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = (e) => {
    if(wrapperRef.current === e.target) {
      setModalOpen(false);
    }
  }
  // 모달 영역 밖 클릭 시 모달 닫기
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setModalOpen(false);
      event.stopPropagation();
    }
  };

  return (
    <>
      <ModalBtn ref={wrapperRef} onClick={openModal}>
        TEST-BTN
      </ModalBtn>
      {modalOpen ? (
        <ModalBackground>
          <ModalContents>
            하이
          </ModalContents>
        </ModalBackground>
      ) : null}
    </>
  );
};

const ModalBtn = styled.button`
  width: 220px;
  height: 50px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 15px;
  background-color: #85f9cf;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(50, 61, 69, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;

  animation: fadeInBackground 0.35s;

  @keyframes fadeInBackground {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContents = styled.div`
  width: 75%;
  height: 80%;
  padding: 10px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: fadeInModal 0.35s;

  @keyframes fadeInModal {
    from {
      opacity: 0;
      margin-top: -150px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;

export default Modal;
