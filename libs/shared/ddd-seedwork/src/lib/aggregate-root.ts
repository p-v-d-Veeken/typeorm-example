import { DbEntity } from './db-entity';

export abstract class AggregateRoot extends DbEntity {}
export type WithoutAggregateRootProps<T> = Omit<T, keyof Omit<AggregateRoot, 'id'>>;
