export default async function AddCourse(
  subject: string,
  title: string,
  chapter: string,
  description: string,
  image: string,
  video: string,
  token: string
) {
  const response = await fetch(`${process.env.BACKEND_URL}/course`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: subject,
      title: title,
      chapter: chapter,
      description: description,
      image: image,
      video: video,
    }),
  });

  if (!response.ok) throw new Error("Failed to add");

  const lastRes = await response.json();
  return lastRes;
}
