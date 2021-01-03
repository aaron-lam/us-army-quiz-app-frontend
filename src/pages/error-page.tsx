import React, { ReactElement } from 'react';
import { Message } from 'semantic-ui-react';
import styled from 'styled-components';
import {
  ERROR_MESSAGE_CHECK_LINK,
  ERROR_MESSAGE_INVALID_ROUTE,
} from '../contants';

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ErrorPage: React.FC = (): ReactElement => (
  <FlexContainer>
    <Message negative>
      <Message.Header>{ERROR_MESSAGE_INVALID_ROUTE}</Message.Header>
      <Message.Content>{ERROR_MESSAGE_CHECK_LINK}</Message.Content>
    </Message>
  </FlexContainer>
);

export default ErrorPage;
