import { combineReducers } from 'redux';
import { reducer as person } from './getPerson';
import { reducer as notebook } from './getNotebook';
import { reducer as cel } from './getCel';
import { reducer as chip } from './getChip';

export const rootReducer = combineReducers({ person, notebook, chip, cel });
