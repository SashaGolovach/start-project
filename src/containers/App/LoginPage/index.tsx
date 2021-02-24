import React, {FC} from 'react';
import { signinRedirect } from '../userService'

const App: FC = () => {
  const onLogIn = () => {
    console.log('log in')
    signinRedirect()
  }

  return <div><button type="button" onClick={onLogIn}>Log in</button></div>
}

export default App;