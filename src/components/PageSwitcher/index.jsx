import React from 'react';
import styles from './PageSwitcher.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, prevPage, nthPage } from '../../redux/slices/filterSlice';

function PageSwitcher() {
  const { pages } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  let pageArr = [];

  React.useEffect(() => {
    pageArr = [];
  }, [pages.count]);

  for (let i = 1; i <= pages.count; i++) {
    pageArr.push(i);
  }

  return (
    <div className={styles.root}>
      {console.log('rerender ' + pages.count)}
      <ul className={styles.content}>
        <li className={styles.controllers} onClick={() => dispatch(prevPage())}>
          {'<'}
        </li>
        {pageArr.map((value, index) => (
          <li
            key={index}
            className={index == pages.current - 1 ? styles.active : styles.item}
            onClick={() => dispatch(nthPage(value))}>
            {value}
          </li>
        ))}
        <li className={styles.controllers} onClick={() => dispatch(nextPage())}>
          {'>'}
        </li>
      </ul>
    </div>
  );
}

export default PageSwitcher;
