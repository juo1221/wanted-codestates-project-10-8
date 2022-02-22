import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Modal from "../components/Modal";

export default function List() {
  // 모달 상태관리
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  // 모달 영역 밖 클릭 시 모달 닫기
  const wrapperRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      setModalOpen(false);
    }
  };

  return (
    <>
    <div ref={wrapperRef}>List</div>
    <BtnModal onClick={openModal}>TEST-BTN</BtnModal>
    <Modal open={modalOpen}/>
    </>
  )
}

const BtnModal = styled.button`
  width: 120px;
  height: 40px;
  color: #fff;
  border: none;
  border-radius: 15px;
  background-color: #85f9cf;
`