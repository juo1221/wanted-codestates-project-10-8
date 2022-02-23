import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import BackImg from '../asset/main_bg.png';
import { useNavigate } from 'react-router-dom';
import { CompleteRemovedMsg, CompleteSavedMsg } from '../components/Feedback';

import ForestCard from '../components/ForestCard';
import Modal from '../components/Modal';

export default function Main({ showSaveMsg }) {
  const [showRemoveMsg, setShowRemoveMsg] = useState(false);
  const [myForestPlaces, setMyForestPlaces] = useState('');
  const [checkForest, setCheckForest] = useState([]);
  const [filterName, setFilterName] = useState('이름');
  const [showFilterList, setFilterList] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectList, setSelectList] = useState({});

  const keyWordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const test = JSON.parse(window.localStorage.getItem('myForest'));
    if (test !== null) {
      setCheckForest(test);
      setMyForestPlaces(test);
    }
  }, []);

  // const FeedbackHandler = (setter) => {
  //   setter(true);
  //   setTimeout(() => {
  //     setter(false);
  //   }, 1000);
  // };

  const showFilterHandler = () => {
    if (showFilterList) {
      setFilterList(false);
    } else {
      setFilterList(true);
    }
  };

  const onChangeInput = () => {
    const keyword =
      filterName === '이름'
        ? 'fcNm'
        : filterName === '메모'
        ? 'memo'
        : 'fcAddr';

    console.log(keyWordRef.current.value);
    const filteredForest = checkForest.filter((item) =>
      item[keyword].includes(keyWordRef.current.value),
    );
    console.log(filteredForest);
    setMyForestPlaces(filteredForest);
  };

  return (
    <>
      <MainPage showFilterList={showFilterList}>
        <div className="main_filter">
          <div className="filter" onClick={showFilterHandler}>
            <span>{filterName}</span>
            <span>&#62;</span>
            <ul onClick={(e) => setFilterName(e.target.textContent)}>
              <li>이름</li>
              <li>주소</li>
              <li>메모</li>
            </ul>
          </div>
          <input
            type="text"
            ref={keyWordRef}
            placeholder="검색어를 입력해주세요"
            onChange={onChangeInput}
          />
        </div>
        <div className="main_list">
          {!myForestPlaces && <p>저장된 목록이 없습니다</p>}
          <ul>
            {myForestPlaces &&
              myForestPlaces.map((place, i) => (
                <>
                  <ForestCard
                    setSelectList={setSelectList}
                    setModalOpen={setModalOpen}
                    key={i}
                    dataObj={place}
                  />
                  {modalOpen && (
                    <Modal
                      setModalOpen={setModalOpen}
                      data={selectList}
                      setMyForestPlaces={setMyForestPlaces}
                      setShowRemoveMsg={setShowRemoveMsg}
                    />
                  )}
                </>
              ))}
          </ul>
          <div>
            <button onClick={() => navigate('/list')}>&#43;</button>
          </div>
        </div>
      </MainPage>
      {showSaveMsg && <CompleteSavedMsg />}
      {showRemoveMsg && <CompleteRemovedMsg />}
    </>
  );
}

const MainPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 390px;
  height: 844px;
  padding: 30px 0;
  background: url(${BackImg}) center/cover no-repeat;
  overflow: auto;
  .main_filter {
    display: flex;
    justify-content: space-around;
    position: relative;
    width: 100%;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    > .filter {
      display: flex;
      justify-content: space-around;
      align-items: center;
      position: relative;
      width: 112px;
      height: 54px;
      border: transparent;
      border-radius: 15px;
      background: transparent;
      color: white;
      box-shadow: 2px 2px 6px 0px gray;

      ul {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        max-height: ${({ showFilterList }) =>
          showFilterList ? '200px' : '0px'};
        padding-left: 0;
        margin-top: 10px;
        border-radius: 15px;
        background: rgba(203, 206, 205);
        box-shadow: 2px 2px 6px 0px gray;
        list-style: none;
        transition: max-height 300ms ease-in;
        overflow: hidden;
        z-index: 10;
      }

      li {
        width: 100%;
        height: 100%;
        padding: 10px 0;
        border-radius: 15px;
        text-align: center;
      }

      li:hover {
        background-color: #000000;
        opacity: 10%;
      }
    }

    input {
      padding: 0 8px;
      border: transparent;
      border-radius: 15px;
      background-color: transparent;
      color: #ffffff;
      font-size: 18px;
      font-weight: 600;
      box-shadow: 2px 2px 6px 0px gray;
      outline: none;
    }

    input::placeholder {
      color: #ffffff;
    }
  }

  .main_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1;
    margin-top: 70px;

    p {
      /* color: #ffffff; */
      font-size: 22px;
      font-weight: 600;
    }

    button {
      position: fixed;
      bottom: 10px;
      right: 20px;
      width: 52px;
      height: 52px;
      line-height: 52px;
      margin-top: 10px;
      border: transparent;
      border-radius: 15px;
      color: #85f9cf;
      background-color: #ffffff;
      font-weight: 600;
      font-size: 50px;
      cursor: pointer;
    }
  }
`;
