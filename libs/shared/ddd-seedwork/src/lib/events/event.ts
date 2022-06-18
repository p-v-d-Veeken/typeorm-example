export abstract class Event {
    creationDateTime: Date;
    name: string;

    protected constructor(name: string) {
        this.creationDateTime = new Date();
        this.name = name;
    }
}
