import { Event } from './event';

export abstract class DomainEvent extends Event {
    protected constructor(name: string) {
        super(name);
    }
}
