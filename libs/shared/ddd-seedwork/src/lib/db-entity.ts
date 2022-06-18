import * as uuid from 'uuid';
import { Column, PrimaryColumn } from 'typeorm';
import {DomainEvent} from "./events/domain-event";

export abstract class DbEntity {
    @PrimaryColumn({
        type: String,
        generated: false,
    })
    id: string;
    @Column({
        type: Date,
    })
    creationDateTime: Date;
    // tslint:disable-next-line:variable-name
    _domainEvents: DomainEvent[] = [];

    constructor() {
        this.id = uuid.v4();
        this.creationDateTime = new Date();
        this._domainEvents = [];
    }

    public equals(object?: DbEntity): boolean {
        if (!object) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!this.isEntity(object)) {
            return false;
        }
        if (this.constructor.name !== object.constructor.name) {
            return false;
        }

        return this.id === object.id;
    }

    isEntity = (v: unknown): v is DbEntity => v instanceof DbEntity;

    get domainEvents(): DomainEvent[] {
        return this._domainEvents;
    }

    protected addDomainEvent(domainEvent: DomainEvent): void {
        // Add the domain event to this aggregate's list of domain events
        this._domainEvents.push(domainEvent);
    }

    public clearEvents(): void {
        this._domainEvents.splice(0, this._domainEvents.length);
    }
}
