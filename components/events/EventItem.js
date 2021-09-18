import { useRouter } from "next/router";
import Image from "next/image";

function EventItem(props) {
  const router = useRouter();

  function showDetailsHandler() {
    router.push(`/events/${props.id}`);
  }

  return (
    <div className="mb-2/4">
      <div className="image-card">
        <div className="image-card-header">
          <Image
            alt={props.title}
            src={props.image}
            height={720}
            width={1280}
          />
        </div>
        <div className="image-card-body">
          <h3 className="mb-1/4">{props.title}</h3>
          <address>{props.address}</address>
          <div className="image-card-actions">
            <button
              className="button primary round mx-1"
              onClick={showDetailsHandler}
            >
              Show Details &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventItem;
