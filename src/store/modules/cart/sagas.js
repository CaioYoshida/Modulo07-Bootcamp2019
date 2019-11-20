import { call, select, put, takeLatest, all } from 'redux-saga/effects';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSucess, updateAmount } from './action';

// "function*" represents async function
function* addToCart({ id }) {
  const productAlreadyAddedToCart = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;
  const currentAmount = productAlreadyAddedToCart
    ? productAlreadyAddedToCart.amount
    : 0;

  const amount = currentAmount + 1;

  console.tron.log(amount);

  if (amount > stockAmount) {
    console.tron.warn('ERRO');
    return;
  }

  if (productAlreadyAddedToCart) {
    yield put(updateAmount(id, amount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price),
    };
    // we use "put" to dispatch an action
    yield put(addToCartSucess(data));
  }
}

export default all([takeLatest('@cart/ADD_REQUEST', addToCart)]);
