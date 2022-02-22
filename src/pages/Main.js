import React, { useState } from 'react';
import styled from 'styled-components';

import {
  CompleteRemovedMsg,
  CompleteSavedMsg,
  MemoRequestMsg,
} from '../components/Feedback';

export default function Main() {
  const [showFeedbackMemo, setShowFeedbackMemo] = useState(false);
  const [showFeedbackSave, setShowFeedbackSave] = useState(false);
  const [showFeedbackRemove, setShowFeedbackRemove] = useState(false);

  const FeedbackHandler = (setter) => {
    setter(true);
    setTimeout(() => {
      setter(false);
    }, 1000);
  };

  return (
    <div>
      <ButtonStyle onClick={() => FeedbackHandler(setShowFeedbackMemo)}>
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
      {showFeedbackRemove && <CompleteRemovedMsg />}
    </div>
  );
}

const ButtonStyle = styled.button`
  border: 1px solid black;
  padding: 20px;
  :hover {
    color: red;
  }
  :active {
    opacity: 0.6;
  }
`;
