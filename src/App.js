import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home'
import AddEdit from './pages/AddEdit'
import View from './pages/View'
import About from './pages/About'
import Header from './components/Header';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  
  return (
    <Router>
      <div className="App">
        <Header />
        <ToastContainer position="top-center" />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/add' component={AddEdit} />
        <Route path='/update/:id' component={AddEdit} />
        <Route path='/view/:id' component={View} />
        <Route path='/about' component={About} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
