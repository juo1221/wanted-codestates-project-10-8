import React, { useState } from 'react';
import styled from 'styled-components';

const Modal = (props) => {
  // 모달 상태관리
  const [modalOpen, setModalOpen] = useState(false);
  // 오픈 모달
  const openModal = () => {
    setModalOpen(true);
  };
  // 모달 영역 밖 클릭 시 모달 닫기
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <ModalBox>
        <ModalBtn onClick={openModal}>ModalTest-BTN</ModalBtn>
        {modalOpen ? (
          <>
            <ModalContents>
              <Box>
                <p className='BoxText'>이름</p>
                <p className='BoxData'>속리산숲체험휴양마을</p>
              </Box>
              <Box>
                <p className='BoxText'>주소</p>
                <p className='BoxData'>충청북도 보운군 속리산</p>
              </Box>
              <Box>
                <p className='BoxText'>연락처</p>
                <p className='BoxData'>043-540-3220</p>
              </Box>
              <BoxTwo>
                <p className='BoxText'>메모</p>
                <MemoInput />
                <SaveButton>저장</SaveButton>
                <DeleteButton>삭제</DeleteButton>
              </BoxTwo>
            </ModalContents>
            <ModalBackground onClick={closeModal} />
          </>
        ) : null}
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
  padding: 15% 8%;
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
`

const BoxTwo = styled(Box)`
  margin-top: 30px;
`

const MemoInput = styled.input`
  width: 100%;
  height: 45px;
  margin-top: 15px;
  padding: 0 10px;
  border: 1px solid #EFEFEF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
`

const SaveButton = styled.button`
  width: 100%;
  height: 45px;
  color: #fff;
  margin-top: 20px;
  padding: 0 10px;
  background-color: #85F9CF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 15px;
  font-weight: bold;
  font-size: 16px;
`

const DeleteButton = styled(SaveButton)`
  background-color: #FF6B6B;
`

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
