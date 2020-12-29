import React, { ReactElement } from 'react';
import { Divider, Header } from 'semantic-ui-react';

const ProfilePage: React.FC = (): ReactElement => (
  <div>
    <h1>Profile</h1>
    <Divider />
    <Header size="large">Last Name:</Header>
    <div>{localStorage.getItem('lastName')}</div>
    <Divider hidden />
    <Header size="large">Unit:</Header>
    <div>{localStorage.getItem('unit')}</div>
  </div>
);

export default ProfilePage;
