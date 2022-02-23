import React from 'react';
import styled from 'styled-components';

const ForestCard = React.forwardRef(({ dataObj }, ref) => {
  const { fcNm: name, fcAddr: address, ref1: phoneNumber } = dataObj;
  return (
    <Card ref={ref}>
      <h3>{name}</h3>
      <div>📍 {address}</div>
      <div>📞 {phoneNumber}</div>
    </Card>
  );
});

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
