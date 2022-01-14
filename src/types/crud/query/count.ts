import { DSO } from '../../dso';
import { QueryOptions, StateMachineCRUD } from '../config';

export type CountAll = StateMachineCRUD<number, QueryOptions>;

export type Count<E = any> = StateMachineCRUD<
  number,
  { filters?: DSO<E>; options?: QueryOptions }
>;
