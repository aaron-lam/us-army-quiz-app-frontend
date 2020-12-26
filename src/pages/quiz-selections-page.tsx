import React, { ReactElement } from 'react';
import { Card } from 'semantic-ui-react';
import QuizSelectionCard from '../components/quiz-selection-card';

const QuizSelectionsPage: React.FC = (): ReactElement => (
  <Card.Group>
    <QuizSelectionCard level={1} armyUnitQuizType="battalion" />
    <QuizSelectionCard level={2} armyUnitQuizType="brigade" />
  </Card.Group>
);

export default QuizSelectionsPage;
