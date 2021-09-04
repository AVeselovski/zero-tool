import EventItem from "./EventItem";

function EventList(props) {
  return (
    <div>
      {props.events.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          image={event.image}
          title={event.title}
          address={event.address}
        />
      ))}
    </div>
  );
}

export default EventList;
