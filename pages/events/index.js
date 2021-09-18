// zero-tool.com/events
import dbConnect from "../../lib/dbConnect"; // won't be included on clientside
import Event from "../../models/event"; // won't be included on clientside

import EventList from "../../components/events/EventList";

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

  await dbConnect();

  const result = await Event.find({});

  return {
    props: {
      events: result.map((e) => ({
        id: e._id.toString(),
        title: e.title,
        image: e.image,
        address: e.address,
      })),
    },
    // regenerate (re-pregenerate) static page on the server every second if there are requests
    revalidate: 1,
  };
}

export default EventsPage;
