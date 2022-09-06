import React from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock = () => {
  return (
    <div className={styles.root}>
      <span>404 ERROR</span>
      <br />
      <p className={styles.pageNotFound}>Страница не найдена</p>
      <p>К сожалению данная страница отсутствует в нашеем интернет-магазине</p>
    </div>
  );
};

export default NotFoundBlock;
