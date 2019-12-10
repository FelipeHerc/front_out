import { combineReducers } from 'redux';
import { reducer as person } from './getPerson';
import { reducer as notebook } from './getNotebook';
import { reducer as cel } from './getCel';
import { reducer as chip } from './getChip';
import { reducer as ownership } from './getOwnership';
import { reducer as company } from './getCompany';
import { reducer as sector } from './getSector';
import { reducer as stat } from './getStat';
import { reducer as equip } from './getEquip';
import { reducer as city } from './getCity';

export const rootReducer = combineReducers({ person, notebook, chip, cel, ownership, company, sector, stat, equip, city });
