import React, { useEffect } from "react";
import Dashboard from "./views/Dashboard/Dashboard";
import store from './views/Module/Authentication/store';
import { Provider } from 'react-redux';
import { setAuthToken } from './views/Module/Authentication/utils/setAuthToken'
import { loadUser } from './views/Module/Authentication/action/auth'


if (localStorage.token) {
  console.log("log token", localStorage.token)
  setAuthToken(localStorage.token)
}
const App = () => {
  useEffect(() => {
    console.log("loadUser first")
    store.dispatch(loadUser())
  }, [])
  return (
    <div>
      <Provider store={store}>
        <Dashboard />
      </Provider>

    </div>
  );
};

export default App;
