import React, { ReactElement } from 'react';
import {
  Button, Container, Header,
} from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  BATTALION,
  BUTTON_DEFAULT_COLOR,
  FONT_SIZE_MEDIUM,
  LEVEL_LABEL,
  MARGIN_BETWEEN_PARAGRAPH,
  PATH_QUIZ,
  QUIZ_INSTRUCTION_PARAGRAPH_ONE,
  QUIZ_INSTRUCTION_PARAGRAPH_THREE,
  QUIZ_INSTRUCTION_PARAGRAPH_TWO,
} from '../contants';

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

const Paragraph = styled.p`
  font-size: ${FONT_SIZE_MEDIUM};
  margin: ${MARGIN_BETWEEN_PARAGRAPH}px 0 ${MARGIN_BETWEEN_PARAGRAPH}px;
`;

const QuizInstructionPage: React.FC = (): ReactElement => {
  const { armyUnitsQuizType }: { armyUnitsQuizType: string } = useParams();

  return (
    <FlexContainer>
      <Container text>
        <Header as="h2">{`${LEVEL_LABEL} ${armyUnitsQuizType === BATTALION ? 1 : 2}`}</Header>
        <Paragraph>
          {`${QUIZ_INSTRUCTION_PARAGRAPH_ONE} ${armyUnitsQuizType}.`}
        </Paragraph>
        <Paragraph>
          {QUIZ_INSTRUCTION_PARAGRAPH_TWO}
        </Paragraph>
        <Paragraph>
          {QUIZ_INSTRUCTION_PARAGRAPH_THREE}
        </Paragraph>
        <ButtonContainer>
          <Button
            as={Link}
            to={`${PATH_QUIZ}/${armyUnitsQuizType}`}
            className={BUTTON_DEFAULT_COLOR}
          >
            Start
          </Button>
        </ButtonContainer>
      </Container>
    </FlexContainer>
  );
};

export default QuizInstructionPage;
