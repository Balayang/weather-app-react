import React from 'react';

interface SearchProps {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export const Search: React.FC<SearchProps> = ({ setLocation }) => {
  const [value, setValue] = React.useState<string>('');

  const onSubmit = (e: React.FormEvent): void => {
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
