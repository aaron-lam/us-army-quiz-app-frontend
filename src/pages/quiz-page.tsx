import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button, ButtonProps, Form, Header, Radio,
} from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  MESSAGE_ANSWER_CORRECT,
  MESSAGE_ANSWER_WRONG,
  BUTTON_END_QUIZ_TEXT,
  BUTTON_NEXT_TEXT,
  BUTTON_SKIP_TEXT,
  BUTTON_SUBMIT_TEXT,
  TOAST_SKIP_QUESTION,
  LEVEL,
  SCORE,
  toastConfig,
  BUTTON_DISABLE_CLASS_NAME,
  BUTTON_ENABLE_CLASS_NAME,
  RADIO_CORRECT_COLOR,
  RADIO_WRONG_COLOR,
  QUESTION,
  BUTTON_END_QUIZ_COLOR,
  FOOTER_MARGIN,
  BUTTON_WIDTH_DEFAULT,
  FONT_SIZE_MEDIUM,
  PATH_QUIZ, API_URL, MOCK_DATA_QUESTIONS,
} from '../contants';

const HeaderContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-size: ${FONT_SIZE_MEDIUM}px;
  font-weight: bold;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 80vh;
`;

const QuizContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const FooterContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const MediumButton = styled(Button)({
  width: BUTTON_WIDTH_DEFAULT,
});

const QuizPage: React.FC = (): ReactElement => {
  /**
   * Normally this should be passed from props. This will be removed once we connected with other components..
   */
  const props = {
    levelOfDifficulty: 1,
  };

  // /**
  //  * This mock data will be removed once the API endpoint is built.
  //  */
  // const requestData = {
  //   question: 'Which company belongs to 31st Engineer Battalion?',
  //   choices: ['Smoking Aces', 'Dawgs', 'Cobras', 'Easy Company'],
  //   correctChoiceIndex: 2,
  // };

  const requestData: any[] = MOCK_DATA_QUESTIONS;

  useEffect(() => {
    requestData.concat(MOCK_DATA_QUESTIONS);
  }, []);

  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [indexOfSelectedRadio, setIndexOfSelectedRadio] = useState(-1);
  const [hasChooseAnswer, setHasChooseAnswer] = useState(false);
  const [hasSubmitAnswer, setHasSubmitAnswer] = useState(false);

  const getCurrentQuestion = () => requestData[requestData.length - 1];

  const isCorrectAnswer = (indexOfRadio: number) => indexOfRadio
    === getCurrentQuestion().correctChoiceIndex;

  const getRadioResultColor = (index: number) => (isCorrectAnswer(index) ? RADIO_CORRECT_COLOR : RADIO_WRONG_COLOR);

  const incrementQuestion = () => {
    if (requestData.length <= 5) {
      requestData.concat(MOCK_DATA_QUESTIONS);
    }
  };

  const goToNextQuestion = () => {
    setIndexOfSelectedRadio(-1);
    setHasChooseAnswer(false);
    setHasSubmitAnswer(false);
    setQuestionNumber(questionNumber + 1);
    incrementQuestion();
  };

  const onClickRadio = (event: React.MouseEvent, { index }: ButtonProps) => {
    if (!hasSubmitAnswer) {
      setIndexOfSelectedRadio(index);
      setHasChooseAnswer(true);
    }
  };

  const onClickSkip = () => {
    if (!hasSubmitAnswer) {
      setScore(score - 1);
      toast.warn(TOAST_SKIP_QUESTION, toastConfig);
      goToNextQuestion();
    }
  };

  const onClickSubmit = () => {
    if (hasSubmitAnswer) {
      goToNextQuestion();
    } else if (hasChooseAnswer) {
      setScore(score + (isCorrectAnswer(indexOfSelectedRadio) ? 1 : -1));
      setHasSubmitAnswer(true);
    }
  };

  const { levelOfDifficulty } = props;

  return (
    <div>
      {/* Quiz Header */}
      <HeaderContainer>
        <div>{`${LEVEL} ${levelOfDifficulty}`}</div>
        <div>{`${SCORE} ${score}`}</div>
      </HeaderContainer>
      <FlexContainer>
        <QuizContainer>
          {/* Quiz Question */}
          <Header>{`${QUESTION} ${questionNumber}: ${getCurrentQuestion().question}`}</Header>
          <Header style={{ textAlign: 'center', visibility: hasSubmitAnswer ? 'visible' : 'hidden' }}>
            {`${isCorrectAnswer(indexOfSelectedRadio) ? MESSAGE_ANSWER_CORRECT : MESSAGE_ANSWER_WRONG}`}
          </Header>
          {/* Quiz Multiple Choice */}
          <Form>
            {getCurrentQuestion().choices.map((choice: any, index: any) => (
              <Form.Field key={index}>
                <Button
                  style={{ textAlign: 'left', width: '100%' }}
                  index={index}
                  className={`${hasSubmitAnswer ? getRadioResultColor(index) : ''}`}
                  onClick={onClickRadio}
                >
                  <Radio
                    label={choice}
                    checked={indexOfSelectedRadio === index}
                  />
                </Button>
              </Form.Field>
            ))}
          </Form>
        </QuizContainer>
        {/* Quiz Buttons */}
        <FooterContainer>
          <ButtonsContainer>
            <MediumButton
              className={(hasSubmitAnswer ? BUTTON_DISABLE_CLASS_NAME : BUTTON_ENABLE_CLASS_NAME)}
              onClick={onClickSkip}
            >
              {BUTTON_SKIP_TEXT}
            </MediumButton>
            <MediumButton
              className={(hasChooseAnswer ? BUTTON_ENABLE_CLASS_NAME : BUTTON_DISABLE_CLASS_NAME)}
              onClick={onClickSubmit}
            >
              {hasSubmitAnswer ? BUTTON_NEXT_TEXT : BUTTON_SUBMIT_TEXT}
            </MediumButton>
          </ButtonsContainer>
          {/* TODO: Should navigate to user statistic page instead of quiz selections page. */}
          <Button as={Link} to={PATH_QUIZ} basic color={BUTTON_END_QUIZ_COLOR}>
            {BUTTON_END_QUIZ_TEXT}
          </Button>
          {/* Give some margins to footer */}
          <div style={{ margin: FOOTER_MARGIN }} />
        </FooterContainer>
      </FlexContainer>
    </div>
  );
};

export default QuizPage;
