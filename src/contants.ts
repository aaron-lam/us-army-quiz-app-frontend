import { ToastOptions } from 'react-toastify';

export const TOAST_CONFIG_DEFAULT: ToastOptions = {
  position: 'bottom-center',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
};

export const TOAST_CONFIG_LONG_WAIT: ToastOptions = { ...TOAST_CONFIG_DEFAULT, autoClose: 5000 };

/**
 * Global
 */
export const BUTTON_WIDTH_DEFAULT = 100;
export const BUTTON_WIDTH_LARGE = 200;
export const MARGIN_DEFAULT = 12;
export const FONT_SIZE_MEDIUM = 20;
export const FONT_SIZE_LARGE = 24;
export const PRIMARY_COLOR = 'green';
export const PATH_ROOT = '/';
export const PATH_QUIZ = '/quiz';
export const PATH_PARAM_QUIZ_TYPE = '/:armyUnitsQuizType';
export const PATH_INSTRUCTIONS = '/instructions';
export const PATH_PROFILE = '/profile';
export const PATH_QUESTION_BUILDER = '/questionbuilder';
export const PATH_DIVISION = '/division';
export const PATH_USER_INFO = '/userinfo';
export const PATH_DELETE_UNIT = '/delete';
export const API_URL = 'https://umts.live';
export const API_URL_PATH_UNITS = '/units';
export const API_URL_PATH_QUESTIONS = '/questions';
export const LOCAL_STORAGE_LAST_NAME_KEY = 'lastName';
export const LOCAL_STORAGE_UNIT_ID_KEY = 'unitId';
export const LOCAL_STORAGE_UNIT_KEY = 'unit';
export const LOCAL_STORAGE_UNIT_TYPE_KEY = 'unitType';
export const BUTTON_PRIMARY_COLOR = 'primary';
export const BUTTON_SECONDARY_COLOR = 'secondary';
export const LOADER_SIZE = 'massive';
export const COMPANY = 'company';
export const BATTALION = 'battalion';
export const BRIGADE = 'brigade';
export const DIVISION = 'division';
export const ERROR_MESSAGE_INVALID_ROUTE = 'The URL you entered is invalid.';
export const ERROR_MESSAGE_SERVICE_UNAVAILABLE = 'The service is currently unavailable.';
export const ERROR_MESSAGE_PLEASE_TRY_AGAIN = 'Please refresh the page and try again.';
export const ERROR_MESSAGE_RESPONSE_NOT_SUCCESS = 'Response not success.';

/**
 * Side Menu
 */
export const SIDE_MENU_PROFILE_TITLE = 'Profile';
export const SIDE_MENU_QUIZ_TITLE = 'Quiz';
export const SIDE_MENU_QUESTION_BUILDER = 'Question Builder';
export const SIDE_MENU_SIGN_OUT = 'Sign Out';
export const ICON_NAME_PROFILE = 'user circle';
export const ICON_NAME_QUIZ = 'question circle outline';
export const ICON_NAME_QUESTION_BUILDER = 'newspaper outline';
export const ICON_NAME_SIGN_OUT = 'sign out';

/**
 * App Header
 */
export const APP_HEADER = 'U.S. Army Units Quiz';
export const APP_LOGO_HEIGHT = 48;
export const APP_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/'
  + 'Logo_of_the_United_States_Army.svg/359px-Logo_of_the_United_States_Army.svg.png';
export const ICON_NAME_SIDEBAR = 'sidebar';

/**
 * User Info Form
 */
export const USER_FORM_DESCRIPTION = 'Welcome! Before playing the quiz, please fill out the form below:';
export const PLACEHOLDER_LAST_NAME = 'Please enter your Last Name';
export const PLACEHOLDER_DROP_DOWN = 'Please enter your unit: ';
export const LAST_NAME_INVALID_MESSAGE = 'Last Name can only contains alphabets.';
export const FETCH_DROPDOWN_DATA_ERROR_MESSAGE = `Some errors occurred while loading the dropdown list. 
  ${ERROR_MESSAGE_PLEASE_TRY_AGAIN}`;
export const USER_FORM_BUTTON_TEXT_SUBMIT = 'Submit';

/**
 * Quiz Selections Page
 */
export const QUIZ_SELECTIONS_CARD_DESCRIPTION = 'Guess which company belongs to the battalion under your';
export const PLACEHOLDER_LEVEL = -1;

/**
 * Quiz Instructions Page
 */
