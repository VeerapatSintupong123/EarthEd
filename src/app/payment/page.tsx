"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CourseStatus, User } from "../../../interface";
import { CircularProgress } from "@mui/material";

interface SlipOkData {
  transDate?: string;
  transTime?: string;
  amount?: number;
}

export default function Payment() {
  const { data: session } = useSession();
  const [slipOkData, setSlipOkData] = useState<SlipOkData | null>(null);
  const [files, setFiles] = useState<File | null>(null);
  const [verify, setVerify] = useState<boolean>(false);
  const [courseStatus, setCourseStatus] = useState<CourseStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const convertDate = (date: string) => {
    return `${date.substring(4, 6)}/${date.substring(6, 8)}/${date.substring(
      0,
      4
    )}`;
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!files) {
      Swal.fire({
        title: "No file selected",
        text: "Please select a file to upload.",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const formData = new FormData();
    formData.append("files", files);
    formData.append("log", "true");
    formData.append("amount", "1999");

    try {
      const res = await fetch(process.env.SLIPOK_ENDPOINT as string, {
        method: "POST",
        headers: {
          "x-authorization": process.env.SLIPOK_KEY as string,
        },
        body: formData,
      });

      const data = await res.json();
      setSlipOkData(data.data);

      if (res.ok) {
        setVerify(true);
      } else {
        setVerify(false);
        let errorMessage = "Payment Failed";
        if (data.code === 1012) {
          errorMessage = "Old slip";
        } else if (data.code === 1013) {
          errorMessage = "The transfer amount is incorrect.";
        }
        Swal.fire({
          title: errorMessage,
          text: errorMessage,
          icon: "error",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }
    } catch (error) {
      setVerify(false);
      Swal.fire({
        title: "Payment Failed",
        text: (error as Error).message,
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    try {
      const token = session?.user.token;
      const id = session?.user._id;
      const updatedStatus = { ...courseStatus, payment: "finished" };

      const response = await fetch(`/api/updateUser`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          course: [updatedStatus],
          id: id,
        }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Payment Successful",
          text: "Your payment has been processed successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 2000,
        });
      } else {
        Swal.fire({
          title: "Update Failed",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "Ok",
        }).then((res) => {
          if (res.isConfirmed) {
            window.location.href = "/payment";
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: (error as Error).message,
        icon: "error",
        confirmButtonText: "Ok",
      }).then((res) => {
        if (res.isConfirmed) {
          window.location.href = "/payment";
        }
      });
    }
  };

  useEffect(() => {
    const fetchCourseStatus = async () => {
      const token = session?.user.token;
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          const data: User = result.data;
          setCourseStatus(data.course[0]);
        } else window.location.href = "/";
      } catch (error) {
        window.location.href = "/";
      } finally {
        setLoading(false);
      }
    };
    if (session) {
      fetchCourseStatus();
    }
  }, [session]);

  return (
    <main className="flex flex-col items-center min-h-[100vh] p-3 overflow-hidden bg-slate-200">
      <h1 className="text-3xl font-semibold mb-6 mt-5">Payment</h1>
      <small className="-mt-5 mb-6 text-lg">Buy a course</small>
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
          <div className="mt-5 flex flex-col items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col gap-y-3">
            <div className="bg-slate-200 rounded-md p-3">
              <h1 className="text-center font-semibold text-lg">
                Siam Commercial Bank (SCB)
              </h1>
              <h1 className="text-center font-semibold text-lg">
                636-240761-9
              </h1>
              <h1 className="text-center font-normal text-lg">
                นาย มาฬุต วงค์เตปิน
              </h1>
              <h1 className="text-center font-normal text-lg">
                ปกติ 2,500 บาท ลดเหลือ 1,999 บาท
              </h1>
              <div className="flex flex-col items-center mt-3 mb-3 p-2">
                <Image
                  alt="Qr-code"
                  src={
                    "https://drive.google.com/uc?export=download&id=1S0ngtjeI6_DALsqtdKua3AKFH5uY-BCj"
                  }
                  width={300}
                  height={380}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center">
                <label className="block mb-2 text-lg font-medium">
                  Upload your payment slip
                </label>
                <h1 className="text-red-500 font-bold text-center w-2/3">
                  Warning: Please verify the amount is 1,999฿ and ensure all
                  other details are correct before proceeding.
                </h1>
                <input
                  className="w-2/3 p-3 border border-gray-300 rounded-md mt-3 focus:outline-none 
            focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                />
              </div>
              <div className="flex justify-center mt-4">
                <button
                  className="bg-indigo-500 text-white p-3 rounded-md hover:bg-indigo-600 
                transition-all active:scale-75 w-2/3"
                  type="submit"
                >
                  Check Slip
                </button>
              </div>
              {files && (
                <div className="flex justify-center mt-4">
                  <img
                    src={URL.createObjectURL(files)}
                    alt="slip"
                    className="rounded-lg shadow-md"
                    width={300}
                  />
                </div>
              )}
              <hr className="my-4" />
              {slipOkData && (
                <div
                  className={`p-4 ${
                    verify ? "bg-green-100" : "bg-red-100"
                  } rounded-lg`}
                >
                  <h4
                    className={`text-lg font-bold ${
                      verify ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    Payment Details
                  </h4>
                  <p className="mt-2">
                    วันที่โอนเงิน: {convertDate(slipOkData.transDate as string)}
                  </p>
                  <p>เวลาที่โอนเงิน: {slipOkData.transTime} น.</p>
                  <p className="mb-3">จำนวนเงิน: {slipOkData.amount} บาท</p>
                  <Link
                    href={
                      verify
                        ? "/learn"
                        : "https://www.instagram.com/earthed.education"
                    }
                    className={`text-white p-2 rounded-md transition-all active:scale-75 text-center ${
                      verify
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {verify ? "Go to learn" : "Contact us"}
                  </Link>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
