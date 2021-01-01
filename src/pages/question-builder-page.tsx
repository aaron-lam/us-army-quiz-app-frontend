import React, {
  ReactElement, useEffect, useState,
} from 'react';
import {
  Button, Header, Input, List, Segment,
} from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { confirmAlert } from 'react-confirm-alert';
import {
  BATTALION,
  BRIGADE,
  BUTTON_TEXT_ADD_UNIT,
  BUTTON_TEXT_DELETE,
  BUTTON_TEXT_EDIT,
  BUTTON_TEXT_EDIT_MODE,
  BUTTON_TEXT_SAVE,
  BUTTON_TEXT_VIEW_MODE,
  COMPANY,
  DELETE_UNIT_BUTTON_CANCEL, DELETE_UNIT_BUTTON_DELETE,
  DELETE_UNIT_CONFIRM_MESSAGE,
  DELETE_UNIT_TITLE,
  DIVISION,
  MOCK_UNIT_LIST,
  NAVIGATION_PATH_SEPARATOR,
  PLACEHOLDER_ID,
  PRIMARY_COLOR,
} from '../contants';
import { Unit } from '../types';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const FlexListContent = styled(List.Content)({
  display: 'flex',
  justifyContent: 'center',
});

const QuestionBuilderPage: React.FC = (): ReactElement => {
  const [unitList, setUnitList] = useState<Unit[]>(MOCK_UNIT_LIST);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isEditingUnit, setIsEditingUnit] = useState<boolean>(false);
  const [editItemId, setEditItemId] = useState<number>(PLACEHOLDER_ID);

  const unitHierarchies = [DIVISION, BRIGADE, BATTALION, COMPANY];
  const urlPath = useLocation().pathname;

  useEffect(() => {
    // TODO: Will fetch units here once endpoints are built.
  }, [unitList]);

  const editOnClick = (unitId: number) => {
    if (isEditingUnit) {
      // Assigned a random id to simulate creating a new unit.
      const randomId = Math.floor(Math.random() * 100) + 20;
      unitList[unitList.length - 1].id = randomId;
    }
    setIsEditingUnit(!isEditingUnit);
    setEditItemId(!isEditingUnit ? unitId : PLACEHOLDER_ID);
  };

  const editModeButtonOnClick = () => {
    setIsEditMode(!isEditMode);
  };

  const getCurrentUnit = () => {
    const startIndex = urlPath.lastIndexOf('/');
    return urlPath.substring(startIndex + 1);
  };

  const getChildUnit = () => {
    const targetIndex = unitHierarchies.findIndex((unit) => unit === getCurrentUnit());
    return unitHierarchies[targetIndex + 1] || '';
  };

  const isDisplayingLowestUnitLevel = () => getChildUnit() === '';

  const deleteUnitOnClick = () => {
    confirmAlert({
      title: DELETE_UNIT_TITLE,
      message: DELETE_UNIT_CONFIRM_MESSAGE,
      buttons: [
        {
          label: DELETE_UNIT_BUTTON_DELETE,
          onClick: () => {},
        },
        {
          label: DELETE_UNIT_BUTTON_CANCEL,
          onClick: () => {},
        },
      ],
    });
  };

  const renderListItems = () => unitList.map(({ id, name }: Unit) => (
    <List.Item key={id}>
      <List.Content
        floated="left"
        style={{ visibility: isEditMode ? 'visible' : 'hidden' }}
      >
        <Button
          primary
          onClick={() => editOnClick(id)}
          disabled={isEditingUnit && editItemId !== id}
        >
          {editItemId === id ? BUTTON_TEXT_SAVE : BUTTON_TEXT_EDIT}
        </Button>
      </List.Content>
      <List.Content
        floated="right"
        style={{ visibility: isEditMode ? 'visible' : 'hidden' }}
      >
        <Button
          negative
          disabled={isEditingUnit}
          onClick={deleteUnitOnClick}
        >
          {BUTTON_TEXT_DELETE}
        </Button>
      </List.Content>
      <FlexListContent>
        {
          (editItemId === id)
            ? (<Input />) : (
              <List.Header
                as={(isEditingUnit || isDisplayingLowestUnitLevel()) ? undefined : Link}
                to={`${urlPath}/${id}/${getChildUnit()}`}
              >
                {`${name} ${getCurrentUnit()}`}
              </List.Header>
            )
        }
      </FlexListContent>
    </List.Item>
  ));

  const constructNavigationPath = () => {
    const urlPathArr = urlPath.split('/');
    const navigationPath = [];
    for (let i = 2; i < urlPathArr.length; i += 2) {
      navigationPath.push(urlPathArr[i]);
    }
    return navigationPath.join(NAVIGATION_PATH_SEPARATOR);
  };

  const addUnitOnClick = () => {
    setIsEditMode(true);
    setIsEditingUnit(true);
    setEditItemId(PLACEHOLDER_ID);
    setUnitList(unitList.concat([{ id: PLACEHOLDER_ID, name: '' }]));
  };

  return (
    <div>
      <Header>Question Builder</Header>
      <Header>{constructNavigationPath()}</Header>
      <ButtonContainer>
        <Button color={PRIMARY_COLOR} onClick={editModeButtonOnClick} disabled={isEditingUnit}>
          {isEditMode ? BUTTON_TEXT_VIEW_MODE : BUTTON_TEXT_EDIT_MODE}
        </Button>
        <Button color={PRIMARY_COLOR} onClick={addUnitOnClick} disabled={isEditingUnit}>
          {BUTTON_TEXT_ADD_UNIT}
        </Button>
      </ButtonContainer>
      <Segment color="brown" inverted>
        <List divided inverted relaxed>
          {renderListItems()}
        </List>
      </Segment>
    </div>
  );
};

export default QuestionBuilderPage;
