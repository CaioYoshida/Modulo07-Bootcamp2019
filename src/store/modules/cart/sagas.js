import { call, put, takeLatest, all } from 'redux-saga/effects';

import api from '../../../services/api';

import { addToCartSucess } from './action';

// "function*" represents async function
function* addToCart({ id }) {
  const response = yield call(api.get, `/products/${id}`);

  // we use "put" to dispatch an action
  yield put(addToCartSucess(response.data));
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
