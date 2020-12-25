import * as React from 'react';
import { ReactElement } from 'react';
import QuizPage from './pages/quiz-page';
import AppHeader from './components/app-header';

const App: React.FC = (): ReactElement => (
  <div>
    <AppHeader />
    <QuizPage />
  </div>
);

export default App;
