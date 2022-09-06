/* eslint-disable eqeqeq */
import React from 'react';
import styles from './PizzaBlock.module.scss';
import { addItems } from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';

function PizzBlock({ title, price, imageUrl, types, sizes }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.items.find((obj) => obj.title == title));
  const cartItems = useSelector((state) => state.cart.items.filter((obj) => obj.title == title));

  const addetCount = cartItem
    ? cartItems.reduce((sum, item) => {
        return item.count + sum;
      }, 0)
    : 0;

  const typeNames = ['тонкое', 'традиционное'];
  const [activeSize, setSizeActiveIndex] = React.useState(0);
  const [activeType, setActiveTypeIndex] = React.useState(0);

  const onClickAdd = () => {
    const item = {
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
    };
    dispatch(addItems(item));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.root}>
        <img className={styles.image} src={imageUrl} alt="Pizza" />
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.selector}>
          <ul>
            {types.map((type, index) => (
              <li
                key={index}
                onClick={() => setActiveTypeIndex(index)}
                className={activeType == index ? styles.active : ''}>
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, index) => (
              <li
                key={index}
                onClick={() => setSizeActiveIndex(index)}
                className={activeSize == index ? styles.active : ''}>
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.bottom}>
          <div className={styles.price}>от {price} ₽</div>
          <button className="button button--outline button--add" onClick={onClickAdd}>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{addetCount}</i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PizzBlock;
