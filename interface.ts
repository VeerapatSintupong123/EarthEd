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
    course: Array<CourseStatus>,
}

export interface Course {
    _id: string;
    subject: string;
    title:string;
    chapter:string;
    description:string;
    image:string;
    video:string;
    alert:Array<Alert>;
    __V:string;
}  

export interface Alert{
    type:string;
    time:string;
    question:string;
    choice:Array<String>;
    answer:string;
    reason:string;
}

export interface CourseStatus{
    subject: string;
    payment: string;
    chapter: string;
    current: string;
}

export interface CSVRecord {
    question: string;
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    answer: string;
    reason: string;
}