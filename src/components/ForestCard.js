import React from 'react';
import styled from 'styled-components';

const ForestCard = (props) => {
  const [forestName, address, phoneNumber] = [
    '속리산숲체험휴양마을',
    '충청북도 보은군 속리산면 속리산로 596',
    '012-2334-1232',
  ];

  return (
    <Card>
      <h3>{forestName}</h3>
      <div>📍 {address}</div>
      <div>📞 {phoneNumber}</div>
    </Card>
  );
};

const Card = styled.article`
  width: 362px;
  height: 135px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  padding-left: 17px;

  h3 {
    font-size: 20px;
  }
`;

export default ForestCard;
