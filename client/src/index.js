import { fromEvent, BehaviorSubject } from 'rxjs';
import { combineLatestWith, map, tap } from 'rxjs/operators';
import { filters$, filterData, setupFilterAction } from './filters';
import { renderContent, setupAddClientAction } from './usersTable';
import { init as modalInit } from './modal';
import './style.css';

const CUSTOMER_TYPE = Object.freeze({
  INDIVIDUAL: 1,
  ENTITY:  2,
});

const MOCKED_DATA = [
  { id: 123123123, name: 'First0 Last0', type: CUSTOMER_TYPE.INDIVIDUAL,  userNumber: 'str0000000001' },
  { id: 123123124, name: 'First1 Last1', type: CUSTOMER_TYPE.INDIVIDUAL,  userNumber: 'str0000000002' },
  { id: 123123125, name: 'First2 Last2', type: CUSTOMER_TYPE.INDIVIDUAL,  userNumber: 'str0000000003' },
  { id: 123123126, name: 'First3 Last3', type: CUSTOMER_TYPE.ENTITY,      userNumber: 'str0000000004' },
  { id: 123123127, name: 'First4 Last4', type: CUSTOMER_TYPE.INDIVIDUAL,  userNumber: 'str0000000005' },
  { id: 123123128, name: 'First5 Last5', type: CUSTOMER_TYPE.ENTITY,      userNumber: 'str0000000006' },
];

const appLoaded$ = fromEvent(document, 'DOMContentLoaded');
const dataChanged$ = new BehaviorSubject(MOCKED_DATA);

appLoaded$.pipe(
  tap(setupFilterAction),
  tap(setupAddClientAction),
  tap(modalInit),
  combineLatestWith(dataChanged$, filters$),
  map(([_, data, filters]) => filterData(data, filters)),
)
.subscribe(renderContent);
