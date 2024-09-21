import React from 'react';

const HistorySearch = () => {
  return (
    <div id="history-search">
      {/* Header Section */}
      <div id="head-sec">
        <h6>History</h6>
        {/* Uncomment to use icons */}
        <div id="head-icons">
         <button onClick={() => setShowHistory(false)}> <i className="bi bi-trash3"></i></button>  
        </div>
      </div>

      {/* Search Section */}
      <div id="search-bar">
        <button>
          <div className="search-icon"><i className="bi bi-search"></i></div>
        </button>
        <input className="search-input" type="text" placeholder="Search History" />
      </div>

      {/* Third Section */}
      <div id="all-sec">
        <ul>
          <a href="#" style={{ textDecoration: 'none' }}>
            <li>All</li>
          </a>
          <a href="#" style={{ textDecoration: 'none' }}>
            <li>Recently closed</li>
          </a>
        </ul>
      </div>
      <hr />

      {/* Fourth Section */}
      <div id="recent-info">
        <span>Recent</span>
        <div id="info-sec">
        <div className="modal-body">
                {searchHistory.length > 0 ? (
                  <ul>
                    {searchHistory.map((item, index) => (
                      <li key={index}>{item.search_query}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No search history available.</p>
                )}
              </div>
        </div>
      </div>
    </div>
  );
};

export default HistorySearch;