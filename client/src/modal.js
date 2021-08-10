import modalEditTmpl from './templates/modal-edit.html';
import modalRemoveTmpl from './templates/modal-remove-confirm.html';
let modal;

class Modal {
  constructor(actions) {
    this.modal = document.querySelector('.modal');
    this.modalContent = this.modal.querySelector('.modal-content');
    this.addCloseListener();
    this.buttonsListeners = null;
    this.formListeners = null;
    this.actions = actions;
  }

  addCloseListener() {
    const closeBtn = this.modal.querySelector('.close');
    closeBtn && closeBtn.addEventListener('click', this.closeModal.bind(this));
  }

  closeModal() {
    this.modal.style.display = 'none';
    this.removeListeners();
    this.cleanContent();
  }

  cleanContent() {
    this.modalContent.innerHTML = '';
  }

  openModal = ({ action, ...data }) => {
    if (!this.modal || !this.modalContent) {
      return null;
    }
  
    // remove obsolete listeners and content
    this.removeListeners();
    this.cleanContent();
  
    let content = '';
    const context = {
      id: null,
      name: null,
      type: null,
      userNumber: null,
      ...data,
    };
  
    switch(action) {
      case 'remove': {
        content = modalRemoveTmpl(context);
        break;
      }
      case 'edit':
      default: {
        content = modalEditTmpl(context);
        break;
      }
    }
    this.modalContent.insertAdjacentHTML('beforeend', content);
    this.buttonsListeners = this.addButtonsListeners();
    this.formListeners = this.addFormListeners();
    this.modal.style.display = 'block';
  };

  addFormListeners() {
    if (!this.modalContent) {
      return () => {};
    }
    const formElm = this.modalContent.querySelector('form');
    formElm && formElm.addEventListener('submit', this.submitEventListener.bind(this));

    return () => {
      formElm && formElm.removeEventListener('submit', this.submitEventListener.bind(this));
    }
  }

  addButtonsListeners() {
    if (!this.modalContent) {
      return () => {};
    }

    this.modalContent.addEventListener('click', this.clickEventListener.bind(this));
    return () => {
      this.modalContent && this.modalContent.removeEventListener('click', this.clickEventListener.bind(this));
    }
  }

  removeButtonsListeners() {
    this.buttonsListeners && this.buttonsListeners();
    this.buttonsListeners = null;
  }

  removeFormListeners() {
    this.formListeners && this.formListeners();
    this.formListeners = null;
  }

  removeListeners() {
    this.removeButtonsListeners();
    this.removeFormListeners();
  }

  submitEventListener(event) {
    const formData = new FormData(event.target);
    const data = Array.from(formData.entries()).reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});
    const method = data.id ? 'updFn' : 'addFn';
    this.actions && this.actions[method] && this.actions[method](data, this.closeModal.bind(this));
  }

  clickEventListener({ target }) {
    if (target && target.nodeName === 'BUTTON' && target.getAttribute('type') !== 'submit') {
      const action = target.getAttribute('data-action');
      const id = target.getAttribute('data-id');

      switch(action) {
        case 'delete': {
          this.actions && this.actions.delFn && this.actions.delFn({ id }, this.closeModal.bind(this));
          break;
        }
        default: {
          this.closeModal();
        }
      }
    }
    return false;
  }
}


export const init = (actions) => {
  const {
    delete: delFn = () => {},
    update: updFn = () => {},
    add: addFn = () => {},
  } = actions || {};
  modal = new Modal({ delFn, updFn, addFn });
}

export const openModal = (...args) => {
  modal && modal.openModal.apply(modal, args);
};
