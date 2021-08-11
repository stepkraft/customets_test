import { BehaviorSubject } from 'rxjs';

const CUSTOMER_TYPE = Object.freeze({
  INDIVIDUAL: 1,
  ENTITY:  2,
});

const LOCAL_DATA = [
  { id: 123123123, name: 'First0 Last0', type: CUSTOMER_TYPE.INDIVIDUAL,  userNumber: 'str0000000001' },
  { id: 123123124, name: 'First1 Last1', type: CUSTOMER_TYPE.INDIVIDUAL,  userNumber: 'str0000000002' },
  { id: 123123125, name: 'First2 Last2', type: CUSTOMER_TYPE.INDIVIDUAL,  userNumber: 'str0000000003' },
  { id: 123123126, name: 'First3 Last3', type: CUSTOMER_TYPE.ENTITY,      userNumber: 'str0000000004' },
  { id: 123123127, name: 'First4 Last4', type: CUSTOMER_TYPE.INDIVIDUAL,  userNumber: 'str0000000005' },
  { id: 123123128, name: 'First5 Last5', type: CUSTOMER_TYPE.ENTITY,      userNumber: 'str0000000006' },
];

const generateID = () => {
  return Math.floor(1000000000 + Math.random() * (4294967295 - 1000000000));
}

export const dataChanged$ = new BehaviorSubject(LOCAL_DATA);

export const addUser = (data) => {
  const updated = [...(dataChanged$.getValue() || []), {...data, id: generateID()}];
  dataChanged$.next(updated);
}

export const deleteUser = (userId) => {
  dataChanged$.next(dataChanged$.getValue().filter(({ id }) => id != userId));
}

export const updateUser = (data) => {
  const updated = (dataChanged$.getValue() || []).map((current) => {
    return data.id == current.id ? data : current;
  })
  dataChanged$.next(updated);
}
