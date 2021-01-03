import React, {
  ReactElement,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { BUTTON_DEFAULT_COLOR, PATH_QUIZ } from '../contants';

type CongratsPageProps = {
    score: number
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const CongratsPage: React.FC<CongratsPageProps> = ({ score }): ReactElement => (
  <FlexContainer>
    <div>
      <h2>Congrats! you finished the quiz</h2>
      <h2>Here is your score: </h2>
      <h2>{` ${score}`}</h2>
      <Icon name="check circle" size="massive" color="green" />
      <Button
        onClick={() => window.location.reload()}
        className={BUTTON_DEFAULT_COLOR}
      >
        Retake quiz
      </Button>
      <Button
        as={Link}
        to={PATH_QUIZ}
        className={BUTTON_DEFAULT_COLOR}
      >
        Home page
      </Button>
    </div>

  </FlexContainer>
);

CongratsPage.propTypes = {
  score: PropTypes.number.isRequired,
};
export default CongratsPage;
