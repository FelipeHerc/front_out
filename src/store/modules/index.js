import { combineReducers } from 'redux';
import { reducer as person } from './getPerson';
import { reducer as notebook } from './getNotebook';
import { reducer as example } from './example';

export const rootReducer = combineReducers({ person, notebook, example });
