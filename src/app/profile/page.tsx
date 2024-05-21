"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { User } from "../../../interface";
import Swal from "sweetalert2";
import { CircularProgress } from "@mui/material";

export default function Profile() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [tel, setTel] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolProvince, setSchoolProvince] = useState("");
  const [schoolLevel, setSchoolLevel] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMe = async () => {
      const token = session?.user.token;
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
          setEmail(data.email);
          setName(data.name);
          setTel(data.telephone_number);
          setFullName(data.fullName);
          setAge(data.age);
          setGender(data.gender);
          setSchoolName(data.schoolName);
          setSchoolProvince(data.schoolProvince);
          setSchoolLevel(data.schoolLevel);
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
      } finally {
        setLoading(false);
      }
    };

    if (session) {
      getMe();
    }
  }, [session]);

  const save = async () => {
    if (
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
      return null;
    }

    if (gender.match("Select your gender")) {
      Swal.fire({
        title: "Invalid gender",
        text: "Please select gender",
        icon: "error",
        timer: 2000,
      });
      return null;
    }

    if (parseInt(age) < 0 || parseInt(age) > 100) {
      Swal.fire({
        title: "Invalid Age",
        text: "Age is not in range (0-100)",
        icon: "error",
        timer: 2000,
      });
      return null;
    }

    try {
      const token = session?.user.token;
      const id = session?.user._id;
      const response = await fetch(`/api/updateUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName,
          gender: gender,
          age: age,
          schoolName: schoolName,
          schoolProvince: schoolProvince,
          schoolLevel: schoolLevel,
          token: token,
          id: id,
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Update Successful",
          text: "User updates informations",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: "Fail to Update",
          text: "Something went wrong",
          timer: 2000,
          icon: "error",
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Fail to Update",
        text: "Something went wrong",
        timer: 2000,
        icon: "error",
        showConfirmButton: false,
      });
    }
  };

  return (
    <main className="flex flex-col items-center min-h-[100vh] p-3 overflow-hidden bg-slate-200">
      <h1 className="text-3xl font-semibold mb-6 mt-5">Profile</h1>
      <small className="-mt-5 mb-6 text-lg">Hello! Geophilic</small>
      <div
        className="z-10 px-7 py-5 shadow border border-gray-300 space-y-10 bg-white rounded-xl 
        flex flex-col w-full md:w-4/5 lg:w-4/5 xl:w-3/6"
        style={{ boxShadow: "rgb(38, 57, 77) 0px 20px 30px -10px" }}
      >
        <div className="flex flex-col items-center -mb-4">
          <h1 className="text-3xl font-bold">EarthEd</h1>
          <small className="text-red-500 font-bold">
            Exploring the world, One lesson at a time
          </small>
          <hr className="w-4/5 h-1 bg-black mt-2 rounded-xl" />
        </div>

        {loading ? (
          <div className="flex flex-col items-center">
            <CircularProgress />
          </div>
        ) : (
          <>
            <div>
              <div className="flex flex-row space-x-3 w-full">
                <label htmlFor="email" className="font-bold text-xl">
                  Email
                </label>
                <h1 className="text-xl">{email}</h1>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-5 mt-2">
                <div className="flex flex-row space-x-3 w-full sm:w-1/3 md:w-2/5 lg:w-2/5">
                  <label htmlFor="name" className="font-bold text-xl">
                    Name
                  </label>
                  <h1 className="text-xl">{name}</h1>
                </div>
                <div className="flex flex-row space-x-3 w-full">
                  <label htmlFor="tel" className="font-bold text-xl">
                    Telephone Number
                  </label>
                  <h1 className="text-xl">{tel}</h1>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-5 mt-8">
                <div className="flex flex-col w-full space-y-3 sm:w-3/5 md:w-2/5 lg:w-3/5">
                  <label htmlFor="text" className="font-bold text-xl">
                    Personal Name
                  </label>
                  <input
                    value={fullName}
                    placeholder="Full Name"
                    className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => {
                      setFullName(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col mb-5 space-y-3 w-full sm:w-2/5 md:w-3/4 lg:w-3/5">
                  <label htmlFor="school-name" className="font-bold text-xl">
                    School Name
                  </label>
                  <input
                    value={schoolName}
                    placeholder="School Name"
                    className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => {
                      setSchoolName(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="flex flex-col w-full space-y-3 sm:w-3/5 md:w-2/5 lg:w-3/5">
                  <label htmlFor="gender" className="font-bold text-xl">
                    Gender
                  </label>
                  <select
                    value={gender}
                    className="text-xl text-black font-semibold placeholder:text-xl border-2 
                focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <option defaultValue="">Select your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Others</option>
                  </select>
                </div>
                <div className="flex flex-col mb-5 space-y-3 w-full sm:w-2/5 md:w-3/4 lg:w-3/5">
                  <label
                    htmlFor="school-province"
                    className="font-bold text-xl"
                  >
                    School Province
                  </label>
                  <input
                    value={schoolProvince}
                    placeholder="School Province"
                    className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => {
                      setSchoolProvince(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:space-x-5">
                <div className="flex flex-col w-full space-y-3 sm:w-3/5 md:w-2/5 lg:w-3/5">
                  <label htmlFor="age" className="font-bold text-xl">
                    Age
                  </label>
                  <input
                    value={age}
                    placeholder="Age"
                    className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                    type="number"
                    autoComplete="off"
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                  />
                </div>
                <div className="flex flex-col mb-5 space-y-3 w-full sm:w-2/5 md:w-3/4 lg:w-3/5">
                  <label htmlFor="school-level" className="font-bold text-xl">
                    School Level
                  </label>
                  <input
                    value={schoolLevel}
                    placeholder="School Level"
                    className="text-xl text-black font-semibold placeholder:text-xl border-2 
              focus:outline-none py-2 px-5 border-gray-300 rounded-md focus:border-blue-500"
                    type="text"
                    autoComplete="off"
                    onChange={(e) => {
                      setSchoolLevel(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <button
                  className="bg-indigo-500 text-white py-3 rounded-md w-full font-semibold 
          active:scale-75 transition-all hover:bg-indigo-600"
                  onClick={save}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
