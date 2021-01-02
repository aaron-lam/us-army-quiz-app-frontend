import { Card } from 'semantic-ui-react';
import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  FONT_SIZE_LARGE,
  FONT_SIZE_MEDIUM,
  LEVEL_LABEL, PATH_INSTRUCTIONS, PATH_QUIZ, PRIMARY_COLOR, QUIZ_SELECTIONS_CARD_DESCRIPTION,
} from '../contants';

type QuizSelectionCardProps = {
  armyUnitQuizType: string
}

const QuizSelectionCard: React.FC<QuizSelectionCardProps> = ({ armyUnitQuizType }): ReactElement => (
  <Card as={Link} to={`${PATH_QUIZ}/${armyUnitQuizType}${PATH_INSTRUCTIONS}`} fluid color={PRIMARY_COLOR}>
    <Card.Content>
      <Card.Header style={{ fontSize: FONT_SIZE_LARGE }}>
        {`${LEVEL_LABEL} ${armyUnitQuizType}`}
      </Card.Header>
      <Card.Description style={{ fontSize: FONT_SIZE_MEDIUM }}>
        {QUIZ_SELECTIONS_CARD_DESCRIPTION}
        <b>{` ${armyUnitQuizType}`}</b>
      </Card.Description>
    </Card.Content>
  </Card>
);

QuizSelectionCard.propTypes = {
  armyUnitQuizType: PropTypes.string.isRequired,
};

export default QuizSelectionCard;
