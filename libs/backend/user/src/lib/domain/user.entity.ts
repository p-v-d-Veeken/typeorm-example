import { Column, Entity } from 'typeorm';
import { AggregateRoot } from '@typeorm-example/shared/ddd-seedwork';

@Entity()
export class User extends AggregateRoot {
  @Column()
  public name: string;

  constructor(name: string) {
    super();
    this.name = name;
  }
}
