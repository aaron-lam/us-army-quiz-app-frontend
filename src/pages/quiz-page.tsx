import * as React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button, ButtonProps, Form, Header, Loader, Message, Radio,
} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  MESSAGE_ANSWER_CORRECT,
  MESSAGE_ANSWER_WRONG,
  BUTTON_END_QUIZ_TEXT,
  BUTTON_NEXT_TEXT,
  BUTTON_SKIP_TEXT,
  BUTTON_SUBMIT_TEXT,
  TOAST_SKIP_QUESTION,
  LEVEL_LABEL,
  SCORE_LABEL,
  TOAST_CONFIG_NO_AUTO_CLOSE,
  RADIO_CORRECT_COLOR,
  RADIO_WRONG_COLOR,
  QUESTION,
  BUTTON_END_QUIZ_COLOR,
  BUTTON_WIDTH_DEFAULT,
  FONT_SIZE_MEDIUM,
  PRIMARY_COLOR,
  MINIMUM_QUESTION_CAPACITY,
  API_URL,
  LOCAL_STORAGE_UNIT_ID_KEY,
  NUM_OF_QUESTIONS_TO_FETCH,
  LOADER_SIZE,
  API_URL_PATH_QUESTIONS,
  FETCH_QUESTIONS_ERROR_MESSAGE, MARGIN_DEFAULT,
} from '../contants';
import CongratsPage from './congrats-page';

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
  height: 70vh;
`;

const QuizContainer = styled.div`
  flex: 3;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
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

type QuestionInfo = {
  question: string,
  choices: string[],
  correctChoiceIndex: number
}

const QuizPage: React.FC = (): ReactElement => {
  const [hasFetchError, setHasFetchError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [score, setScore] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(1);
  const [indexOfSelectedRadio, setIndexOfSelectedRadio] = useState<number>(-1);
  const [hasChooseAnswer, setHasChooseAnswer] = useState<boolean>(false);
  const [hasSubmitAnswer, setHasSubmitAnswer] = useState<boolean>(false);
  const [requestData, setRequestData] = useState<QuestionInfo[]>([]);
  const [isQuizEnd, setIsQuizEnd] = useState<boolean>(false);

  const { armyUnitsQuizType }: { armyUnitsQuizType: string } = useParams();

  const questionsFetchURL = `${API_URL}${API_URL_PATH_QUESTIONS}?${new URLSearchParams({
    unitId: localStorage.getItem(LOCAL_STORAGE_UNIT_ID_KEY) || '1',
    questionType: armyUnitsQuizType,
    questionCounts: NUM_OF_QUESTIONS_TO_FETCH.toString(),
  })}`;

  const fetchQuestions = () => {
    fetch(questionsFetchURL)
      .then((response) => response.json())
      .then((data) => {
        setRequestData(requestData.concat(data));
        setIsLoading(false);
      })
      .catch(() => setHasFetchError(true));
  };

  useEffect(() => fetchQuestions(), []);

  const getCurrentQuestion = () => requestData[requestData.length - 1];

  const isCorrectAnswer = (indexOfRadio: number) => indexOfRadio === getCurrentQuestion().correctChoiceIndex;

  const getRadioResultColor = (index: number) => (isCorrectAnswer(index) ? RADIO_CORRECT_COLOR : RADIO_WRONG_COLOR);

  const incrementQuestion = () => {
    setQuestionNumber(questionNumber + 1);
    requestData.pop();
    if (requestData.length <= MINIMUM_QUESTION_CAPACITY) {
      fetchQuestions();
    }
  };

  const goToNextQuestion = () => {
    setIndexOfSelectedRadio(-1);
    setHasChooseAnswer(false);
    setHasSubmitAnswer(false);
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
      toast.warn(TOAST_SKIP_QUESTION, TOAST_CONFIG_NO_AUTO_CLOSE);
      goToNextQuestion();
    }
  };

  const onClickEndQuiz = () => {
    setIsQuizEnd(true);
  };

  const onClickSubmit = () => {
    if (hasSubmitAnswer) {
      goToNextQuestion();
    } else if (hasChooseAnswer) {
      setScore(score + (isCorrectAnswer(indexOfSelectedRadio) ? 1 : -1));
      setHasSubmitAnswer(true);
    }
  };

  if (hasFetchError) {
    return (
      <Message negative>
        <Message.Header>{FETCH_QUESTIONS_ERROR_MESSAGE}</Message.Header>
      </Message>
    );
  }
  if (isQuizEnd) {
    return (
      <CongratsPage score={score} />
    );
  }
  return (
    <div>
      {/* Quiz Header */}
      <HeaderContainer>
        <div>{`${LEVEL_LABEL} ${armyUnitsQuizType}`}</div>
        <div>{`${SCORE_LABEL} ${score}`}</div>
      </HeaderContainer>
      <FlexContainer>
        {(isLoading) ? (
          <LoaderContainer>
            <Loader style={{ height: '30%' }} size={LOADER_SIZE} active centered />
          </LoaderContainer>
        )
          : (
            <QuizContainer>
              {/* Quiz Question */}
              <Header>{`${QUESTION} ${questionNumber}: ${getCurrentQuestion().question}`}</Header>
              <Header
                style={{ textAlign: 'center', visibility: hasSubmitAnswer ? 'visible' : 'hidden' }}
              >
                {`${isCorrectAnswer(indexOfSelectedRadio) ? MESSAGE_ANSWER_CORRECT : MESSAGE_ANSWER_WRONG}`}
              </Header>
              {/* Quiz Multiple Choice */}
              <Form>
                {getCurrentQuestion().choices.map((choice, index) => (
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
          )}
        {/* Quiz Buttons */}
        <FooterContainer>
          <ButtonsContainer>
            <MediumButton
              color={PRIMARY_COLOR}
              disabled={hasSubmitAnswer}
              onClick={onClickSkip}
            >
              {BUTTON_SKIP_TEXT}
            </MediumButton>
            <MediumButton
              color={PRIMARY_COLOR}
              disabled={!hasChooseAnswer}
              onClick={onClickSubmit}
            >
              {hasSubmitAnswer ? BUTTON_NEXT_TEXT : BUTTON_SUBMIT_TEXT}
            </MediumButton>
          </ButtonsContainer>
          <Button onClick={onClickEndQuiz} basic color={BUTTON_END_QUIZ_COLOR}>
            {BUTTON_END_QUIZ_TEXT}
          </Button>
          {/* Give some margins to footer */}
          <div style={{ margin: MARGIN_DEFAULT }} />
        </FooterContainer>
      </FlexContainer>
    </div>
  );
};

export default QuizPage;
