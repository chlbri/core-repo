import { StateCRUD, StateCRUDArgs } from '../types/_crud';
export declare function createCRUDMAchine<C = any, E = any, TF = any>({ src, id, status, }: StateCRUDArgs<C, E, TF>): StateCRUD<C, E>;
