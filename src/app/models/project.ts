export class Project {
    public constructor (id: string, title: string) {
        this.id = id;
        this.title = title;
        this.archived = false;
    }

    public id: string;
    public title: string;
    public archived: boolean;
    public deleted: boolean;
    public lastUpdated: Date;
    public ClientLastUpdate: Date;
}