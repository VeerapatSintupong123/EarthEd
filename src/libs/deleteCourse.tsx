export default async function DeleteCourse(id: string, token: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/course/${id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error("Failed to delete");

  const lastRes = await response.json();
  return lastRes;
}
