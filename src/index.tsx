import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {setupStore} from "./store/store";
import 'antd/dist/antd.css'
import "antd/es/calendar/style/index.css"
import "antd/lib/calendar/style/index.css"
import "./utilits/firebase_utilits"

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store =setupStore()
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
