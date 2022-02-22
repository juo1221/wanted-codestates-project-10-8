import React from "react";
import styled from "styled-components";

const Modal = (props) => {
  const { open } = props;
  return (
    <>
      <ModalBox className={open ? "openModal modal" : "modal"}>
        {open ? (
          <ModalBackground>
            <ModalContents>
              하이
            </ModalContents>
          </ModalBackground>
        ) : null}
      </ModalBox>
    </>
  )
}

const ModalBox = styled.div`
  width: auto;
  height: auto;
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