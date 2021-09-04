import { useRef } from "react";

function NewEventForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const eventData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddEvent(eventData);
  }

  return (
    <div className="card">
      <form className="card-body" onSubmit={submitHandler}>
        <div className="input-group">
          <label htmlFor="title">Event Title</label>
          <input
            className="big"
            id="title"
            required
            type="text"
            ref={titleInputRef}
          />
        </div>
        <div className="input-group">
          <label htmlFor="image">Event Image</label>
          <input
            className="big"
            id="image"
            required
            type="url"
            ref={imageInputRef}
          />
        </div>
        <div className="input-group">
          <label htmlFor="address">Address</label>
          <input
            className="big"
            id="address"
            required
            type="text"
            ref={addressInputRef}
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="big"
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className="card-actions">
          <button className="button primary fill">Add Event</button>
        </div>
      </form>
    </div>
  );
}

export default NewEventForm;
