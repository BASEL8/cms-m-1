import React from "react";
import Main from "./components/Main.jsx";
import Authors from "./components/Authors.jsx";
import Author from "./components/Author";
import Article from "./components/Article.jsx";
import Newspapers from "./components/Newspapers.jsx";
import Newspaper from "./components/Newspaper.jsx";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <div className='p-3 d-flex flex-column' style={{ height: "100vh" }}>
      <header>
        <h1 className='text-center'> news </h1>
      </header>
      <Router>
        <ul className='nav pt-3 pb-3 pl-0'>
          <li className='nav-item'>
            <Link className='nav-link pl-0 text-secondary' to='/'>
              Articles
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link text-secondary' to='/authors'>
              Authors
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link text-secondary' to='/newspapers'>
              Newspapers
            </Link>
          </li>
        </ul>
        <Route path='/' exact component={Main} />
        <Route path='/authors' exact component={Authors} />
        <Route path='/newspapers' exact component={Newspapers} />
        <Route path='/articles/:id' exact component={Article} />
        <Route path='/authors/:id' exact component={Author} />
        <Route path='/newspapers/:id' exact component={Newspaper} />
      </Router>
    </div>
  );
};

export default App;
