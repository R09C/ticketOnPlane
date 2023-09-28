import{IsEmail}from 'class-validator';

export class ChangeProfileDto{
    @IsEmail()
    readonly email:string;
}
