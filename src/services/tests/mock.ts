import {
  TConstructorIngredient,
  TOrder,
  TOrdersData,
  TUser
} from '@utils-types';

export const localStorageMock = (function () {
  let store: { [key: string]: string } = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
})();

export const userDataMock: TUser = {
  email: 'ramil@zinnyrov.ru',
  name: 'Ramil Zinnyrov'
};

export const orderDataMock: TOrder[] = [
  {
    _id: '13',
    status: 'done',
    name: 'Order 13',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    number: 12345,
    ingredients: ['1', '2', '3']
  }
];

export const orderWithNameDataMock = {
  name: 'Order 1',
  order: {
    _id: '1',
    status: 'done',
    name: 'Order 1',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-02',
    number: 12345,
    ingredients: ['1', '2', '3']
  }
};

export const feedsDataMock: TOrdersData = {
  orders: [
    {
      _id: '13',
      status: 'done',
      name: 'Order 13',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      number: 1,
      ingredients: ['1', '2', '3']
    }
  ],
  total: 10,
  totalToday: 1
};

export const bun: TConstructorIngredient = {
  id: '1',
  _id: '1',
  name: 'Bun',
  type: 'bun',
  proteins: 10,
  fat: 20,
  carbohydrates: 30,
  calories: 400,
  price: 5,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};

export const ingredient: TConstructorIngredient = {
  id: '2',
  _id: '2',
  name: 'Ingredient',
  type: 'ingredient',
  proteins: 2,
  fat: 3,
  carbohydrates: 3,
  calories: 300,
  price: 2,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};

export const ingredient2: TConstructorIngredient = {
  id: '3',
  _id: '3',
  name: 'Sauce',
  type: 'sauce',
  proteins: 2,
  fat: 3,
  carbohydrates: 3,
  calories: 300,
  price: 2,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};
