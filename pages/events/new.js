// zero-tool.com/events/new
import NewEventForm from "../../components/events/NewEventForm";
import { useRouter } from "next/router";

export default function NewEventPage() {
  const router = useRouter();

  async function addEventHandler(data) {
    const response = await fetch("/api/v1/events/new", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();
    console.log(responseData);

    router.replace("/events");
  }

  return (
    <div className="container">
      <div className="content">
        <NewEventForm onAddEvent={addEventHandler} />
      </div>
    </div>
  );
}
