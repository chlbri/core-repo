export * from './db';
export * from './resolver';
// export * from './mutation';
export * from './read';
import { interpret } from 'xstate';
import { Entity } from '../../entities';
import {
  Count,
  CountAll,
  StateMachineCRUD,
  WithDeepID,
} from '../../types';
import { count, countAll } from './read';

export default class ArrayDB<E extends Entity = Entity> {
  constructor(private db: WithDeepID<E>[] = []) {
    this.countAll = countAll(db);
    this.count = count(db);
  }
  rinitDB() {
    this.db.length = 0;
  }
  readonly countAll: CountAll;
  readonly count: Count<E>;
  interpret(
    machine: StateMachineCRUD,
    devTools: Exclude<
      Parameters<typeof interpret>[1],
      undefined
    >['devTools'],
  ) {
    return interpret(machine, {
      devTools,
    });
  }
}
