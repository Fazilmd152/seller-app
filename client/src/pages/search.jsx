import React, { useState } from 'react';

const data = [
  { name: 'John Doe', comment: 'Comment 1' },
  { name: 'Jane Doe', comment: 'Comment 2' },
  { name: 'Bob Smith', comment: 'Comment 3' },
  { name: 'Alice Johnson', comment: 'Comment 4' },
  { name: 'Mike Brown', comment: 'Comment 5' },
];

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = data.filter((item) => item.name.toLowerCase().includes(searchValue));
    setFilteredData(filtered);
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by name" />
      <ul>
        {filteredData.map((item) => (
          <li key={item.name}>
            <h2>{item.name}</h2>
            <p>{item.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Search