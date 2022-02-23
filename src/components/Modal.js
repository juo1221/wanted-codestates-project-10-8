import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MemoRequestMsg } from './Feedback';

const Modal = ({ data, setModalOpen }) => {
  // const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showMemo, setShowMemo] = useState(false);
  const { name, address, phoneNumber } = data;
  const [myForestList, setMyForestList] = useState([]);
  useEffect(() => {
    const test = JSON.parse(window.localStorage.getItem('myForest'));
    if (test !== null) {
      setMyForestList(test);
    }
  }, []);
  console.log(myForestList);
  const openModal = () => {
    // setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const showMemoRequests = () => {
    if (showMemo) return;
    if (inputValue.length === 0) {
      setShowMemo(true);
      setTimeout(() => {
        setShowMemo(false);
      }, 1000);
    }
  };
  const saveMyForest = () => {
    const myForestArry = [
      ...myForestList,
      {
        name,
        address,
        phoneNumber,
        memo: inputValue,
      },
    ];
    window.localStorage.setItem('myForest', JSON.stringify(myForestArry));
  };
  const inputHandler = () => {
    showMemoRequests();
    if (inputValue.length > 0) {
      saveMyForest();
      setModalOpen(false);
    }
  };

  return (
    <>
      {showMemo && <MemoRequestMsg />}
      <ModalBox>
        <ModalBtn onClick={openModal}>ModalTest-BTN</ModalBtn>
        <>
          <ModalContents>
            <Box>
              <p className="BoxText">이름</p>
              <p className="BoxData">{name}</p>
            </Box>
            <Box>
              <p className="BoxText">주소</p>
              <p className="BoxData">{address}</p>
            </Box>
            <Box>
              <p className="BoxText">연락처</p>
              <p className="BoxData">{phoneNumber}</p>
            </Box>
            <BoxTwo>
              <p className="BoxText">메모</p>
              <MemoInput
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value);
                }}
              />
              <SaveButton onClick={inputHandler}>저장</SaveButton>
            </BoxTwo>
          </ModalContents>
          <ModalBackground onClick={closeModal} />
        </>
      </ModalBox>
    </>
  );
};

const ModalBox = styled.div`
  width: auto;
  height: auto;
`;

const ModalBtn = styled.button`
  width: 220px;
  height: 50px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border-radius: 15px;
  background-color: #85f9cf;
`;

const ModalContents = styled.div`
  width: 75%;
  height: auto;
  padding: 10% 8%;
  overflow: hidden;
  background-color: #fff;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: fadeInModal 0.35s;
  z-index: 9;

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

const Box = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 30px;

  .BoxText {
    color: #ccc;
    font-size: 1rem;
    font-weight: bold;
  }
  .BoxData {
    font-size: 1rem;
    font-weight: bold;
    margin-top: 15px;
  }
`;

const BoxTwo = styled(Box)`
  margin-top: 30px;
`;

const MemoInput = styled.input`
  width: 100%;
  height: 45px;
  margin-top: 15px;
  padding: 0 10px;
  border: 1px solid #efefef;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`;

const SaveButton = styled.button`
  width: 100%;
  height: 45px;
  color: #fff;
  margin-top: 20px;
  padding: 0 10px;
  background-color: #85f9cf;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-weight: bold;
  font-size: 16px;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 8;

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

export default Modal;
