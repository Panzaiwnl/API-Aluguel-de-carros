import { Column, CreateDateColumn, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";



export class UsersToken{

    @PrimaryColumn()
    id: string;

    @Column()
    refresh_token: string;

    @Column()
    user_id: string;

    @ManyToOne(()=> User)
    @JoinColumn({name: "user_id",})
    user: User;

    @Column()
    expires_date: Date;

    @CreateDateColumn()
    created_at: Date;


    constructor(){
        if(!this.id){
            this.id = uuidv4()
        }
    }

}

function uuidv4(): string {
    throw new Error("Function not implemented.");
}
