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
  BUTTON_SECONDARY_COLOR,
  BUTTON_TEXT_ADD_UNIT,
  BUTTON_TEXT_CANCEL,
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
  DIVISION,
  ERROR_MESSAGE_INVALID_ROUTE,
  ERROR_MESSAGE_PLEASE_TRY_AGAIN,
  ERROR_MESSAGE_RESPONSE_NOT_SUCCESS,
  ERROR_MESSAGE_SERVICE_UNAVAILABLE,
  FETCH_UNITS_ERROR_MESSAGE,
  LOADER_SIZE, MARGIN_DEFAULT,
  NAVIGATION_PATH_SEPARATOR,
  NOT_AUTHORIZED_MESSAGE,
  PLACEHOLDER_ID,
  PRIMARY_COLOR,
  TOAST_CONFIG_LONG_WAIT,
  TOAST_ERROR_MESSAGE_CREATE_UNIT,
  TOAST_ERROR_MESSAGE_DELETE_UNIT,
  TOAST_ERROR_MESSAGE_EMPTY_UNIT_NAME,
  TOAST_ERROR_MESSAGE_UNIT_NAME_TOO_LONG,
  TOAST_ERROR_MESSAGE_UPDATE_UNIT,
} from '../contants';
import { Unit } from '../types';
import { isUserDivisionLevel } from '../utils/units';
import defaultOptions from '../default-options';
import isNotSuccess from '../utils/api';

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

