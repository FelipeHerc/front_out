import { combineReducers } from 'redux';
import { reducer as person } from './getPerson';
import { reducer as notebook } from './getNotebook';
import { reducer as cel } from './getCel';
import { reducer as chip } from './getChip';
import { reducer as possesion } from './getPossesion';
import { reducer as company } from './getCompany';
import { reducer as sector } from './getSector';
import { reducer as stat } from './getStat';

export const rootReducer = combineReducers({ person, notebook, chip, cel, possesion, company, sector, stat });
