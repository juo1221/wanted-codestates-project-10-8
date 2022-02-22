import React from 'react';
import styled from 'styled-components';
import Modal from '../components/Modal';
import ForestCard from '../components/ForestCard';

export default function List() {
  const forestDataList = [
    { id: 1, name: 'a', address: 'sss', phoneNumber: '000' },
    { id: 2, name: 'b', address: 'bbbb', phoneNumber: '001' },
  ];
  // useEffect(() => {
  //   observer.current = new IntersectionObserver((entries, options));
  // });

  return (
    <>
      {/* {isLoading && <Spinner />} */}
      <CardListWrapper>
        {forestDataList.map((data) => (
          <ForestCard key={data.id} data={data} />
        ))}
      </CardListWrapper>
      <div>List</div>
      <Modal />
    </>
  );
}

const CardListWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
