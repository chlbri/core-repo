import { MachineArgsCRUD, StateMachineCRUD } from '../types/crud/config';
export declare function createCRUDMachine<C = any, E = any>({ config, options, status, }: MachineArgsCRUD<C, E>): StateMachineCRUD<C, E>;
