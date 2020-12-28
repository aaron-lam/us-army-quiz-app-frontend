import React, { ReactElement } from 'react';
import { Header, Image, Segment } from 'semantic-ui-react';
import { APP_HEADER, ARMY_LOGO_URL } from '../contants';

const AppHeader: React.FC = (): ReactElement => (
  <Segment inverted attached="bottom">
    <Header as="h3" textAlign="center">
      <Image
        style={{ height: 48, width: 'auto' }}
        src={ARMY_LOGO_URL}
      />
      <Header.Content>
        {APP_HEADER}
      </Header.Content>
    </Header>
  </Segment>
);

export default AppHeader;
