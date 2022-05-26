import React from 'react';


export default function Datatable({ data }) {
  const lists = data[0] && Object.keys(data[0]);

  return (
    
    <ul >
      
        {data[0] && data.map((items, heading) => (
          <div className='container'>
            {/* {lists.map((heading) => <li>{heading}</li>)} */}

            {lists.map((list) => <li>{items[list]}</li>)}
          </div>
        ))}
     
    </ul>
  );
}


