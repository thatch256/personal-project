import React from 'react';
import './reset.css'
import './App.css';
import routes from './routes'
import Header from './Components/Header'

function App() {
  return (
    <div className="App">
      <div><Header />
      </div>
      <div className='routes'>
      {routes}
      </div>
    </div>
  );
}

export default App;
