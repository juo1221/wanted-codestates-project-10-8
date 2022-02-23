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
    <ListWrapper>
      {isLoading && <Spinner />}
      {cardList}
      <Modal />
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
`;
