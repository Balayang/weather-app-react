import React from 'react';

export const Search = ({ setLocation }) => {
  const [value, setValue] = React.useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (value !== '') {
      setLocation(value);
      setValue('');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="search"
        value={value}
        type="text"
        onChange={e => setValue(e.target.value)}
        placeholder="Search..."
      />
    </form>
  );
};
