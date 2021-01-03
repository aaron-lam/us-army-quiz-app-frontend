import React, { ReactElement } from 'react';
import { Card } from 'semantic-ui-react';
import QuizSelectionCard from '../components/quiz-selection-card';
import {
  BATTALION,
  BRIGADE,
  DIVISION,
  PLACEHOLDER_LEVEL,
} from '../contants';
import { getUserLevel, unitTypeToLevel } from '../utils/units';

const unitHierarchies = [BATTALION, BRIGADE, DIVISION];

const QuizSelectionsPage: React.FC = (): ReactElement => (
  <Card.Group>
    {
      getUserLevel() === PLACEHOLDER_LEVEL
        ? ([])
        : (unitHierarchies
          .filter((unit) => getUserLevel() <= unitTypeToLevel(unit))
          .map((unit) => (<QuizSelectionCard key={unit} armyUnitQuizType={unit} />)))
    }
  </Card.Group>
);

export default QuizSelectionsPage;
