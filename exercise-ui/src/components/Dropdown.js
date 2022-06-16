import * as React from 'react';

const Dropdown = ({value, options, onChange }) => {
    return (
      <label>
        <select value={value} onChange={onChange}>
          {options.map((option, i) => (
            <option value={option.value} key={i}>{option.label}</option>
          ))}
        </select>
      </label>
    );
  };

export default Dropdown;