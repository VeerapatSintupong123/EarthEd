import { Alert } from "../../interface";

export default async function UpdateAlert(
  alert: Array<Alert>,
  id: string,
  token: string
) {
  const response = await fetch(`${process.env.BACKEND_URL}/course/${id}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      alert: alert,
    }),
  });

  if (!response.ok) throw new Error("Failed to update");

  const lastRes = await response.json();
  return lastRes;
}
