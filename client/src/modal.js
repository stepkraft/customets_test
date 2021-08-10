import modalEditTmpl from './templates/modal-edit.html';
import modalRemoveTmpl from './templates/modal-remove-confirm.html';
let modal;

class Modal {
  constructor() {
    this.modal = document.querySelector('.modal');
    this.modalContent = this.modal.querySelector('.modal-content');
    this.addCloseListener();
  }

  addCloseListener() {
    const closeBtn = this.modal.querySelector('.close');
    closeBtn && closeBtn.addEventListener('click', this.closeModal.bind(this));
  }

  closeModal() {
    this.modal.style.display = 'none';
  }

  cleanContent() {
    this.modalContent.innerHTML = '';
  }

  openModal = ({ id, action }) => {
    if (!this.modal || !this.modalContent) {
      return null;
    }
  
    // remove obsolete listeners and content
    // addListeners(container)();
    this.cleanContent();
  
    let content = '';
  
    switch(action) {
      case 'remove': {
        content = modalRemoveTmpl({ id, action });
        break;
      }
      case 'edit':
      default: {
        content = modalEditTmpl({ id, action });
        break;
      }
    }
    this.modalContent.insertAdjacentHTML('beforeend', content);
    this.modal.style.display = 'block';
  };
}


export const init = () => {
  modal = new Modal();
}

export const openModal = (...args) => {
  modal && modal.openModal.apply(modal, args)
};
