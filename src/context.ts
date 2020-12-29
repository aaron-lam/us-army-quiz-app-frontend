import * as React from 'react';
import { Dispatch, SetStateAction } from 'react';

type IsSideMenuVisible = {
  isSideMenuVisible: boolean,
  setIsSideMenuVisible: Dispatch<SetStateAction<boolean>>,
}

const IsSideMenuVisibleContext = React.createContext<IsSideMenuVisible>({
  isSideMenuVisible: false,
  setIsSideMenuVisible: () => false,
});

export default IsSideMenuVisibleContext;
