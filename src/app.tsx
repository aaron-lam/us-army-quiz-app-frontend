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
} from './contants';
import SideMenu from './components/side-menu';
import IsSideMenuVisibleContext from './context';

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
            <Container>
              {hasFilledOutForm() ? (
                <Switch>
                  <Route path={['/', '/user-info']} exact>
                    <Redirect to="/quiz" />
                  </Route>
                  <Route path="/quiz" exact component={QuizSelectionsPage} />
                  <Route
                    path="/quiz/:armyUnitsQuizType/instructions"
                    exact
                    component={QuizInstructionPage}
                  />
                  <Route path="/quiz/:armyUnitsQuizType" exact component={QuizPage} />
                  <Route path="/profile" exact component={ProfilePage} />
                </Switch>
              ) : (
                <Switch>
                  <Route path="/user-info" exact component={UserInfoForm} />
                  <Route path="*">
                    <Redirect to="/user-info" />
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
