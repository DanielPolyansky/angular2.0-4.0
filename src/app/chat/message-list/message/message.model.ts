export class Message {

    public content: string;
    public username: string;
    public date: Date;
    public isIncome: boolean;    

    constructor(content: string, username: string, date: Date, isIncome: boolean){
        this.content = content;
        this.username = username;
        this. date = date;
        this.isIncome = isIncome;
    }
}
