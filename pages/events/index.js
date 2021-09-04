// zero-tool.com/events
import { MongoClient } from "mongodb"; // won't be included on clientside

import EventList from "../../components/events/EventList";

// const DUMMY_EVENTS = [
//   {
//     id: "e1",
//     title: "First event",
//     image: "http://placehold.it/1280x720",
//     address: "Pickle avenue 7, 69420 Pickle City",
//     description: "Some event regarding stuff...",
//   },
//   {
//     id: "e2",
//     title: "Second event",
//     image: "http://placehold.it/1280x720",
//     address: "Pickle avenue 7, 69420 Pickle City",
//     description: "Some event regarding stuff...",
//   },
// ];

function EventsPage(props) {
  return (
    <div className="container">
      <div className="content">
        <EventList events={props.events} />
      </div>
    </div>
  );
}

/*
export async function getServerSideProps(context) {
  // this code never reahes clientside
  // run on every request
  // good for:
  //  - data updates all the time (multiple times every second and revalidate won't help)
  //  - need access to req object (authentication)

  const req = context.req;
  const res = context.res;

  return {
    props: {
      events: DUMMY_EVENTS,
    },
  };
}
*/

export async function getStaticProps() {
  // this code never reahes clientside
  // runs on build
  // good for:
  //  - should always be prioritized (unless getServerSideProps is needed)

  const dbConnection =
    "mongodb+srv://zero-user-1:6WMbpukv2IRrdbKF@zerocluster.p5ljo.mongodb.net/events?retryWrites=true&w=majority";

  const client = await MongoClient.connect(dbConnection);
  const db = client.db();
  const eventsCollection = db.collection("events");

  const events = await eventsCollection.find().toArray();

  client.close();

  return {
    props: {
      events: events.map((e) => ({
        id: e._id.toString(),
        title: e.title,
        image: e.image,
        address: e.address,
      })),
    },
    // regenerate (re-pregenerate) static page on the server every hour if there are requests
    revalidate: 1,
  };
}

export default EventsPage;
