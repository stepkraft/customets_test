import userRowTmpl from './templates/user-row.html';
import { openModal } from './modal';

export const renderContent = (data) => {
  const container = document.querySelector('article.container > section > .content');
  if (!container || !data.length) {
    return null;
  }
  // remove obsolete listeners and content
  addListeners(container)();
  container.innerHTML = '';

  // setup new content and listeners
  const nodes = data.map(userRowTmpl);
  container.insertAdjacentHTML('beforeend', nodes.join(''));
  addListeners(container);
};

export const setupAddClientAction = () => {
  const addClient = document.querySelector('.add-client-row');
  addClient && addClient.addEventListener('click', clickEventListener);
};

const clickEventListener = ({ target }) => {
  if (target && target.nodeName === 'BUTTON') {
    const id = target.getAttribute('data-id');
    const action = target.getAttribute('data-action');
    openModal({id, action});
  }
  return;
}

const addListeners = (container) => {
  container && container.addEventListener('click', clickEventListener);
  return () => {
    container && container.removeEventListener('click', clickEventListener);
  };
}