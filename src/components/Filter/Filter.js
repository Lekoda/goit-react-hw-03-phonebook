import React from 'react';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

function Filter({ filter, onChange }) {
  return (
    <div className={css.filter__container}>
      <label className={css.label}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          name="filter"
          value={filter}
          onChange={onChange}
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
