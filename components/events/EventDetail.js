import Image from "next/image";

function EventDetail({ event }) {
  return (
    <>
      <Image alt={event?.title} src={event?.image} height={720} width={1280} />
      <h1 className="mb-2/4 mt-1">{event?.title}</h1>
      <p className="mb-2">{event?.description}</p>
      <address>{event?.address}</address>
    </>
  );
}

export default EventDetail;
