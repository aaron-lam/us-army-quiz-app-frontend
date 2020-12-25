import * as React from 'react';
import { ReactElement, useState } from 'react';
import { toast } from 'react-toastify';
import {
  Button, Container, Form, Header, Radio,
} from 'semantic-ui-react';
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
} from '../contants';

const styles = {
  containerFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '80vh',
  },
  containerHeader: {
    flex: '1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    fontSize: FONT_SIZE_MEDIUM,
    fontWeight: 'bold',
  },
  containerQuiz: {
    flex: '3',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  containerFooter: {
    flex: '1',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  containerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  radio: {
    textAlign: 'left',
    width: '100%',
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    width: BUTTON_WIDTH_DEFAULT,
  },
};

const QuizPage: React.FC = (): ReactElement => {
  /**
   * Normally this should be passed from props. This will be removed once we connected with other components..
   */
  const props = {
    levelOfDifficulty: 1,
  };

  /**
   * This mock data will be removed once the API endpoint is built.
   */
  const requestData = {
    question: 'Which company belongs to 31st Engineer Battalion?',
    choices: ['Smoking Aces', 'Dawgs', 'Cobras', 'Easy Company'],
    correctChoiceIndex: 2,
  };

  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [indexOfSelectedRadio, setIndexOfSelectedRadio] = useState(-1);
  const [hasChooseAnswer, setHasChooseAnswer] = useState(false);
  const [hasSubmitAnswer, setHasSubmitAnswer] = useState(false);

  const isCorrectAnswer = (indexOfRadio: number) => indexOfRadio === requestData.correctChoiceIndex;

  const getRadioResultColor = (index: number) => (isCorrectAnswer(index) ? RADIO_CORRECT_COLOR : RADIO_WRONG_COLOR);

  const goToNextQuestion = () => {
    setIndexOfSelectedRadio(-1);
    setHasChooseAnswer(false);
    setHasSubmitAnswer(false);
    setQuestionNumber(questionNumber + 1);
  };

  const onClickRadio = (event: any, { index }: any) => {
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
    <Container>
      {/* Quiz Header */}
      <div style={styles.containerHeader as React.CSSProperties}>
        <div>{`${LEVEL} ${levelOfDifficulty}`}</div>
        <div>{`${SCORE} ${score}`}</div>
      </div>
      <div style={styles.containerFlex as React.CSSProperties}>
        <div style={styles.containerQuiz as React.CSSProperties}>
          {/* Quiz Question */}
          <Header>{`${QUESTION} ${questionNumber}: ${requestData.question}`}</Header>
          <Header style={{ textAlign: 'center', visibility: hasSubmitAnswer ? 'visible' : 'hidden' }}>
            {`${isCorrectAnswer(indexOfSelectedRadio) ? MESSAGE_ANSWER_CORRECT : MESSAGE_ANSWER_WRONG}`}
          </Header>
          {/* Quiz Multiple Choice */}
          <Form>
            {requestData.choices.map((choice, index) => (
              <Form.Field key={index}>
                <Button
                  style={styles.radio}
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
        </div>
        {/* Quiz Buttons */}
        <div style={styles.containerFooter as React.CSSProperties}>
          <div style={styles.containerButtons}>
            <Button
              className={(hasSubmitAnswer ? BUTTON_DISABLE_CLASS_NAME : BUTTON_ENABLE_CLASS_NAME)}
              style={styles.button}
              onClick={onClickSkip}
            >
              {BUTTON_SKIP_TEXT}
            </Button>
            <Button
              style={styles.button}
              className={(hasChooseAnswer ? BUTTON_ENABLE_CLASS_NAME : BUTTON_DISABLE_CLASS_NAME)}
              onClick={onClickSubmit}
            >
              {hasSubmitAnswer ? BUTTON_NEXT_TEXT : BUTTON_SUBMIT_TEXT}
            </Button>
          </div>
          <Button basic color={BUTTON_END_QUIZ_COLOR}>{BUTTON_END_QUIZ_TEXT}</Button>
          {/* Give some margins to footer */}
          <div style={{ margin: FOOTER_MARGIN }} />
        </div>
      </div>
    </Container>
  );
};

export default QuizPage;
