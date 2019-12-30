import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import api from '../../services/api';

import { addToCartRequest } from '../../store/modules/cart/action';

import { ProductList } from './styles';
import { formatPrice } from '../../util/format';

export default function Home() {
  const amount = useSelector(state =>
    state.cart.reduce((amountCart, product) => {
      amountCart[product.id] = product.amount;

      return amountCart;
    }, {})
  );

  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('products');

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }));

      setProducts(data);
    }
    loadProducts();
  }, []);

  function handleAddProduct(id) {
    dispatch(addToCartRequest(id));
  }

  return (
    <ProductList>
      {products.map(item => (
        <li key={item.id}>
          <img src={item.image} alt={item.title} />
          <strong> {item.title} </strong>
          <span> {item.priceFormatted} </span>

          <button type="button" onClick={() => handleAddProduct(item.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#FFF" />{' '}
              {amount[item.id] ? amount[item.id] : 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  );
}
