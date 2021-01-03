import React, { ReactElement, useContext } from 'react';
import {
  Button,
  Header, Icon, Image, Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import {
  APP_HEADER, APP_LOGO_HEIGHT, APP_LOGO_URL, ICON_NAME_SIDEBAR, PATH_USER_INFO,
} from '../contants';
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
  const urlPath = useLocation().pathname;
  const { setIsSideMenuVisible } = useContext(IsSideMenuVisibleContext);

  return (
    <HeaderSegment inverted>
      <Header as="h3" textAlign="center">
        <SidebarButton
          style={{ visibility: urlPath.includes(PATH_USER_INFO) ? 'hidden' : 'visible' }}
          onClick={() => {
            setIsSideMenuVisible(true);
          }}
        >
          <Icon fitted name={ICON_NAME_SIDEBAR} />
        </SidebarButton>
        <Image
          style={{ height: APP_LOGO_HEIGHT, width: 'auto' }}
          src={APP_LOGO_URL}
        />
        <Header.Content>
          {APP_HEADER}
        </Header.Content>
      </Header>
    </HeaderSegment>
  );
};

export default AppHeader;
