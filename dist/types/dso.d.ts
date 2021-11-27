import { TypeOf, ZodLiteral, ZodTuple } from 'zod';
import { ARRAY_CLAUSES, COMMON_CLAUSES, EXIST_CLAUSES, LOGICAL_CLAUSES, NUMBER_CLAUSES, STRING_CLAUSES, TYPE_ALIASES } from '../schemas/strings/strings';
declare type inferUnion<T extends ZodTuple> = TypeOf<T>[number];
export declare type inferClause<T extends ZodTuple | ZodLiteral<any>, K extends T extends ZodTuple ? inferUnion<T> : TypeOf<T>, R = any> = {
    [key in K]: R;
};
export declare type Equals = inferClause<typeof COMMON_CLAUSES, '$eq'>;
export declare type NotEquals = inferClause<typeof COMMON_CLAUSES, '$ne'>;
export declare type ObjectIn<T = any> = inferClause<typeof COMMON_CLAUSES, '$in', T[]>;
export declare type ObjectNotIn<T = any> = inferClause<typeof COMMON_CLAUSES, '$nin', T[]>;
export declare type GreaterThan = inferClause<typeof NUMBER_CLAUSES, '$gt', number>;
export declare type GreaterThanOrEquals = inferClause<typeof NUMBER_CLAUSES, '$gte', number>;
export declare type LessThan = inferClause<typeof NUMBER_CLAUSES, '$lt', number>;
export declare type LessThanOrEquals = inferClause<typeof NUMBER_CLAUSES, '$lte', number>;
export declare type Modulo = inferClause<typeof NUMBER_CLAUSES, '$mod', number>;
export declare type StringContains = inferClause<typeof STRING_CLAUSES, '$cts', string>;
export declare type StartsWith = inferClause<typeof STRING_CLAUSES, '$sw', string>;
export declare type EndsWith = inferClause<typeof STRING_CLAUSES, '$ew', string>;
export declare type Language = 'da' | 'du' | 'en' | 'fi' | 'fr' | 'de' | 'hu' | 'it' | 'nb' | 'pt' | 'ro' | 'ru' | 'es' | 'sv' | 'tr';
export declare type RegEx = inferClause<typeof STRING_CLAUSES, '$regex', string | RegExp>;
export declare type TypeAliases = inferUnion<typeof TYPE_ALIASES>;
declare type ArrayHelper1<T extends any[]> = Partial<VSO<T[number]>> | T[number];
export declare type All<T extends any[] = any[]> = inferClause<typeof ARRAY_CLAUSES, '$all', ArrayHelper1<T>>;
export declare type ElementMatch<T extends any[] = any[]> = inferClause<typeof ARRAY_CLAUSES, '$em', ArrayHelper1<T>>;
export declare type Size = inferClause<typeof ARRAY_CLAUSES, '$size', number>;
export declare type ArrayClauses<T = any[]> = T extends any[] ? All<T> | ElementMatch<T> | Size : {};
export declare type ExistsProp = inferClause<typeof EXIST_CLAUSES, '$exists', true>;
export declare type NotExistsProp = inferClause<typeof EXIST_CLAUSES, '$exists', false>;
declare type VSOAny<T = any> = Equals & NotEquals & ObjectIn<T> & ObjectNotIn<T>;
declare type VSONumber = VSOAny<number> & GreaterThan & GreaterThanOrEquals & LessThan & LessThanOrEquals & Modulo;
declare type VSOString = VSOAny<string> & StringContains & StartsWith & EndsWith & RegEx;
export declare type ValueSearchOperations<T = string> = T extends number ? VSONumber : T extends string ? VSOString : VSOAny<T>;
export declare type VSO<T = any> = ValueSearchOperations<T>;
declare type LogH<T> = Partial<VSO<T> | LogicalClauses<T> | T>;
export declare type And<T = any> = inferClause<typeof LOGICAL_CLAUSES, '$and', LogH<T>[]>;
export declare type Not<T = any> = {
    $not: LogH<T>;
};
export declare type Nor<T = any> = inferClause<typeof LOGICAL_CLAUSES, '$nor', LogH<T>[]>;
export declare type Or<T = any> = inferClause<typeof LOGICAL_CLAUSES, '$or', LogH<T>[]>;
export declare type LogicalClauses<T = any> = And<T> | Not<T> | Nor<T> | Or<T>;
export declare type SearchOperation<K = any> = K extends string | number | bigint | boolean | any[] ? Partial<(NotExistsProp | ExistsProp) & VSO<K> & LogicalClauses<K> & ArrayClauses<K>> | K : {
    [key in keyof K]?: SearchOperation<K[key]>;
};
export declare type SO<K> = SearchOperation<K>;
export declare type ObjectSearchOperations<T = any> = {
    [key in keyof T]?: SearchOperation<T[key]>;
};
export declare type DataSearchOperations<T = any> = Not<T> | ObjectSearchOperations<T>;
export declare type OSO<T = any> = ObjectSearchOperations<T>;
export declare type DSO<T = any> = DataSearchOperations<T>;
export {};
