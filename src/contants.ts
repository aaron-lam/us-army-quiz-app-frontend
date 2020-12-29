import { ToastOptions } from 'react-toastify';

export const toastConfig: ToastOptions = {
  position: 'bottom-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};

/**
 * Global
 */
export const BUTTON_WIDTH_DEFAULT = 100;
export const FONT_SIZE_MEDIUM = 20;
export const FONT_SIZE_LARGE = 24;
export const PRIMARY_COLOR = 'green';
export const PATH_QUIZ = '/quiz/';
export const PATH_INSTRUCTIONS = '/instructions/';
export const API_URL = 'https://5663fc6c72ae.ngrok.io';
export const API_URL_PATH_UNITS = '/units/';
export const LOCAL_STORAGE_LAST_NAME_KEY = 'lastName';
export const LOCAL_STORAGE_UNIT_ID_KEY = 'unitId';
export const LOCAL_STORAGE_UNIT_KEY = 'unit';

/**
 * App Header
 */
export const APP_HEADER = 'U.S. Army Units Quiz';
export const ARMY_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/'
  + 'Logo_of_the_United_States_Army.svg/359px-Logo_of_the_United_States_Army.svg.png';

/**
 * Quiz User Info Form
 */
export const USER_FORM_DESCRIPTION = 'Welcome! Before playing the quiz, please fill out the form below:';
export const PLACEHOLDER_LAST_NAME = 'Please enter your Last Name';
export const PLACEHOLDER_DROP_DOWN = 'Please enter your unit: ';

/**
 * Quiz Selections Page
 */
export const QUIZ_SELECTIONS_CARD_DESCRIPTION = 'Guess which company belongs to the corresponding';

/**
 * Quiz Instructions Page
 */
export const QUIZ_INSTRUCTION_PARAGRAPH_ONE = 'There is unlimited question in total. '
  + 'Your goal is to get as much score as possible. '
  + 'You need to guess which company belongs to the corresponding';
export const QUIZ_INSTRUCTION_PARAGRAPH_TWO = 'You get 1 point when you answer a question correctly. '
  + 'If you skip a question or answer a question incorrectly, 1 point will be deducted. '
  + 'There are unlimited question in the quiz. '
  + 'Feel free to press “End Quiz” to finish the quiz when you finished.';
export const QUIZ_INSTRUCTION_PARAGRAPH_THREE = 'Press the “Start” button to begin now!';
export const MARGIN_BETWEEN_PARAGRAPH = 28;

/**
 * Quiz Page
 */
export const LEVEL = 'Level';
export const SCORE = 'Score:';
export const QUESTION = 'Question';
export const NUM_OF_QUESTIONS_TO_FETCH = 20;
export const MINIMUM_QUESTION_CAPACITY = 5;
export const RADIO_CORRECT_COLOR = 'green';
export const RADIO_WRONG_COLOR = 'red';
export const BUTTON_ENABLE_CLASS_NAME = 'primary';
export const BUTTON_DISABLE_CLASS_NAME = 'basic';
export const BUTTON_SKIP_TEXT = 'Skip';
export const BUTTON_SUBMIT_TEXT = 'Submit';
export const BUTTON_NEXT_TEXT = 'Next';
export const BUTTON_END_QUIZ_TEXT = 'End the Quiz. View Score Report Now!';
export const BUTTON_END_QUIZ_COLOR = 'grey';
export const MESSAGE_ANSWER_CORRECT = 'Awesome! Score +1';
export const MESSAGE_ANSWER_WRONG = 'That\'s incorrect.. Score -1';
export const TOAST_SKIP_QUESTION = 'Skipped the question. Score -1';
export const FOOTER_MARGIN = 12;
