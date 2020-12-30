import {
  Icon, Menu, Sidebar,
} from 'semantic-ui-react';
import * as React from 'react';
import { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import IsSideMenuVisibleContext from '../context';
import {
  PATH_PROFILE, PATH_QUIZ, SIDE_MENU_PROFILE_TITLE, SIDE_MENU_QUIZ_TITLE,
} from '../contants';

const SideMenu: React.FC = (): ReactElement => {
  const { isSideMenuVisible, setIsSideMenuVisible } = useContext(IsSideMenuVisibleContext);

  const closeSideMenu = () => {
    setIsSideMenuVisible(false);
  };

  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="left"
      icon="labeled"
      inverted
      onHide={() => setIsSideMenuVisible(false)}
      vertical
      visible={isSideMenuVisible}
      width="thin"
    >
      <Menu.Item
        as={Link}
        to={PATH_PROFILE}
        onClick={closeSideMenu}
      >
        <Icon name="user circle" />
        {SIDE_MENU_PROFILE_TITLE}
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={PATH_QUIZ}
        onClick={closeSideMenu}
      >
        <Icon name="question circle outline" />
        {SIDE_MENU_QUIZ_TITLE}
      </Menu.Item>
    </Sidebar>
  );
};

export default SideMenu;