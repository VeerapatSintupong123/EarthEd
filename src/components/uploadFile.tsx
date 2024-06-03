"use client";
import { useRef } from "react";
import Swal from "sweetalert2";

export default function ExamFile({ chapter }: { chapter: string }) {
  const fileInput = useRef<HTMLInputElement>(null);

  async function uploadFile(
    evt: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    evt.preventDefault();

    const file = fileInput?.current?.files?.[0];
    if (file) {
      const fileName: string = file.name;

      const fileExtension: string =
        fileName.split(".").pop()?.toLowerCase() || "";

      if (fileExtension === "csv") {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch("/api/file/upload", {
            method: "POST",
            body: formData,
          });

          const result = await response.json();
          if (response.ok && result.status === "success") {
            Swal.fire({
              title: "Upload Exam Successful",
              text: result.status,
              timer: 2000,
              showConfirmButton: false,
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Upload Exam Fail",
              text: result.status,
              timer: 2000,
              showConfirmButton: false,
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Upload Exam Fail",
            text: "File already exists",
            timer: 2000,
            showConfirmButton: false,
            icon: "error",
          });
        }
      } else {
        Swal.fire({
          title: "Invalid File Type",
          text: "Please upload a CSV file.",
          timer: 2000,
          showConfirmButton: false,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "No File Selected",
        text: "Please select a file to upload.",
        timer: 2000,
        showConfirmButton: false,
        icon: "warning",
      });
    }
  }

  async function downloadFile(fileName: string) {
    try {
      const response = await fetch(`/api/file/download?file=${fileName}`);
      if (!response.ok) {
        throw new Error("File not found");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      Swal.fire({
        title: "Download Exam Fail",
        text: "fail",
        timer: 2000,
        showConfirmButton: false,
        icon: "error",
      });
    }
  }

  return (
    <form className="flex flex-col gap-4 max-w-md mx-auto">
      <label className="flex flex-col">
        <span className="mb-1 font-semibold text-center">
          Upload a CSV file
        </span>
        <h1 className="text-red-500 text-center font-semibold">
          format name: Subject_Sub_Unit_Chapter.csv
        </h1>
        <input
          type="file"
          name="file"
          ref={fileInput}
          className="p-3 border border-gray-300 rounded-md mt-3 focus:outline-none 
          focus:border-blue-500 bg-gray-50 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
        />
      </label>
      <button
        type="submit"
        onClick={uploadFile}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 
        transition-all active:scale-75"
      >
        Submit
      </button>
      {chapter.match("No exam") ? (
        <></>
      ) : (
        <button
          type="button"
          onClick={() => downloadFile(`${chapter}`)}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600
        transition-all active:scale-75"
        >
          Download {chapter}
        </button>
      )}
    </form>
  );
}
