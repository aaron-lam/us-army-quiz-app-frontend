import {
  Icon, Menu, Sidebar,
} from 'semantic-ui-react';
import * as React from 'react';
import { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import IsSideMenuVisibleContext from '../context';
import {
  ICON_NAME_PROFILE,
  ICON_NAME_QUESTION_BUILDER,
  ICON_NAME_QUIZ,
  PATH_PROFILE,
  PATH_QUESTION_BUILDER,
  PATH_QUIZ,
  SIDE_MENU_PROFILE_TITLE,
  SIDE_MENU_QUESTION_BUILDER,
  SIDE_MENU_QUIZ_TITLE,
} from '../contants';
import { isUserDivisionLevel } from '../utils/units';

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
        <Icon name={ICON_NAME_PROFILE} />
        {SIDE_MENU_PROFILE_TITLE}
      </Menu.Item>
      <Menu.Item
        as={Link}
        to={PATH_QUIZ}
        onClick={closeSideMenu}
      >
        <Icon name={ICON_NAME_QUIZ} />
        {SIDE_MENU_QUIZ_TITLE}
      </Menu.Item>
      <Menu.Item
        style={{ visibility: isUserDivisionLevel() ? 'visible' : 'hidden' }}
        as={Link}
        to={PATH_QUESTION_BUILDER}
        onClick={closeSideMenu}
      >
        <Icon name={ICON_NAME_QUESTION_BUILDER} />
        {SIDE_MENU_QUESTION_BUILDER}
      </Menu.Item>
    </Sidebar>
  );
};

export default SideMenu;
