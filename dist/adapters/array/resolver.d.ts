import { SearchOperation, DataSearchOperations } from '../..';
export declare function inStreamSearchAdapterKey<T>(op: SearchOperation<T>): (arg: T) => boolean;
export declare function inStreamSearchAdapter<T>(filter?: DataSearchOperations<T>): (val: any) => boolean;
