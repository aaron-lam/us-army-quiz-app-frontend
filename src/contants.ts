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
export const FONT_SIZE_MEDIUM = 18;

/**
 * App Header
 */
export const APP_HEADER = 'U.S. Army Units Quiz';
export const ARMY_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/'
  + 'Logo_of_the_United_States_Army.svg/359px-Logo_of_the_United_States_Army.svg.png';

/**
 * Quiz Page
 */
export const LEVEL = 'Level';
export const SCORE = 'Score:';
export const QUESTION = 'Question';
export const RADIO_CORRECT_COLOR = 'green';
export const RADIO_WRONG_COLOR = 'red';
export const BUTTON_ENABLE_CLASS_NAME = 'primary';
export const BUTTON_DISABLE_CLASS_NAME = 'basic';
export const BUTTON_SKIP_TEXT = 'Skip';
export const BUTTON_SUBMIT_TEXT = 'Submit';
export const BUTTON_NEXT_TEXT = 'Next';
export const BUTTON_END_QUIZ_TEXT = 'End Quiz';
export const BUTTON_END_QUIZ_COLOR = 'grey';
export const MESSAGE_ANSWER_CORRECT = 'Awesome! Score +1';
export const MESSAGE_ANSWER_WRONG = 'That\'s incorrect.. Score -1';
export const TOAST_SKIP_QUESTION = 'Skipped the question. Score -1';
export const FOOTER_MARGIN = 12;
