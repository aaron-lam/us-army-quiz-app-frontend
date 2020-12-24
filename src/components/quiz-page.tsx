import * as React from 'react';
import { ReactElement, useState } from 'react';
import {
  Button, Container, Form, Header, Radio,
} from 'semantic-ui-react';
import { toast, ToastOptions } from 'react-toastify';

const styles = {
  containerFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100vh',
  },
  containerHeader: {
    flex: '1',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    fontSize: '1.17em',
  },
  containerQuiz: {
    flex: '8',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  containerFooter: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    flex: '2',
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
  button: {
    width: 100,
  },
};

const QuizPage: React.FC = (): ReactElement => {
  const props = {
    level: 1,
  };

  const requestData = {
    question: 'Which company belongs to 31st Engineer Battalion?',
    choices: ['Smoking Aces', 'Dawgs', 'Cobras', 'Easy Company'],
    indexOfCorrectAnswer: 2,
  };

  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [indexOfSelectedRadio, setIndexOfSelectedRadio] = useState(-1);
  const [hasChooseAnswer, setHasChooseAnswer] = useState(false);
  const [hasSubmitAnswer, setHasSubmitAnswer] = useState(false);

  const isCorrectAnswer = (index: number) => index === requestData.indexOfCorrectAnswer;

  const getRadioResultColor = (index: number) => (isCorrectAnswer(index) ? 'green' : 'red');

  const onClickRadio = (event: any, { index }: any) => {
    if (!hasSubmitAnswer) {
      setIndexOfSelectedRadio(index);
      setHasChooseAnswer(true);
    }
  };

  const goToNextQuestion = () => {
    setIndexOfSelectedRadio(-1);
    setHasChooseAnswer(false);
    setHasSubmitAnswer(false);
    setQuestionNumber(questionNumber + 1);
  };

  const toastConfig: ToastOptions = {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  };

  const onClickSkip = () => {
    if (!hasSubmitAnswer) {
      setScore(score - 1);
      toast.warn('Skipped the question. Score -1', toastConfig);
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

  const { level } = props;

  return (
    <Container>
      <div style={styles.containerFlex as React.CSSProperties}>
        <div style={styles.containerHeader}>
          <div>{`Level ${level}`}</div>
          <div>{`Score: ${score}`}</div>
        </div>
        <div style={styles.containerQuiz as React.CSSProperties}>
          <Header as="h3">{`Question ${questionNumber}: ${requestData.question}`}</Header>
          <Header as="h3" style={{ textAlign: 'center', visibility: hasSubmitAnswer ? 'visible' : 'hidden' }}>
            {`${isCorrectAnswer(indexOfSelectedRadio) ? 'Awesome!' : 'Oops. That\'s incorrect!'}`}
          </Header>
          <Form>
            {requestData.choices.map((choice, index) => (
              <Form.Field key={index}>
                <Button
                  style={styles.radio}
                  index={index}
                  className={`basic ${hasSubmitAnswer ? getRadioResultColor(index) : ''}`}
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
        <div style={styles.containerFooter as React.CSSProperties}>
          <div style={styles.containerButtons}>
            <Button secondary style={styles.button}>Previous</Button>
            <Button basic style={styles.button} onClick={onClickSkip}>
              Skip
            </Button>
            <Button
              style={styles.button}
              className={(hasChooseAnswer ? 'primary' : 'basic')}
              onClick={onClickSubmit}
            >
              {hasSubmitAnswer ? 'Next' : 'Submit'}
            </Button>
          </div>
          <Button style={{ margin: '0 0 20px' }} color="green">End the Quiz</Button>
        </div>
      </div>
    </Container>
  );
};

export default QuizPage;
