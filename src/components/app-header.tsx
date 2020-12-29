import React, { ReactElement, useContext } from 'react';
import {
  Button,
  Header, Icon, Image, Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { APP_HEADER, ARMY_LOGO_URL } from '../contants';
import IsSideMenuVisibleContext from '../context';

/**
 * Override Semantic UI Segment's border radius style
 */
const HeaderSegment = styled(Segment)({
  borderTopLeftRadius: '0 !important',
  borderTopRightRadius: '0 !important',
  borderBottomLeftRadius: '0 !important',
  borderBottomRightRadius: '0 !important',
});

const SidebarButton = styled(Button)({
  position: 'absolute',
  left: 10,
});

const AppHeader: React.FC = (): ReactElement => {
  const location = useLocation();
  const { setIsSideMenuVisible } = useContext(IsSideMenuVisibleContext);

  return (
    <HeaderSegment inverted>
      <Header as="h3" textAlign="center">
        <SidebarButton
          style={{ visibility: location.pathname.includes('user-info') ? 'hidden' : 'visible' }}
          onClick={() => setIsSideMenuVisible(true)}
        >
          <Icon fitted name="sidebar" />
        </SidebarButton>
        <Image
          style={{ height: 48, width: 'auto' }}
          src={ARMY_LOGO_URL}
        />
        <Header.Content>
          {APP_HEADER}
        </Header.Content>
      </Header>
    </HeaderSegment>
  );
};

export default AppHeader;
