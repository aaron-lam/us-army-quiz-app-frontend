import {
  BATTALION, BRIGADE, COMPANY, DIVISION, LOCAL_STORAGE_UNIT_TYPE_KEY, PLACEHOLDER_LEVEL,
} from '../contants';

const unitTypeLevelMap: Map<string, number> = new Map([
  [DIVISION, 3],
  [BRIGADE, 2],
  [BATTALION, 1],
  [COMPANY, 0],
]);

export const unitTypeToLevel = (unitType: string): number => unitTypeLevelMap.get(unitType) || PLACEHOLDER_LEVEL;

export const getUserUnitType = (): string => localStorage.getItem(LOCAL_STORAGE_UNIT_TYPE_KEY) || '';

export const getUserLevel = (): number => unitTypeToLevel(getUserUnitType());

export const isUserDivisionLevel = (): boolean => getUserUnitType() === DIVISION;
