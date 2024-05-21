import Swal from "sweetalert2";

export const ValidAdd = (
    subject:string,title:string,chapter:string,desciption:string,last:string,image:string,video:string )=>{
    if (!subject || !title || !chapter || !desciption) {
        Swal.fire({
          title: "Invalid Input",
          text: "Please provide information",
          icon: "error",
          timer: 2000,
        });
        return false;
      }
  
      if (subject.match("Select Subject")) {
        Swal.fire({
          title: "Invalid Subject",
          text: "Please select subject",
          icon: "error",
          timer: 2000,
        });
        return false;
      }
  
      if (parseInt(chapter) < parseInt(last)) {
        Swal.fire({
          title: "Invalid Chapter",
          text: "Please add new chapter",
          icon: "error",
          timer: 2000,
        });
        return false;
      }

    return true;
}

export const ValidRegister = (
  email:string,
  name:string,
  tel:string,
  password:string,
  rePass:string,
  fullName:string,
  gender:string,
  age:string,
  schoolName:string,
  schoolProvince:string,
  schoolLevel:string)=>{

    if (
      !email ||
      !name ||
      !tel ||
      !password ||
      !rePass ||
      !fullName ||
      !gender ||
      !age ||
      !schoolName ||
      !schoolProvince ||
      !schoolLevel
    ) {
      Swal.fire({
        title: "Invalid Input",
        text: "Please provide information",
        icon: "error",
        timer: 2000,
      });
      return false;
    }

    if (tel.length !== 10) {
      Swal.fire({
        title: "Invalid Telephone Number",
        text: "Telephone Number must be 10 digits.",
        icon: "error",
        timer: 2000,
      });
      return false;
    }

    if (password.length < 8 || rePass.length < 8) {
      Swal.fire({
        title: "Invalid Password",
        text: "Password must be at least 8 characters long.",
        icon: "error",
        timer: 2000,
      });
      return false;
    }

    if (gender.match("Select your gender")) {
      Swal.fire({
        title: "Invalid gender",
        text: "Please select gender",
        icon: "error",
        timer: 2000,
      });
      return false;
    }

    if (parseInt(age) < 0 || parseInt(age) > 100) {
      Swal.fire({
        title: "Invalid Age",
        text: "Age is not in range (0-100)",
        icon: "error",
        timer: 2000,
      });
      return false;
    }

    if (!password.match(rePass)) {
      Swal.fire({
        title: "Invalid Password",
        text: "Password is not match",
        icon: "error",
        timer: 2000,
      });
      return false;
    }
    return true;
  }