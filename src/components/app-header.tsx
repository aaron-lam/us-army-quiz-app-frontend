import React, { ReactElement, useContext } from 'react';
import {
  Button,
  Header,
  Segment,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import {
  APP_HEADER,
  MARGIN_DEFAULT,
  PATH_USER_INFO, SIDE_MENU_SIGN_OUT,
  SIDEBAR_TITLE,
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
  left: MARGIN_DEFAULT,
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
          {SIDEBAR_TITLE}
        </SidebarButton>
        <Header.Content style={{ margin: MARGIN_DEFAULT }}>
          {APP_HEADER}
        </Header.Content>
        <Button
          style={{
            visibility: urlPath.includes(PATH_USER_INFO) ? 'hidden' : 'visible',
            position: 'absolute',
            right: MARGIN_DEFAULT,
          }}
          as={Link}
          to={PATH_USER_INFO}
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          {SIDE_MENU_SIGN_OUT}
        </Button>
      </Header>
    </HeaderSegment>
  );
};

export default AppHeader;
