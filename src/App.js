import React, {useState, useEffect} from 'react'
import Header from './Header'
import Generos from './Generos'
import NovoGenero from './NovoGenero'
import EditarGenero from './EditarGenero'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

const Home = () => {
  return <h1>Home</h1>
}

function App() {
  const [data, setData] = useState({})
  useEffect(() => {    
  },[])
  return (
    <Router>
      <div>
        <Header />    
        <Route path='/' exact component={Home} />
        <Route path='/generos' exact component={Generos} />        
        <Route path='/generos/novo' exact component={NovoGenero} />        
        <Route path='/generos/:id' exact component={EditarGenero} />
      </div>
    </Router>
  );
}

export default App;
