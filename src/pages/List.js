
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import Modal from '../components/Modal';
import ForestCard from '../components/ForestCard';

export default function List() {
  const forestDataList = [
    { id: 1, name: 'a', address: 'sss', phoneNumber: '000' },
    { id: 2, name: 'b', address: 'bbbb', phoneNumber: '001' },
    { id: 3, name: 'b', address: 'cc', phoneNumber: '001' },
    { id: 4, name: 'b', address: 'dd', phoneNumber: '001' },
    { id: 5, name: 'c', address: 'dd', phoneNumber: '001' },
    { id: 6, name: 'd', address: 'dd', phoneNumber: '001' },
  ];

  let navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [selectList, setSelectList] = useState({});

  // useEffect(() => {
  //   observer.current = new IntersectionObserver((entries, options));
  // });
  console.log(selectList);
  return (
    <>
      {/* {isLoading && <Spinner />} */}
      <ButtonWrapper>
        <ReturnButton onClick={handleClick}>
          <span>메인으로</span>
        </ReturnButton>
      </ButtonWrapper>
      <CardListWrapper>
        {forestDataList.map((data) => (

          <ForestCard
            setSelectList={setSelectList}
            setModalOpen={setModalOpen}
            key={data.id}
            placeInfo={data}
          />
        ))}
      </CardListWrapper>

      {modalOpen && <Modal setModalOpen={setModalOpen} data={selectList} />}
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
