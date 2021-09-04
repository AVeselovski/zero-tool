import { MongoClient, ObjectId } from "mongodb"; // won't be included on clientside
import Head from "next/head";

import EventDetail from "../../../components/events/EventDetail";

// const DUMMY_EVENT = {
//   id: "e1",
//   title: "First event",
//   image: "http://placehold.it/1280x720",
//   address: "Pickle avenue 7, 69420 Pickle City",
//   description: "Some event regarding stuff...",
// };

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

  const dbConnection =
    "mongodb+srv://zero-user-1:6WMbpukv2IRrdbKF@zerocluster.p5ljo.mongodb.net/events?retryWrites=true&w=majority";

  const client = await MongoClient.connect(dbConnection);
  const db = client.db();
  const eventsCollection = db.collection("events");

  const events = await eventsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: events.map((e) => ({ params: { eventId: e._id.toString() } })),
  };
}

export async function getStaticProps(context) {
  // cannot use hooks in this function, hence the need for getStaticPaths (can't get dynamic route id)

  const eventId = context.params.eventId;

  const dbConnection =
    "mongodb+srv://zero-user-1:6WMbpukv2IRrdbKF@zerocluster.p5ljo.mongodb.net/events?retryWrites=true&w=majority";

  const client = await MongoClient.connect(dbConnection);
  const db = client.db();
  const eventsCollection = db.collection("events");

  const eventData = await eventsCollection.findOne({ _id: ObjectId(eventId) });

  client.close();

  return {
    props: {
      event: {
        id: eventData._id.toString(),
        title: eventData.title,
        image: eventData.image,
        address: eventData.address,
        description: eventData.description,
      },
    },
    revalidate: 1,
  };
}

export default EventDetailsPage;
