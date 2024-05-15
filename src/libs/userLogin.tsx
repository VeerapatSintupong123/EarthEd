export default async function userLogIn(email: string, password: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) throw new Error("Failed to Sign-In");

  return await response.json();
}
