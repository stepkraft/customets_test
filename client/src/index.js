import { fromEvent } from 'rxjs';
import { combineLatestWith, map, tap } from 'rxjs/operators';
import { filters$, filterData, setupFilterAction } from './filters';
import {
  init as usersTableInit,
  renderContent,
  setupAddClientAction,
} from './usersTable';
import { init as modalInit } from './modal';
import { data$, addUser, deleteUser, updateUser } from './service';
import './style.css';

const appLoaded$ = fromEvent(document, 'DOMContentLoaded');

appLoaded$.pipe(
  tap(usersTableInit),
  tap(() => modalInit({
    add: (data, callback) => {
      addUser(data);
      callback && callback();
    },
    delete: ({ id: delId }, callback) => {
      deleteUser(delId);
      callback && callback();
    },
    update: (data, callback) => {
      updateUser(data);
      callback && callback();
    },
  })),
  tap(setupFilterAction),
  tap(setupAddClientAction),
  combineLatestWith(data$, filters$),
  map(([_, data, filters]) => filterData(data, filters)),
)
.subscribe(renderContent);
