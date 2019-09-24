import { combineReducers } from 'redux';
import { reducer as person } from './getPerson';
import { reducer as example } from './example';

export const rootReducer = combineReducers({ person, example });
