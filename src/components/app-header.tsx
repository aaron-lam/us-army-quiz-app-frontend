import React, { ReactElement } from 'react';
import { Header, Segment } from 'semantic-ui-react';
import { APP_HEADER, ARMY_LOGO_URL } from '../contants';

const AppHeader: React.FC = (): ReactElement => (
  <Segment inverted borderless attached="bottom">
    <Header as="h2" textAlign="center" image={ARMY_LOGO_URL} content={APP_HEADER} />
  </Segment>
);

export default AppHeader;
