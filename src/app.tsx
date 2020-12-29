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
import ProfilePage from './pages/profile-page';

const App: React.FC = (): ReactElement => (
  <div>
    <BrowserRouter>
      <AppHeader />
      <Container>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quiz" />
          </Route>
          <Route path="/quiz" exact component={QuizSelectionsPage} />
          <Route path="/quiz/:armyUnitsQuizType/instructions" exact component={QuizInstructionPage} />
          <Route path="/quiz/:armyUnitsQuizType" exact component={QuizPage} />
          <Route path="/profile" exact component={ProfilePage} />
        </Switch>
      </Container>
    </BrowserRouter>
  </div>
);

export default App;
