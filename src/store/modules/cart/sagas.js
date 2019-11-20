import { call, select, put, takeLatest, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import { formatPrice } from '../../../util/format';

import { addToCartSucess, updateAmountSuccess } from './action';

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
    toast.error('Quantidade solicitada fora de estoque');
    return;
  }

  if (productAlreadyAddedToCart) {
    yield put(updateAmountSuccess(id, amount));
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

function* updateCart({ id, amount }) {
  console.tron.log(amount);

  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque');
  } else {
    yield put(updateAmountSuccess(id, amount));
  }
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateCart),
]);