type PostBodyUnitIds = {
  divisionId?: string,
  brigadeId?: string,
  battalionId?: string,
};

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

  const getParentUnitId = (): string => {
    const unitHierarchiesIds = getUnitHierarchiesIds();
    return unitHierarchiesIds[unitHierarchiesIds.length - 1] || PLACEHOLDER_ID.toString();
  };

  const getCurrentUnit = (): string => {
    const startIndex = urlPath.lastIndexOf('/');
    return urlPath.substring(startIndex + 1);
  };

  const getChildUnit = (): string => {
    const targetIndex = unitHierarchies.findIndex((unit) => unit === getCurrentUnit());
    return unitHierarchies[targetIndex + 1] || '';
  };

  const fetchUnits = () => {
    const unitsFetchUrl = `${API_URL}${API_URL_PATH_UNITS}?${new URLSearchParams({
      parentId: getParentUnitId(),
    })}`;
    setIsLoading(true);
    fetch(unitsFetchUrl)
      .then((response) => {
        if (isNotSuccess(response.status)) {
          throw new Error('Response is not success');
        }
        return response.json();
      })
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
    const unitFetchUrl = `${API_URL}${API_URL_PATH_UNITS}?${new URLSearchParams({ id })}`;
    return fetch(unitFetchUrl)
      .then((response) => {
        if (isNotSuccess(response.status)) {
          throw new Error(ERROR_MESSAGE_RESPONSE_NOT_SUCCESS);
        }
        return response.json();
      })
      .then((data) => data.units[0].name)
      .catch(() => setHasFetchError(true));
  };

  const constructPostBodyUnitIds = (): PostBodyUnitIds => {
    const postBodyHierarchies: string[] = [DIVISION, BRIGADE, BATTALION];
    const postBodyUnitIds: PostBodyUnitIds = {};
    getUnitHierarchiesIds().forEach((id, index) => {
      const key = `${postBodyHierarchies[index]}Id`;
      Object.assign(postBodyUnitIds, { [key]: id });
    });
    return postBodyUnitIds;
  };

  const createUnit = () => {
    const unitsUpdateUrl = API_URL + API_URL_PATH_UNITS;
    fetch(unitsUpdateUrl, {
      ...defaultOptions,
      method: 'POST',
      body: JSON.stringify({
        name: newUnitName,
        unitType: getCurrentUnit(),
        ...constructPostBodyUnitIds(),
      }),
    })
      .then((response) => {
        if (isNotSuccess(response.status)) {
          throw new Error(ERROR_MESSAGE_RESPONSE_NOT_SUCCESS);
        }
        return response.json();
      })
      .then(() => fetchUnits())
      .catch(() => toast.error(TOAST_ERROR_MESSAGE_CREATE_UNIT, TOAST_CONFIG_LONG_WAIT));
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
      .then((response) => {
        if (isNotSuccess(response.status)) {
          throw new Error(ERROR_MESSAGE_RESPONSE_NOT_SUCCESS);
        }
        return response.json();
      })
      .then(() => fetchUnits())
      .catch(() => toast.error(TOAST_ERROR_MESSAGE_UPDATE_UNIT, TOAST_CONFIG_LONG_WAIT));
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
      .then((response) => {
        if (isNotSuccess(response.status)) {
          throw new Error(ERROR_MESSAGE_RESPONSE_NOT_SUCCESS);
        }
        return response.json();
      })
      .then(() => fetchUnits())
      .catch(() => toast.error(TOAST_ERROR_MESSAGE_DELETE_UNIT, TOAST_CONFIG_LONG_WAIT));
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

  const backToNonEditingState = () => {
    setIsEditingUnit(false);
    setEditItemId(PLACEHOLDER_ID);
    setNewUnitName('');
  };

  const editOnClick = (unitId: number, unitName: string) => {
    // clicked save button
    if (isEditingUnit) {
      if (newUnitName.trim().length === 0) {
        toast.error(TOAST_ERROR_MESSAGE_EMPTY_UNIT_NAME, TOAST_CONFIG_LONG_WAIT);
        return;
      }
      if (newUnitName.trim().length >= 255) {
        toast.error(TOAST_ERROR_MESSAGE_UNIT_NAME_TOO_LONG, TOAST_CONFIG_LONG_WAIT);
        return;
      }
      // if the new unit name is same as unit name, treat the save button as cancel button
      if (newUnitName === unitName) {
        backToNonEditingState();
        return;
      }
      // the saving unit is created in new, or else it is already existed in database
      if (unitId === PLACEHOLDER_ID) {
        createUnit();
      } else {
        updateUnitName(unitId);
      }
    }
    setNewUnitName(isEditingUnit ? '' : unitName);
    setIsEditingUnit(!isEditingUnit);
    setEditItemId(!isEditingUnit ? unitId : PLACEHOLDER_ID);
  };

  const editModeButtonOnClick = () => setIsEditMode(!isEditMode);

  const isDisplayingLowestUnitLevel = () => getChildUnit() === '';

  const isRowEditingInEditMode = (id: number) => isEditingUnit && editItemId === id;

  const deleteUnitOnClick = (unitId: number) => {
    if (isRowEditingInEditMode(unitId)) {
      // if editing item is newly created, we should pop off the new placeholder item from the list.
      if (unitId === PLACEHOLDER_ID) {
        unitList.pop();
      }
      backToNonEditingState();
      return;
    }
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
          onClick={() => editOnClick(id, name)}
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
          className={isRowEditingInEditMode(id) ? BUTTON_SECONDARY_COLOR : 'negative'}
          disabled={isEditingUnit && !isRowEditingInEditMode(id)}
          onClick={() => deleteUnitOnClick(id)}
        >
          {isRowEditingInEditMode(id) ? BUTTON_TEXT_CANCEL : BUTTON_TEXT_DELETE}
        </Button>
      </List.Content>
      <List.Content>
        <FlexListContent>
          {
            (editItemId === id)
              ? (
                <Input
                  onChange={inputOnChange}
                  value={newUnitName}
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
      <Message
        negative
        header={FETCH_UNITS_ERROR_MESSAGE}
        list={[
          ERROR_MESSAGE_INVALID_ROUTE,
          ERROR_MESSAGE_SERVICE_UNAVAILABLE,
        ]}
        content={ERROR_MESSAGE_PLEASE_TRY_AGAIN}
      />
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
      {/* Make some margin between the list and the bottom of the page */}
      <div style={{ margin: MARGIN_DEFAULT }} />
    </div>
  );
};

export default QuestionBuilderPage;
