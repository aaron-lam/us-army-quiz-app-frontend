import * as React from 'react';
import {
  ReactElement, useState,
} from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import { Container, Sidebar } from 'semantic-ui-react';
import QuizPage from './pages/quiz-page';
import AppHeader from './components/app-header';
import QuizSelectionsPage from './pages/quiz-selections-page';
import QuizInstructionPage from './pages/quiz-instructions-page';
import ProfilePage from './pages/profile-page';
import UserInfoForm from './pages/user-info-form';
import {
  LOCAL_STORAGE_LAST_NAME_KEY,
  LOCAL_STORAGE_UNIT_ID_KEY,
  LOCAL_STORAGE_UNIT_KEY,
  PATH_DIVISIONS,
  PATH_INSTRUCTIONS,
  PATH_PARAM_QUIZ_TYPE,
  PATH_PROFILE,
  PATH_QUESTION_BUILDER,
  PATH_QUIZ,
  PATH_ROOT,
  PATH_USER_INFO,
} from './contants';
import SideMenu from './components/side-menu';
import IsSideMenuVisibleContext from './context';
import QuestionBuilderPage from './pages/question-builder-page';

const hasFilledOutForm = () => localStorage.getItem(LOCAL_STORAGE_UNIT_KEY)
  && localStorage.getItem(LOCAL_STORAGE_UNIT_ID_KEY)
  && localStorage.getItem(LOCAL_STORAGE_LAST_NAME_KEY);

const App: React.FC = (): ReactElement => {
  const [isSideMenuVisible, setIsSideMenuVisible] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <IsSideMenuVisibleContext.Provider value={{ isSideMenuVisible, setIsSideMenuVisible }}>
        <Sidebar.Pushable>
          <SideMenu />
          <Sidebar.Pusher>
            <AppHeader />
            <Container style={{ height: '100vh' }}>
              {hasFilledOutForm() ? (
                <Switch>
                  <Route path={[PATH_ROOT, PATH_USER_INFO]} exact>
                    <Redirect to={PATH_QUIZ} />
                  </Route>
                  <Route path={PATH_QUIZ} exact component={QuizSelectionsPage} />
                  <Route
                    path={PATH_QUIZ + PATH_PARAM_QUIZ_TYPE + PATH_INSTRUCTIONS}
                    exact
                    component={QuizInstructionPage}
                  />
                  <Route path={PATH_QUIZ + PATH_PARAM_QUIZ_TYPE} exact component={QuizPage} />
                  <Route path={PATH_PROFILE} exact component={ProfilePage} />
                  <Route path={`${PATH_QUESTION_BUILDER + PATH_DIVISIONS}/0/brigade`} component={QuestionBuilderPage} />
                  <Route path={PATH_QUESTION_BUILDER} exact>
                    <Redirect to={`${PATH_QUESTION_BUILDER + PATH_DIVISIONS}/0/brigade`} />
                  </Route>
                </Switch>
              ) : (
                <Switch>
                  <Route path={PATH_USER_INFO} exact component={UserInfoForm} />
                  <Route path="*">
                    <Redirect to={PATH_USER_INFO} />
                  </Route>
                </Switch>
              )}
            </Container>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </IsSideMenuVisibleContext.Provider>
    </BrowserRouter>
  );
};

export default App;
