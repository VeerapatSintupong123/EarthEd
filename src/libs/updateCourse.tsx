export default async function UpdateCourse(
  title: string,
  description: string,
  image: string,
  video: string,
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
      title: title,
      description: description,
      image: image,
      video: video,
    }),
  });

  if (!response.ok) throw new Error("Failed to update");

  const lastRes = await response.json();
  return lastRes;
}
