import * as React from 'react';
import { ReactElement } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import QuizPage from './pages/quiz-page';
import AppHeader from './components/app-header';
import QuizSelectionsPage from './pages/quiz-selections-page';
import QuizInstructionPage from './pages/quiz-instructions-page';
import UserInfoForm from './pages/user-info-form';
import {
  LOCAL_STORAGE_LAST_NAME_KEY,
  LOCAL_STORAGE_UNIT_ID_KEY,
  LOCAL_STORAGE_UNIT_KEY,
} from './contants';

const hasFilledOutForm = () => localStorage.getItem(LOCAL_STORAGE_UNIT_KEY)
  && localStorage.getItem(LOCAL_STORAGE_UNIT_ID_KEY)
  && localStorage.getItem(LOCAL_STORAGE_LAST_NAME_KEY);

const App: React.FC = (): ReactElement => (
  <div>
    <BrowserRouter>
      <AppHeader />
      <Container>
        {hasFilledOutForm() ? (
          <Switch>
            <Route path="/" exact>
              <Redirect to="/quiz" />
            </Route>
            <Route path="/quiz" exact component={QuizSelectionsPage} />
            <Route path="/quiz/:armyUnitsQuizType/instructions" exact component={QuizInstructionPage} />
            <Route path="/quiz/:armyUnitsQuizType" exact component={QuizPage} />
            <Route path="/user-info" exact component={UserInfoForm} />
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
    </BrowserRouter>
  </div>
);

export default App;
