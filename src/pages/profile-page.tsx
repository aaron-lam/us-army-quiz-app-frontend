import React, { ReactElement } from 'react';
import { Divider, Header } from 'semantic-ui-react';
import {
  LAST_NAME_LABEL,
  LOCAL_STORAGE_LAST_NAME_KEY,
  LOCAL_STORAGE_UNIT_KEY,
  PROFILE_HEADER_SIZE,
  PROFILE_TITLE,
  UNIT_LABEL,
} from '../contants';

const ProfilePage: React.FC = (): ReactElement => (
  <div>
    <h1>{PROFILE_TITLE}</h1>
    <Divider />
    <Header size={PROFILE_HEADER_SIZE}>{LAST_NAME_LABEL}</Header>
    <div>{localStorage.getItem(LOCAL_STORAGE_LAST_NAME_KEY)}</div>
    <Divider hidden />
    <Header size={PROFILE_HEADER_SIZE}>{UNIT_LABEL}</Header>
    <div>{localStorage.getItem(LOCAL_STORAGE_UNIT_KEY)}</div>
  </div>
);

export default ProfilePage;
