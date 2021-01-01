import React, { ReactElement } from 'react';
import { Card } from 'semantic-ui-react';
import QuizSelectionCard from '../components/quiz-selection-card';
import { BATTALION, BRIGADE } from '../contants';

const QuizSelectionsPage: React.FC = (): ReactElement => (
  <Card.Group>
    <QuizSelectionCard level={1} armyUnitQuizType={BATTALION} />
    <QuizSelectionCard level={2} armyUnitQuizType={BRIGADE} />
  </Card.Group>
);

export default QuizSelectionsPage;
