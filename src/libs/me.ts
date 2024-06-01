import Swal from "sweetalert2";
import { User } from "../../interface";

export const getMe = async (token:string) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        const data: User = res.data;
        if (data.course[0].payment.match("unfinished") && data.role.match("user")) return undefined; 
        else return data.course[0];
      } else {
        Swal.fire({
          title: "Fetch Fail",
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
          text: "Something went wrong",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Fetch Fail",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
        text: "Something went wrong",
      });
    }
  };