import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import mockData from './mockData';

const endpoint = 'http://localhost:5000';

function App() {
  const [data, setData] = useState(mockData);

  useEffect(() => {
    const socket = io(endpoint);

    socket.on(
      'waste',
      (socket: any) =>
        new Promise((resolve, reject) => {
          console.log({ socket });
          resolve(data);
        })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App'>
      <header className='App-header'></header>
      <body>
        <p>{JSON.stringify(data)}</p>
      </body>
    </div>
  );
}

export default App;
