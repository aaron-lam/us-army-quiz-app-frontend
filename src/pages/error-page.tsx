import React, { ReactElement } from 'react';
import { Message } from 'semantic-ui-react';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorPage: React.FC = (): ReactElement => (
  <FlexContainer>

    <Message negative>
      <Message.Header>The URL you entered is invalid</Message.Header>
      <p>Please check your link and retry again.</p>
    </Message>
  </FlexContainer>
);

export default ErrorPage;
