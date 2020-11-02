import React, { useState } from 'react';
import ReactDOM from 'react-dom'


import { 
    LogInForm,
    Header,
    Footer
 } from './components';

const App = () => {
    const [hasAccount, setHasAccount] = useState(null);
    const [user, setUser] = useState(null);
    const [userList, setUserList] = useState([]);

    return <div className='app'>
        <Header setHasAccount={ setHasAccount } />
        <Footer />
        <LogInForm hasAccount={ hasAccount }
                   setHasAccount={ setHasAccount }
                   user={ user }
                   setUser={ setUser } />
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
)