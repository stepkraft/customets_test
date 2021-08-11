import { BehaviorSubject } from 'rxjs';

export const filters$ = new BehaviorSubject({});

export const updateFilter = (name, value) => {
  const object = {
    ...filters$.getValue()
  }
  if (value) {
    object[name] = value;
  } else {
    delete object[name];
  }
  filters$.next(object);
};

export const filterData = (data, filter) => {
  if (Object.keys(filter).length) {
    return data.filter((row) => {
      return Object.entries(filter).every(([key, value]) => row[key] == value);
    });
  }
  return data;
}

export const setupFilterAction = () => {
  const typeFilterElm = document.querySelector('.type-filter');
  typeFilterElm && typeFilterElm.addEventListener('change', ({target}) => {
    const name = target.getAttribute('name');
    const value = target.value;
    updateFilter(name, value)
  });
};