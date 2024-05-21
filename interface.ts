export interface Course {
    _id: string;
    subject: string;
    title:string;
    chapter:string;
    description:string;
    image:string;
    video:string;
    alert:Alert;
    __V:string;
}  

export interface User{
    _id: string,
    name: string,
    telephone_number: string,
    email: string,
    role: string,
    fullName: string,
    gender: string,
    age: string,
    schoolName: string,
    schoolProvince: string,
    schoolLevel: string,
    geography: string,
}

export interface Alert{
    type:string;
    question:string;
    choice:Array<String>;
    answer:string;
    reason:string;
}