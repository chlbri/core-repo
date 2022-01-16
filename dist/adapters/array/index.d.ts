export * from './db';
export * from './resolver';
export * from './read';
import { interpret } from 'xstate';
import { Entity } from '../../entities';
import { Count, CountAll, StateMachineCRUD, WithDeepID } from '../../types';
export default class ArrayDB<E extends Entity = Entity> {
    private db;
    constructor(db?: WithDeepID<E>[]);
    rinitDB(): void;
    readonly countAll: CountAll;
    readonly count: Count<E>;
    interpret(machine: StateMachineCRUD, devTools: Exclude<Parameters<typeof interpret>[1], undefined>['devTools']): import("xstate").Interpreter<import("../../types").TC<any, any>, any, import("../../types").TE<any>, import("../../types").TT<any, any>>;
}
