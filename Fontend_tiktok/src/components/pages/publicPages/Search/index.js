import React, { useState } from 'react';
import clsx from 'clsx';
import Styles from './search.module.scss';

function Search() {
     const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Giả sử bạn có một API tìm kiếm để lấy kết quả
    // fetch(`http://yourapi.com/search?q=${searchTerm}`)
    //   .then(response => response.json())
    //   .then(data => setResults(data))
    //   .catch(error => console.error('Error:', error));

    // Ví dụ tạm thời với dữ liệu mẫu
    setResults(['Video 1', 'Video 2', 'Video 3']); 
  };

  return (
  <div className={clsx(Styles.searchPage)}>
      <div className={clsx(Styles.header)}>
        <h1 className={clsx(Styles.title)}>Search</h1>
        <div className={clsx(Styles.searchBar)}>
          <input
            type="text"
            placeholder="Search..."
            className={clsx(Styles.searchInput)}
          />
        </div>
      </div>
      <div className={clsx(Styles.results)}>
        <div className={clsx(Styles.resultItem)}>
          <img src="path/to/sample-image.jpg" alt="Sample" className={clsx(Styles.resultImage)} />
          <div className={clsx(Styles.resultContent)}>
            <h3>Video Title</h3>
            <p>Description of the video goes here.</p>
          </div>
        </div>
        {/* Thêm nhiều kết quả tìm kiếm ở đây */}
      </div>
    </div>
  );

}

export default Search;