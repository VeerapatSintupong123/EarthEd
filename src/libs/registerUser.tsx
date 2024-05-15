export default async function RegisterUser(
  name: string,
  telephone_number: string,
  email: string,
  role: string,
  password: string,
  fullName: string,
  gender: string,
  age: string,
  schoolName: string,
  schoolProvince: string,
  schoolLevel: string
) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        telephone_number: telephone_number,
        email: email,
        role: role,
        password: password,
        fullName: fullName,
        gender: gender,
        age: age,
        schoolName: schoolName,
        schoolProvince: schoolProvince,
        schoolLevel: schoolLevel,
      }),
    }
  );

  if (!response.ok) throw new Error("Failed to Register");

  const lastRes = await response.json();
  return lastRes;
}
