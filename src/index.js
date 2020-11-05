import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    Link,
    NavLink
  } from 'react-router-dom';


import { 
    LogIn,
    SignUp,
    Header,
    Welcome,
    Footer
 } from './components';

const App = () => {

    const [currentUser, setCurrentUser] = useState('');
    const [userList, setUserList] = useState([]);

    return <div className='app'>
        <Header  />
        {
            !currentUser
                ? <Switch>
                    <Route path='/login'>
                        <LogIn setCurrentUser={ setCurrentUser }
                               currentUser={ currentUser }
                               userList={ userList }/>
                    </Route>
                    <Route path='/signup'>
                        <SignUp setCurrentUser={ setCurrentUser }
                                setUserList={ setUserList }
                                currentUser={ currentUser } />
                    </Route>
                    <Route path='/'>
                    <h2>
                        Please Log in or Sign up to continue
                    </h2>
                    <NavLink to="/login" activeClassName="current">Log In</NavLink>
                    <NavLink to="/signup" activeClassName="current">Sign Up</NavLink >
                </Route>
                </Switch>
            : <Switch>
                <Welcome />
            </Switch>
        }
        <Footer />
    </div>
}

ReactDOM.render(
    <Router>
    <App />
    </Router>,
    document.getElementById('app')
)