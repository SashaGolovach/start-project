import React, {FC} from 'react';

const App: FC = () => {
  const onLogOut = () => {
    console.log('log out')
    // signoutRedirect()
  }

  const accessToken = localStorage.getItem('accessToken');
  const welcomeMessage = `WELCOME ON HOME PAGE -> ${accessToken}`;

  return <div>
    <p>{welcomeMessage}</p>
    <button type="button" onClick={onLogOut}>Log out</button>
  </div>
}

export default App;