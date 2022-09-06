import React from 'react';
import styles from './Categories.module.scss';
import { setCategoryID } from '../../redux/slices/filterSlice';
import { useDispatch, useSelector } from 'react-redux';

function Categories() {
  const categoryID = useSelector((state) => state.filter.categoryID);
  const categories = ['Всё', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const dispatch = useDispatch();
  return (
    <div className={styles.root}>
      <ul>
        {categories.map((catigorie, id) => (
          <li
            key={categories[id]}
            onClick={() => dispatch(setCategoryID(id))}
            className={categoryID == id ? styles.active : ''}>
            {catigorie}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
