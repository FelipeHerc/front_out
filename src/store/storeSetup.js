import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { clientMiddleware } from './middlewares';
import axios from 'axios';

const client = axios.create({
  headers: {
    'X-User-Token': localStorage.getItem('user-token'),
    'X-User-Email': localStorage.getItem('user-email')
  }
})

const compose = composeWithDevTools(applyMiddleware(thunk, clientMiddleware(client), logger));

export const store = createStore( rootReducer, compose );
