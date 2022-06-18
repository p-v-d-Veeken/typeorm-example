import { DomainEvent } from './events/domain-event';
import { AggregateRoot } from './aggregate-root';

class TestEntity extends AggregateRoot {
    constructor() {
        super();
    }

    triggerDomainEvent() {
        this.addDomainEvent(new TestDomainEvent());
    }
}

class TestDomainEvent extends DomainEvent {
    constructor() {
        super(TestDomainEvent.name);
    }
}

describe('TestEntity', () => {
    describe('createTestEntity', () => {
        it('should return an initialized user object', () => {
            const testEntity = new TestEntity();
            const regex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

            expect(testEntity.id).not.toBeUndefined();
            expect(testEntity.id).toMatch(regex);
            expect(testEntity.domainEvents).toHaveLength(0);
        });
        it('should register domain event', () => {
            // Arrange
            const testEntity = new TestEntity();

            // Act
            testEntity.triggerDomainEvent();

            // Assert
            expect(testEntity.domainEvents.length).toBe(1);
            expect(testEntity.domainEvents[0]).toBeInstanceOf(TestDomainEvent);
        });
    });
});
