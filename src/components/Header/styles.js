import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 50px 0;
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  &:hover {
    transition: opacity 0.2s;
    opacity: 0.7;
  }

  div {
    text-align: right;
    margin-right: 10px;
    display: flex;
    flex-direction: column;

    strong {
      color: #fff;
    }

    span {
      margin-top: 2px;
      margin-bottom: 2px;
      font-size: 12px;
      color: #999;
    }
  }
`;
