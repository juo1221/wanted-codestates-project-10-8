import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../asset/Arrow.svg';
import { useNavigate } from 'react-router-dom';
import {
  CompleteRemovedMsg,
  CompleteSavedMsg,
  MemoRequestMsg,
} from '../components/Feedback';

import ForestCard from '../components/ForestCard';

export default function Main({ showSaveMsg }) {
  const [myForestPlaces, setMyForestPlaces] = useState('');
  const [checkForest, setCheckForest] = useState([]);
  const [filterName, setFilterName] = useState('이름');
  const [showFilterList, setFilterList] = useState(false);
  const [showFeedbackMemo, setShowFeedbackMemo] = useState(false);
  const [showFeedbackSave, setShowFeedbackSave] = useState(false);
  const [showFeedbackRemove, setShowFeedbackRemove] = useState(false);

  const keyWordRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const test = JSON.parse(window.localStorage.getItem('myForest'));
    if (test !== null) {
      setCheckForest(test);
      setMyForestPlaces(test);
    }
  }, []);

  const FeedbackHandler = (setter) => {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 1000);
  };

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
    <MainContainer>
      <MainPage showFilterList={showFilterList}>
        <div className="main_filter">
          <div className="filter" onClick={showFilterHandler}>
            <span>{filterName}</span>
            <span>
              <Arrow fill="#333" width="12" />
            </span>
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
                <ForestCard key={i} dataObj={place} />
              ))}
          </ul>

          <div>
            <button onClick={() => navigate('/list')}>&#43;</button>
          </div>
        </div>
      </MainPage>
      {/* <ButtonStyle onClick={() => FeedbackHandler(setShowFeedbackMemo)}>
        memo
      </ButtonStyle>
      <ButtonStyle onClick={() => FeedbackHandler(setShowFeedbackSave)}>
        save
      </ButtonStyle>
      <ButtonStyle onClick={() => FeedbackHandler(setShowFeedbackRemove)}>
        remove
      </ButtonStyle>
      {showFeedbackMemo && <MemoRequestMsg />}
      {showFeedbackSave && <CompleteSavedMsg />}
      {showFeedbackRemove && <CompleteRemovedMsg />} */}
    </MainContainer>
      {showSaveMsg && <CompleteSavedMsg />}
    </>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #efefef;
`;

const MainPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 390px;
  height: 844px;
  padding: 30px 0;
  overflow: auto;
  background: #fff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;

  .main_filter {
    display: flex;
    justify-content: space-around;
    position: relative;
    width: 100%;
    font-size: 16px;
    font-weight: 400;
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
      background: #fff;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);

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
        background: rgba(255, 255, 255);
        box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
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
        background: rgba(133, 249, 207);
      }
    }

    input {
      width: 232px;
      padding: 0 18px;
      border: transparent;
      border-radius: 15px;
      background: rgba(255, 255, 255, 0.2);
      font-size: 16px;
      font-weight: 400;
      box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
      outline: none;
    }

    input::placeholder {
      color: #000;
    }
  }

  .main_list {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    flex: 1;
    margin-top: 40px;

    p {
      color: #ffffff;
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
    & > ul > article {
      margin-bottom: 45px;
    }
  }
`;
