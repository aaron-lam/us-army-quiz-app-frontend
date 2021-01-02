import React, {
  ChangeEvent,
  ReactElement, useEffect, useState,
} from 'react';
import {
  Button, Header, Input, List, Loader, Message,
} from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import {
  API_URL,
  API_URL_PATH_UNITS,
  BATTALION,
  BRIGADE,
  BUTTON_TEXT_ADD_UNIT,
  BUTTON_TEXT_DELETE,
  BUTTON_TEXT_EDIT,
  BUTTON_TEXT_EDIT_MODE,
  BUTTON_TEXT_SAVE,
  BUTTON_TEXT_VIEW_MODE,
  COMPANY,
  DELETE_UNIT_BUTTON_CANCEL,
  DELETE_UNIT_BUTTON_DELETE,
  DELETE_UNIT_CONFIRM_MESSAGE,
  DELETE_UNIT_TITLE,
  FETCH_UNITS_ERROR_MESSAGE,
  LOADER_SIZE,
  NAVIGATION_PATH_SEPARATOR,
  NOT_AUTHORIZED_MESSAGE,
  PLACEHOLDER_ID,
  PRIMARY_COLOR,
  TOAST_CONFIG_NO_AUTO_CLOSE,
  TOAST_ERROR_MESSAGE_DELETE_UNIT,
  TOAST_ERROR_MESSAGE_UPDATE_UNIT,
} from '../contants';
import { Unit } from '../types';
import { isUserDivisionLevel } from '../utils/units';
import defaultOptions from '../default-options';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
`;

const FlexListContent = styled(List.Content)({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
});

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

const QuestionBuilderPage: React.FC = (): ReactElement => {
  const [unitList, setUnitList] = useState<Unit[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isEditingUnit, setIsEditingUnit] = useState<boolean>(false);
  const [editItemId, setEditItemId] = useState<number>(PLACEHOLDER_ID);
  const [newUnitName, setNewUnitName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasFetchError, setHasFetchError] = useState<boolean>(false);
  const [navigationPath, setNavigationPath] = useState<string>('');

  const urlPath = useLocation().pathname;
  const unitHierarchies = [BRIGADE, BATTALION, COMPANY];

  const getUnitHierarchiesIds = (): string[] => {
    const urlPathArr = urlPath.split('/');
    const unitHierarchiesIds: string[] = [];
    for (let i = 3; i < urlPathArr.length; i += 2) {
      unitHierarchiesIds.push(urlPathArr[i]);
    }
    return unitHierarchiesIds;
  };

  const getParentUnitId = () => {
    const unitHierarchiesIds = getUnitHierarchiesIds();
    return unitHierarchiesIds[unitHierarchiesIds.length - 1];
  };

  const getCurrentUnit = () => {
    const startIndex = urlPath.lastIndexOf('/');
    return urlPath.substring(startIndex + 1);
  };

  const fetchUnits = () => {
    const unitsFetchUrl = `${API_URL}${API_URL_PATH_UNITS}/${getCurrentUnit()}?${new URLSearchParams({
      parentId: getParentUnitId(),
    })}`;
    setIsLoading(true);
    fetch(unitsFetchUrl)
      .then((response) => response.json())
      .then((data) => {
        if (!data.units) {
          setHasFetchError(true);
        } else {
          setUnitList(data.units);
          setIsLoading(false);
        }
      })
      .catch(() => setHasFetchError(true));
  };

  const fetchUnit = (id: string) => {
    const unitsFetchUrl = `${API_URL}${API_URL_PATH_UNITS}?${new URLSearchParams({ id })}`;
    return fetch(unitsFetchUrl)
      .then((response) => response.json())
      .then((data) => data.unit.name)
      .catch(() => setHasFetchError(true));
  };

  const updateUnitName = (unitId: number) => {
    const unitsUpdateUrl = API_URL + API_URL_PATH_UNITS;
    fetch(unitsUpdateUrl, {
      ...defaultOptions,
      method: 'PUT',
      body: JSON.stringify({
        unitId,
        newName: newUnitName,
      }),
    })
      .then((response) => response.json())
      .then(() => fetchUnits())
      .catch(() => toast.error(TOAST_ERROR_MESSAGE_UPDATE_UNIT, TOAST_CONFIG_NO_AUTO_CLOSE));
  };

  const deleteUnitName = (unitId: number) => {
    const unitsUpdateUrl = API_URL + API_URL_PATH_UNITS;
    fetch(unitsUpdateUrl, {
      ...defaultOptions,
      method: 'DELETE',
      body: JSON.stringify({
        unitId,
        unitType: getCurrentUnit(),
      }),
    })
      .then((response) => response.json())
      .then(() => fetchUnits())
      .catch(() => toast.error(TOAST_ERROR_MESSAGE_DELETE_UNIT, TOAST_CONFIG_NO_AUTO_CLOSE));
  };

  const constructNavigationPath = async () => {
    const unitHierarchiesIds = getUnitHierarchiesIds();
    const unitPromises = unitHierarchiesIds.map((id) => fetchUnit(id));
    const unitPath = await Promise.all(unitPromises);
    setNavigationPath(unitPath.join(NAVIGATION_PATH_SEPARATOR));
  };

  useEffect(() => {
    constructNavigationPath().then();
    fetchUnits();
  }, [urlPath]);

  const saveNewUnitName = (unitId: number) => {
    if (!newUnitName) {
      toast.error(TOAST_ERROR_MESSAGE_UPDATE_UNIT, TOAST_CONFIG_NO_AUTO_CLOSE);
    } else {
      updateUnitName(unitId);
    }
  };

  const editOnClick = (unitId: number) => {
    // clicked save button
    if (isEditingUnit) {
      saveNewUnitName(unitId);
      setNewUnitName('');
    }
    setIsEditingUnit(!isEditingUnit);
    setEditItemId(!isEditingUnit ? unitId : PLACEHOLDER_ID);
  };

  const editModeButtonOnClick = () => {
    setIsEditMode(!isEditMode);
  };

  const getChildUnit = () => {
    const targetIndex = unitHierarchies.findIndex((unit) => unit === getCurrentUnit());
    return unitHierarchies[targetIndex + 1] || '';
  };

  const isDisplayingLowestUnitLevel = () => getChildUnit() === '';

  const deleteUnitOnClick = (unitId: number) => {
    confirmAlert({
      title: DELETE_UNIT_TITLE,
      message: DELETE_UNIT_CONFIRM_MESSAGE,
      buttons: [
        {
          label: DELETE_UNIT_BUTTON_DELETE,
          onClick: () => deleteUnitName(unitId),
        },
        {
          label: DELETE_UNIT_BUTTON_CANCEL,
          onClick: () => {},
        },
      ],
    });
  };

  const inputOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewUnitName(event.target.value);
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
          onClick={() => deleteUnitOnClick(id)}
        >
          {BUTTON_TEXT_DELETE}
        </Button>
      </List.Content>
      <List.Content>
        <FlexListContent>
          {
            (editItemId === id)
              ? (
                <Input
                  onChange={inputOnChange}
                />
              ) : (
                <Button
                  disabled={isEditingUnit}
                  as={(isEditingUnit || isDisplayingLowestUnitLevel()) ? undefined : Link}
                  to={`${urlPath}/${id}/${getChildUnit()}`}
                >
                  {name}
                </Button>
              )
          }
        </FlexListContent>
      </List.Content>
    </List.Item>
  ));

  const addUnitOnClick = () => {
    setIsEditMode(true);
    setIsEditingUnit(true);
    setEditItemId(PLACEHOLDER_ID);
    setUnitList(unitList.concat([{ id: PLACEHOLDER_ID, name: '', unitType: '' }]));
  };

  if (!isUserDivisionLevel()) {
    return (
      <Message negative>
        <Message.Header>{NOT_AUTHORIZED_MESSAGE}</Message.Header>
      </Message>
    );
  }
  if (hasFetchError) {
    return (
      <Message negative>
        <Message.Header>{FETCH_UNITS_ERROR_MESSAGE}</Message.Header>
      </Message>
    );
  }
  return (
    <div>
      <Header>Question Builder</Header>
      <Header>{navigationPath}</Header>
      <ButtonContainer>
        <Button color={PRIMARY_COLOR} onClick={editModeButtonOnClick} disabled={isEditingUnit}>
          {isEditMode ? BUTTON_TEXT_VIEW_MODE : BUTTON_TEXT_EDIT_MODE}
        </Button>
        <Button color={PRIMARY_COLOR} onClick={addUnitOnClick} disabled={isEditingUnit}>
          {BUTTON_TEXT_ADD_UNIT}
        </Button>
      </ButtonContainer>
      {(isLoading) ? (
        <LoaderContainer>
          <Loader style={{ height: '30%' }} size={LOADER_SIZE} active centered />
        </LoaderContainer>
      )
        : (
          <List divided inverted relaxed>
            {renderListItems()}
          </List>
        )}
    </div>
  );
};

export default QuestionBuilderPage;
