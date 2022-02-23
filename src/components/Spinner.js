import { memo } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Loader = () => {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="#85F9CF" />
    </LoaderWrap>
  );
};

export default memo(Loader);

const LoaderWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;
