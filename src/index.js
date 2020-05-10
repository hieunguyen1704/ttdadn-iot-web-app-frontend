import { render } from "react-dom";
import React from "react";
import App from "./App";

render(<App />, document.getElementById("root"));
import { Provider } from 'react-redux';
import store from './views/Module/Authentication/store';

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);