import React from 'react';
import { Wrapper } from './FilterField.styled';
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectFilter } from 'redux/filterSlice';

const FilterField = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();

  const onFilter = value => {
    dispatch(changeFilter(value));
  };

  return (
    <Wrapper>
      <p>Find contact by name</p>
      <input
        type="text"
        value={filter}
        onChange={e => {
          onFilter(e.target.value);
        }}
      />
    </Wrapper>
  );
};

export default FilterField;
