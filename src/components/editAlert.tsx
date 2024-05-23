import Swal from "sweetalert2";
import { Alert } from "../../interface";

export default function EditAlert({
  alerts,
  id,
  token,
}: {
  alerts: Array<Alert>;
  id: string;
  token: string;
}) {
  const editAlert = async (alertToDelete: Alert) => {
    const choicesHtml = alertToDelete.choice
      .map((ch, index) => `<li>${index + 1}. ${ch}</li>`)
      .join("");

    Swal.fire({
      title: "<strong>Alert Details</strong>",
      html: `
        <div style="text-align: center;">
          <p><strong>Type:</strong> ${alertToDelete.type}</p>
          <p><strong>Time:</strong> ${alertToDelete.time}</p>
          <p><strong>Question:</strong> ${alertToDelete.question}</p>
          <p><strong>Choices:</strong></p>
          <ul style="padding-left: 20px;">
            ${choicesHtml}
          </ul>
          <p><strong>Answer:</strong> ${
            alertToDelete.answer ? alertToDelete.answer : "N/A"
          }</p>
          <p><strong>Reason:</strong> ${
            alertToDelete.reason ? alertToDelete.reason : "N/A"
          }</p>
        </div>
      `,
      icon: "info",
      confirmButtonText: "Delete",
      confirmButtonColor: "#e74c3c",
      cancelButtonText: "Back",
      cancelButtonColor: "#3498db",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const updatedAlerts = alerts.filter((alert) => alert !== alertToDelete);

        try {
          const response = await fetch("/api/course/updateAlert", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              alert: updatedAlerts,
              id: id,
              token: token,
            }),
          });

          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "The alert has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 2000,
            }).then(() => {
              window.location.href = `/learn/${id}/edit`;
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "There was an error deleting the alert.",
              icon: "error",
              showConfirmButton: false,
              timer: 2000,
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an error deleting the alert.",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  const sortedAlerts = [...alerts].sort((a, b) => {
    if (a.time < b.time) return -1;
    if (a.time > b.time) return 1;
    return 0;
  });

  return (
    <div className="flex flex-col items-center gap-y-3">
      {sortedAlerts.map((alert, index) => (
        <div
          key={index}
          className="bg-white shadow-md w-full text-center p-5 border-2 rounded-md"
        >
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-x-2">
              <h1 className="font-bold">Type: {alert.type}</h1>
              <h1 className="font-bold">Time: {alert.time}</h1>
              <h1 className="font-bold">Question: {alert.question}</h1>
            </div>
            <div>
              <button
                className="bg-blue-500 text-white p-3 rounded-md w-full font-semibold 
                  active:scale-75 transition-all hover:bg-blue-600"
                onClick={() => editAlert(alert)}
              >
                View
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