export const QUIZ_INSTRUCTION_PARAGRAPH_ONE = 'You get 1 point when you answer a question correctly. '
  + 'If you skip a question or answer a question incorrectly, 1 point will be reduced. '
  + 'You can continue to play until you feel done.  You can press “End Quiz” anytime, and your score will be shown.';
export const QUIZ_INSTRUCTION_PARAGRAPH_TWO = 'Press the “Start” button to begin now!';
export const MARGIN_BETWEEN_PARAGRAPH = 28;

/**
 * Quiz Page
 */
export const LEVEL_LABEL = 'Level:';
export const SCORE_LABEL = 'Score:';
export const QUESTION = 'Question';
export const NUM_OF_QUESTIONS_TO_FETCH = 20;
export const MINIMUM_QUESTION_CAPACITY = 5;
export const RADIO_CORRECT_COLOR = 'green';
export const RADIO_WRONG_COLOR = 'red';
export const BUTTON_SKIP_TEXT = 'Skip';
export const BUTTON_SUBMIT_TEXT = 'Submit';
export const BUTTON_NEXT_TEXT = 'Next';
export const BUTTON_END_QUIZ_TEXT = 'End the Quiz. View Score Report Now!';
export const BUTTON_END_QUIZ_COLOR = 'grey';
export const MESSAGE_ANSWER_CORRECT = 'Awesome! Score +1';
export const MESSAGE_ANSWER_WRONG = 'That\'s incorrect.. Score -1';
export const TOAST_SKIP_QUESTION = 'Skipped the question. Score -1';
export const FETCH_QUESTIONS_ERROR_MESSAGE = `Some errors occurred while loading the questions. 
  ${ERROR_MESSAGE_PLEASE_TRY_AGAIN}`;

/**
 * Congrats Page
 */
export const SCORE_SUMMARY_LABEL = 'Here is your score:';
export const ICON_NAME_CHECK = 'check circle';
export const CONGRATS_PAGE_ICON_SIZE = 'massive';
export const BUTTON_TEXT_RETAKE_QUIZ = 'Retake Quiz';
export const BUTTON_TEXT_HOME = 'Home';

/**
 * Profile Page
 */
export const PROFILE_HEADER_SIZE = 'large';
export const PROFILE_TITLE = 'Profile';
export const LAST_NAME_LABEL = 'Last Name:';
export const UNIT_LABEL = 'Unit:';

/**
 * Question Builder Page
 */
export const NOT_AUTHORIZED_MESSAGE = 'You don\'t have permission to access this page.';
export const DELETE_UNIT_TITLE = 'Confirm to Delete';
export const DELETE_UNIT_CONFIRM_MESSAGE = 'Are you sure you want to delete this unit? '
  + 'All the units below it will also be removed';
export const DELETE_UNIT_BUTTON_DELETE = 'Delete';
export const DELETE_UNIT_BUTTON_CANCEL = 'Cancel';
export const BUTTON_TEXT_VIEW_MODE = 'View Mode';
export const BUTTON_TEXT_EDIT_MODE = 'Edit Mode';
export const BUTTON_TEXT_ADD_UNIT = 'Add New Unit';
export const BUTTON_TEXT_DELETE = 'Delete';
export const BUTTON_TEXT_SAVE = 'Save';
export const BUTTON_TEXT_EDIT = 'Edit';
export const BUTTON_TEXT_CANCEL = 'Cancel';
export const PLACEHOLDER_ID = -1;
export const NAVIGATION_PATH_SEPARATOR = ' > ';
export const FETCH_UNITS_ERROR_MESSAGE = 'Some errors occurred while loading the units. It might be:';
export const TOAST_ERROR_MESSAGE_CREATE_UNIT = 'Failed to create the unit. Please try again.';
export const TOAST_ERROR_MESSAGE_UPDATE_UNIT = 'Failed to update the unit name. Please try again.';
export const TOAST_ERROR_MESSAGE_DELETE_UNIT = 'Failed to delete the unit. Please try again.';
export const TOAST_ERROR_MESSAGE_EMPTY_UNIT_NAME = 'Unit name cannot be empty.';
export const TOAST_ERROR_MESSAGE_UNIT_NAME_TOO_LONG = 'Unit name contains too many characters. (>= 255 characters)';

/**
 * Error Page
 */
export const ERROR_MESSAGE_CHECK_LINK = 'Please check your link and retry again.';
