import React, {
  ChangeEvent, ReactElement, SyntheticEvent, useEffect, useState,
} from 'react';
import {
  Button, Dropdown, DropdownProps, Form, Header,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  API_URL, API_URL_PATH_UNITS, LOCAL_STORAGE_LAST_NAME_KEY,
  LOCAL_STORAGE_UNIT_ID_KEY,
  LOCAL_STORAGE_UNIT_KEY, PLACEHOLDER_DROP_DOWN,
  PLACEHOLDER_LAST_NAME, USER_FORM_DESCRIPTION,
} from '../contants';

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

type Unit = {
  id: number,
  name: string,
}

type dropdownOption = {
  id: number,
  name: string,
  text: string,
  value: number,
}

const UserInfoForm: React.FC = (): ReactElement => {
  const [hasInvalidInput, setHasInvalidInput] = useState<boolean>(false);
  const [lastName, setLastName] = useState<string>('');
  const [unit, setUnit] = useState<Unit | null>(null);
  const [dropdownList, setDropdownList] = useState<dropdownOption[]>([]);

  useEffect(() => {
    fetch(API_URL + API_URL_PATH_UNITS)
      .then((response) => response.json())
      .then((data) => {
        setDropdownList(
          data.units.map((unitObject: Unit) => ({ ...unitObject, text: unitObject.name, value: unitObject.id })),
        );
      });
  }, []);

  const formOnSubmit = () => {
    localStorage.setItem(LOCAL_STORAGE_LAST_NAME_KEY, lastName);
    localStorage.setItem(LOCAL_STORAGE_UNIT_ID_KEY, unit ? unit.id.toString() : '');
    localStorage.setItem(LOCAL_STORAGE_UNIT_KEY, unit ? unit.name.toString() : '');
  };

  const lastNameFieldOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userInput = event.target.value;
    // if the input for last name contains non-alphabets, display error to user
    setHasInvalidInput(!userInput.match(/^[a-zA-Z]+$/i));
    setLastName(userInput);
  };

  const getUnitName = (id: number) => dropdownList.filter((unitOption) => unitOption.id === id)[0].name;

  const dropdownOnChange = (event: SyntheticEvent<HTMLElement, Event>, { value }: DropdownProps) => {
    setUnit({
      id: Number(value),
      name: getUnitName(Number(value)),
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
                content: 'Last Name can only contains alphabets.',
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
        </Form.Field>
        <ButtonContainer>
          <Button
            disabled={!isValidToSubmit()}
            onClick={formOnSubmit}
            as={Link}
            to="/quiz"
            color="green"
          >
            Submit
          </Button>
        </ButtonContainer>
      </Form>
    </FlexContainer>
  );
};

export default UserInfoForm;
