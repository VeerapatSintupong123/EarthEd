import Swal from "sweetalert2";
import { Alert } from "../../interface";


export const Answering = (alert: Alert,email:string,subject:string,Sub:string, resumeVideo: () => void) => {
  Swal.fire({
    icon: "info",
    title: `${alert.type} Question`,
    text: alert.question,
    input: "text",
    inputPlaceholder: "Enter your answer here",
    confirmButtonText: "Submit",
    showCancelButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    inputValidator: (value) => {
      if (!value) {
        return "You need to answer the question!";
      }
      return null;
    },
  }).then((result) => {
    if (result.isConfirmed) {
      saveAnswer(alert,result.value,email,subject,Sub);
      resumeVideo();
    }
  });
};

export const Two_MCQ_Answer = (alert: Alert,email:string,subject:string,Sub:string, resumeVideo: () => void) => {
  Swal.fire({
    icon: "info",
    title: `${alert.type} Question`,
    text: alert.question,
    input: "radio",
    inputOptions: {
      1: alert.choice[0],
      2: alert.choice[1]
    },
    confirmButtonText: "Submit",
    showCancelButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    inputValidator: (value) => {
      if (!value) {
        return "You need to select an answer!";
      }
      return null;
    },
  }).then((result) => {
    if (result.isConfirmed) {
        saveAnswer(alert,result.value,email,subject,Sub);
      if (result.value === alert.answer) {
        Swal.fire("Correct!", "Your answer is correct.", "success").then(()=>{
            resumeVideo();
        });
      } else {
        Swal.fire("Incorrect!", `The correct answer is ${alert.answer}. ${alert.reason}`, "error").then(()=>{
            resumeVideo();
        });
      }
    }
  });
};

export const Two_MCQ_NoAnswer = (alert: Alert,email:string,subject:string,Sub:string, resumeVideo: () => void) => {
    Swal.fire({
      icon: "info",
      title: `${alert.type} Question`,
      text: alert.question,
      input: "radio",
      inputOptions: {
        1: alert.choice[0],
        2: alert.choice[1]
      },
      confirmButtonText: "Submit",
      showCancelButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      inputValidator: (value) => {
        if (!value) {
          return "You need to select an answer!";
        }
        return null;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        saveAnswer(alert,result.value,email,subject,Sub);
        resumeVideo();
      }
    });
  };

export const Four_MCQ = (alert: Alert,email:string,subject:string,Sub:string, resumeVideo: () => void) => {
  Swal.fire({
    icon: "info",
    title: `${alert.type} Question`,
    text: alert.question,
    input: "radio",
    inputOptions: {
      1: alert.choice[0],
      2: alert.choice[1],
      3: alert.choice[2],
      4: alert.choice[3]
    },
    confirmButtonText: "Submit",
    showCancelButton: false,
    allowOutsideClick: false,
    allowEscapeKey: false,
    inputValidator: (value) => {
      if (!value) {
        return "You need to select an answer!";
      }
      return null;
    },
  }).then((result) => {
    if (result.isConfirmed) {
        saveAnswer(alert,result.value,email,subject,Sub);
      if (result.value === alert.answer) {
        Swal.fire("Correct!", "Your answer is correct.", "success").then(()=>{
            resumeVideo();
        });
      } else {
        Swal.fire("Incorrect!", `The correct answer is ${alert.answer}. ${alert.reason}`, "error").then(()=>{
            resumeVideo();
        });
      }
    }
  });
};

const getDateNow =()=>{
    const saveDate = Date.now();
    const date = new Date(saveDate);
    return date;
};

const saveAnswer = async (alert: Alert, userAnswer: string, email:string, subject:string, Sub:string) => {
    const data = `\n${getDateNow()},${subject},${Sub},,,
    ${alert.type},${alert.question},${alert.answer},${email},${userAnswer}`

    try {
        const response = await fetch("/api/file/saveData",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({data:data}),
        })
    } catch (error) {
        console.error(error);
    }
  }