import dbConnect from "../../../lib/dbConnect"; // won't be included on clientside
import Event from "../../../models/event"; // won't be included on clientside
import Head from "next/head";

import EventDetail from "../../../components/events/EventDetail";

function EventDetailsPage(props) {
  return (
    <>
      <Head>
        <title>{props.event.title}</title>
      </Head>
      <div className="container">
        <div className="content">
          <EventDetail event={props.event} />
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // needed for dynamic routes when using getStaticProps

  await dbConnect();

  const events = await Event.find({}).select({ _id: 1 });

  return {
    fallback: "blocking",
    paths: events.map((e) => ({ params: { eventId: e._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  // cannot use hooks in this function, hence the need for getStaticPaths (can't get dynamic route id)

  const eventId = context.params.eventId;

  await dbConnect();

  const event = await Event.findById(eventId);

  return {
    props: {
      event: {
        id: event._id.toString(),
        title: event.title,
        image: event.image,
        address: event.address,
        description: event.description,
      },
    },
    revalidate: 1,
  };
}

export default EventDetailsPage;
