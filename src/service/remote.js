import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

export const dataChanged$ = new BehaviorSubject([]);
let service = null;


// TODO: pseudo code. haven't checked yet
class RemoteService {
  constructor(baseUrl) {
    this.serviceInstance = axios.create({
      baseURL: baseUrl,
      timeout: 1000,
    });
  }

  async getData() {
    try {
      const result = await this.serviceInstance.get('/');
      return result;
    } catch (er) {
      console.error(er)
      return null;
    }
  }

  async updateData(data) {
    try {
      const result = await this.serviceInstance.put('/', data);
      return result;
    } catch (er) {
      console.error(er)
      return null;
    }
  }

  async addData(data) {
    try {
      const result = await this.serviceInstance.post('/', data);
      return result;
    } catch (er) {
      console.error(er)
      return null;
    }
  }

  async removeData(id) {
    try {
      const result = await this.serviceInstance.delete(`/${id}`);
      return result;
    } catch (er) {
      console.error(er)
      return null;
    }
  }
}

export const init = async (baseUrl) => {
  service = new RemoteService(baseUrl);
  console.log('service', service);
  const data = await service.getData();
  dataChanged$.next(data);
}

export const addUser = async (data) => {
  try {
    const user = await service.addUser(data);
    const updated = [...dataChanged$.getValue(), user];
    dataChanged$.next(updated);
  } catch (er) {
    console.error(er);
  }
}

export const deleteUser = async (userId) => {
  try {
    await service.removeData(userId);
    dataChanged$.next(dataChanged$.getValue().filter(({ id }) => id != userId));
  } catch (er) {
    console.error(er);
  }
}

export const updateUser = async (data) => {
  try {
    const newData = await service.updateData(data);
    const updated = (dataChanged$.getValue() || []).map((current) => {
      return newData.id == current.id ? newData : current;
    })
    dataChanged$.next(updated);
  } catch (er) {
    console.error(er);
  }
}
