
import './App.css';

import React, { useState, useEffect } from 'react';
import Datatable from './components/data';



require('es6-promise').polyfill();
require('isomorphic-fetch');

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [s, setS] = useState('');
  const [searchList, setSearchLists] = useState([
    'name',
    'region',
    
    
  ]);
  const[searchSize, setSearchSize] =useState([
    'area',
  ]);

  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
    .then(res => res.json())
    
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
    
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])






  function search(lists) {
    return lists.filter((list) =>
      searchList.some(
        (section) =>
          list[section]
            .toString()
            .toLowerCase()
            .indexOf(q.toLowerCase()) > -1,
      ),
    );
  }

  const lists = data[0] && Object.keys(data[0]);
  return (
    <div>
      <div>
      <h1>serch for country info</h1>
        <input
          type='text'
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {lists &&
          lists.map((list) => (
            <label>
              <input
                type='checkbox'
                checked={searchList.includes(list)}
                onChange={(e) => {
                  const checked = searchList.includes(list);
                  setSearchLists((prev) =>
                    checked
                      ? prev.filter((sc) => sc !== list)
                      : [...prev, list],
                  );
                }}
              />
              {list}
            </label>
          ))}
      </div>
      <div>
      <h1>compare country size</h1>
      <input
      type="text"
      value={s}
      onChange={e=> setS(e.target.value)}
      />
      </div>

      <div>
        <Datatable data={search(data)} />
        {/* <Datatable data={compare(data)}/> */}
      </div>
    </div>
  );
}


