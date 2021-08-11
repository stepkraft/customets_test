import {
  dataChanged$ as localData$,
  addUser as localAddUser,
  deleteUser as localDeleteUser,
  updateUser as localUpdateUser,
} from './local';

import {
  dataChanged$ as remoteData$,
  addUser as remoteAddUser,
  deleteUser as remoteDeleteUser,
  updateUser as remoteUpdateUser,
} from './remote';

import { init as remoteInit } from './remote';

import config from '../config.json'

class Service {
  constructor() {
    if (!!config.BACKEND_URL) {
      this.mode = 'remote';
      remoteInit(config.BACKEND_URL);
    } else {
      this.mode = 'local';
    }
  }

  getDataStream() {
    return (this.mode === 'local') ? localData$ : remoteData$;
  }

  addUser() {
    return (data) => {
      if (this.mode === 'local') {
        return localAddUser(data);
      } else {
        return remoteAddUser(data);
      }
    }
  }

  deleteUser() {
    return (data) => {
      if (this.mode === 'local') {
        return localDeleteUser(data);
      } else {
        return remoteDeleteUser(data);
      }
    }
  }

  updateUser() {
    return (data) => {
      if (this.mode === 'local') {
        return localUpdateUser(data);
      } else {
        return remoteUpdateUser(data);
      }
    }
  }
}

const service = new Service();

export const data$ = service.getDataStream();
export const addUser = service.addUser();
export const deleteUser = service.deleteUser();
export const updateUser = service.updateUser();
