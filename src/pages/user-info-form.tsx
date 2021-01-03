import React, {
  ChangeEvent, ReactElement, SyntheticEvent, useEffect, useState,
} from 'react';
import {
  Button, Dropdown, DropdownProps, Form, Header, Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  API_URL, API_URL_PATH_UNITS, ERROR_MESSAGE_RESPONSE_NOT_SUCCESS,
  FETCH_DROPDOWN_DATA_ERROR_MESSAGE,
  LAST_NAME_INVALID_MESSAGE,
  LOCAL_STORAGE_LAST_NAME_KEY,
  LOCAL_STORAGE_UNIT_ID_KEY,
  LOCAL_STORAGE_UNIT_KEY,
  LOCAL_STORAGE_UNIT_TYPE_KEY,
  PATH_QUIZ,
  PLACEHOLDER_DROP_DOWN,
  PLACEHOLDER_LAST_NAME,
  USER_FORM_BUTTON_TEXT_SUBMIT,
  USER_FORM_DESCRIPTION,
} from '../contants';
import { Unit } from '../types';
import isNotSuccess from '../utils/api';

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 60vh;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

type DropdownOption = {
  id: number,
  name: string,
  unitType: string,
  text: string,
  value: number,
}

const UserInfoForm: React.FC = (): ReactElement => {
  const [hasInvalidInput, setHasInvalidInput] = useState<boolean>(false);
  const [hasFetchError, setHasFetchError] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>('');
  const [unit, setUnit] = useState<Unit | null>(null);
  const [dropdownList, setDropdownList] = useState<DropdownOption[]>([]);

  useEffect(() => {
    fetch(API_URL + API_URL_PATH_UNITS)
      .then((response) => {
        if (isNotSuccess(response.status)) {
          throw new Error(ERROR_MESSAGE_RESPONSE_NOT_SUCCESS);
        }
        return response.json();
      })
      .then((data) => {
        setDropdownList(
          data.units.map((unitObject: Unit) => ({
            ...unitObject, text: unitObject.name, value: unitObject.id,
          })),
        );
      })
      .catch(() => setHasFetchError(true));
  }, []);

  const formOnSubmit = () => {
    localStorage.setItem(LOCAL_STORAGE_LAST_NAME_KEY, lastName);
    localStorage.setItem(LOCAL_STORAGE_UNIT_ID_KEY, unit ? unit.id.toString() : '');
    localStorage.setItem(LOCAL_STORAGE_UNIT_KEY, unit ? unit.name : '');
    localStorage.setItem(LOCAL_STORAGE_UNIT_TYPE_KEY, unit ? unit.unitType : '');
    // refresh to reconstruct an updated react router in App.tsx
    window.location.reload();
  };

  const lastNameFieldOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    // if the input for last name contains non-alphabets, display error to user
    setHasInvalidInput(!userInput.match(/^[a-zA-Z]+$/i));
    setLastName(userInput);
  };

  const getUnitName = (id: number) => dropdownList.filter((unitOption) => unitOption.id === id)[0].name;

  const getUnitType = (id: number) => dropdownList.filter((unitOption) => unitOption.id === id)[0].unitType;

  const dropdownOnChange = (event: SyntheticEvent<HTMLElement, Event>, { value }: DropdownProps) => {
    setUnit({
      id: Number(value),
      name: getUnitName(Number(value)),
      unitType: getUnitType(Number(value)),
    });
  };

  const isValidToSubmit = () => lastName !== '' && unit !== null;

  return (
    <FlexContainer>
      <Header>{USER_FORM_DESCRIPTION}</Header>
      <Form>
        <Form.Field>
          <label>Last Name</label>
          <Form.Input
            error={(hasInvalidInput)
              ? {
                content: LAST_NAME_INVALID_MESSAGE,
                pointing: 'below',
              } : undefined}
            onChange={lastNameFieldOnChange}
            placeholder={PLACEHOLDER_LAST_NAME}
          />
        </Form.Field>
        <Form.Field>
          <label>Units</label>
          <Dropdown
            placeholder={PLACEHOLDER_DROP_DOWN}
            fluid
            search
            selection
            onChange={dropdownOnChange}
            options={dropdownList}
          />
          {hasFetchError ? (
            <Message negative>
              <Message.Header>{FETCH_DROPDOWN_DATA_ERROR_MESSAGE}</Message.Header>
            </Message>
          ) : <></> }
        </Form.Field>
        <ButtonContainer>
          <Button
            style={{ webkitAppearance: 'none', MozAppearance: 'none' }}
            disabled={!isValidToSubmit()}
            onClick={formOnSubmit}
            as={Link}
            to={PATH_QUIZ}
            color="green"
            type="submit"
          >
            {USER_FORM_BUTTON_TEXT_SUBMIT}
          </Button>
        </ButtonContainer>
      </Form>
    </FlexContainer>
  );
};

export default UserInfoForm;
