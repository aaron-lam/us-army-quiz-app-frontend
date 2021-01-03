import React, {
  ReactElement,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
  BUTTON_PRIMARY_COLOR,
  BUTTON_SECONDARY_COLOR, BUTTON_TEXT_HOME, BUTTON_TEXT_RETAKE_QUIZ,
  BUTTON_WIDTH_LARGE, CONGRATS_PAGE_ICON_SIZE, ICON_NAME_CHECK,
  MARGIN_DEFAULT,
  PATH_QUIZ, PRIMARY_COLOR, SCORE_SUMMARY_LABEL,
} from '../contants';

type CongratsPageProps = {
  score: number
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CongratsPage: React.FC<CongratsPageProps> = ({ score }): ReactElement => (
  <FlexContainer>
    <h2>Congrats! You finished the quiz.</h2>
    <h2>{`${SCORE_SUMMARY_LABEL} ${score}`}</h2>
    <Icon
      style={{ margin: MARGIN_DEFAULT }}
      name={ICON_NAME_CHECK}
      color={PRIMARY_COLOR}
      size={CONGRATS_PAGE_ICON_SIZE}
    />
    <Button
      style={{ margin: MARGIN_DEFAULT, width: BUTTON_WIDTH_LARGE }}
      onClick={() => window.location.reload()}
      className={BUTTON_PRIMARY_COLOR}
    >
      {BUTTON_TEXT_RETAKE_QUIZ}
    </Button>
    <Button
      style={{ margin: MARGIN_DEFAULT, width: BUTTON_WIDTH_LARGE }}
      as={Link}
      to={PATH_QUIZ}
      className={BUTTON_SECONDARY_COLOR}
    >
      {BUTTON_TEXT_HOME}
    </Button>
  </FlexContainer>
);

CongratsPage.propTypes = {
  score: PropTypes.number.isRequired,
};

export default CongratsPage;
