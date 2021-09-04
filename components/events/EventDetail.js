function EventDetail({ event }) {
  return (
    <>
      <img alt={event?.title} src={event?.image} />
      <h1 className="mb-2/4 mt-1">{event?.title}</h1>
      <p className="mb-2">{event?.description}</p>
      <address>{event?.address}</address>
    </>
  );
}

export default EventDetail;
