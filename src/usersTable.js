import userRowTmpl from './templates/user-row.html';
import { openModal } from './modal';

let userTable;

class UserTable {
  constructor() {
    this.container = document.querySelector('article.container > section > .content');
    this.data = [];
    this.listeners = null;
  }

  updateData(data) {
    this.data = data;
  }

  cleanContent() {
    this.container.innerHTML = '';
  }

  renderContent() {
    this.removeListeners();
    this.cleanContent();

    const nodes = this.data.map(userRowTmpl);
    this.container.insertAdjacentHTML('beforeend', nodes.join(''));
    this.listeners = this.addListeners();
  }

  addListeners() {
    if (!this.container) {
      return () => {};
    }
    this.container.addEventListener('click', this.clickEventListener.bind(this));
    return () => {
      this.container.removeEventListener('click', this.clickEventListener.bind(this));
    };
  }

  removeListeners() {
    this.listeners && this.listeners();
    this.listeners = null;
  }

  clickEventListener({ target }) {
    if (target && target.nodeName === 'BUTTON') {
      const id = target.getAttribute('data-id');
      const action = target.getAttribute('data-action');
      const data = (this.data || []).find((customer) => customer.id == id);
      openModal({action, ...data});
    }
    return;
  }
}

export const init = () => {
  userTable = new UserTable();
};
export const renderContent = (data) => {
  if (!userTable) {
    return null;
  }

  userTable.updateData(data);
  userTable.renderContent();
};

export const setupAddClientAction = () => {
  if (!userTable) {
    return null;
  }
  const addClient = document.querySelector('.add-client-row');
  addClient && addClient.addEventListener('click', userTable.clickEventListener.bind(userTable));
};
