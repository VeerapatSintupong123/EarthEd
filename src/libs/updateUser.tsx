import { CourseStatus } from "../../interface";

export default async function UpdateUser(
  fullName: string,
  gender: string,
  age: string,
  schoolName: string,
  schoolProvince: string,
  schoolLevel: string,
  course: Array<CourseStatus>,
  token: string,
  id: string
) {
  const response = await fetch(`${process.env.BACKEND_URL}/auth/${id}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullName: fullName,
      gender: gender,
      age: age,
      schoolName: schoolName,
      schoolProvince: schoolProvince,
      schoolLevel: schoolLevel,
      course: course,
    }),
  });

  if (!response.ok) throw new Error("Failed to Update");

  const lastRes = await response.json();
  return lastRes;
}
