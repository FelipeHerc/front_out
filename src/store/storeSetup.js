import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './modules';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { clientMiddleware } from './middlewares';
import axios from 'axios';

const client = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  }
})

const compose = composeWithDevTools(applyMiddleware(thunk, clientMiddleware(client), logger));

export const store = createStore( rootReducer, compose );
