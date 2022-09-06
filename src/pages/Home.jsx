/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import axios from 'axios';
import qs from 'qs';

import { useSelector, useDispatch } from 'react-redux';
import { setPagesCount, setFilter } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryID, sortType, sortDirection, searchValue } = useSelector((state) => state.filter);
  const isMounted = React.useRef(false);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sortType.sortProperty,
        order: sortDirection,
        category: categoryID,
        title: searchValue,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortType.sortProperty, sortDirection, categoryID, searchValue]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      console.log('params', params);
      dispatch(setFilter(params));
    }
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    console.log(categoryID, sortType, sortDirection);
    console.log('делаю запрос');
    axios
      .get(
        `https://62d5a7ded4406e52355f288d.mockapi.io/items?${
          categoryID > 0 ? `category=${categoryID}` : ''
        }&sortBy=${sortType.sortProperty}&order=${sortDirection}${
          searchValue && `&title=${searchValue}`
        }`,
      )
      .then((res) => {
        setItems(res.data);
        dispatch(setPagesCount(res.data.length));
        setIsLoading(false);
      });
  }, [categoryID, sortType, sortDirection, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(4)].map((_, index) => <Skeleton key={index} />)
          : items.map((listOfPizzas, id) => <PizzaBlock key={id} {...listOfPizzas} />)}
      </div>
    </div>
  );
};

export default Home;
