//list
import React, { useState, useRef, useEffect, useCallback } from 'react';
import Modal from '../components/Modal';
import ForestCard from '../components/ForestCard';
import Spinner from '../components/Spinner';
import styled from 'styled-components';

export default function List() {
  const URL = '/openapi-json/pubdata/pubMapForest.do';
  const PAGE_NUMBER = 1;
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(PAGE_NUMBER);
  const [forestDataList, setforestDataList] = useState([]);
  const targetRef = useRef(null);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };
  const idSet = new Set();
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await (
        await fetch(`${URL}?pageNo=${page}&numOfRows=20`)
      ).json();
      const dataArr = JSON.parse(res).response;
      setforestDataList((prev) => [...prev, ...dataArr]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  useEffect(() => {
    loadData();
  }, [page]);

  const callback = ([entry], observer) => {
    if (entry.isIntersecting) setPage(page + 1);
  };
  useEffect(() => {
    if (!targetRef.current) return;
    const observer = new IntersectionObserver(callback, options);
    observer.observe(targetRef.current);
    return () => observer.disconnect();
  }, [loadData]);

  const cardList = forestDataList.map((dataObj, idx) => {
    if (idSet.has(dataObj.fcNo)) {
      return '';
    } else {
      idSet.add(dataObj.fcNo);
      return (
        <ForestCard
          key={dataObj.fcNo}
          dataObj={dataObj}
          ref={idx + 4 === forestDataList.length ? targetRef : undefined}
        />
      );
    }
  });

  return (
    <>
      {isLoading && <Spinner />}
      {cardList}
      >>>>>>> 9615445 ([Feat] #20 infinity scroll 구현)
      <Modal />
    </>
  );
}

const ButtonWrapper = styled.section`
  width: 362px;
  height: 75px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

const ReturnButton = styled.button`
  &:before {
    content: '<';
  }
  width: 65px;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 700;
  color: #e5e5e5;
  cursor: pointer;

  span {
    font-size: 14px;
    margin-left: 4px;
  }
`;

const CardListWrapper = styled.section`
  width: 100%;
  // height: 100vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: space-around;

  & > article {
    margin: 10px 0;
  }
`;
