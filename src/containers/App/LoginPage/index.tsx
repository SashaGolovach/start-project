import React, {FC} from 'react';

const App: FC = () => {
  const onLogIn = () => {
    console.log('log in')
  }

  return <div><button type="button" onClick={onLogIn}>Log in</button></div>
}

export default App;