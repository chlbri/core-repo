import { DSO } from '../../dso';
import { QueryOptions, StateMachineCRUD } from '../config';
export declare type CountAll = StateMachineCRUD<number>;
export declare type Count<E = any> = StateMachineCRUD<number, {
    filters: DSO<E>;
    options?: QueryOptions;
}>;
