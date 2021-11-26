import { getLiteralValues } from '../functions';
import { actionsSchema, stateSchema } from '../schemas/strings/machines';

export const STATES = getLiteralValues(stateSchema);

export const ACTIONS = getLiteralValues(actionsSchema);
