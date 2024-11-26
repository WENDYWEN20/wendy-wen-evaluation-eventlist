const eventAPI = (() => {
    const EVENT_API_URL = 'http://localhost:3000/events';
    async function getEvents() {
      // GET request to the server
      const response = await fetch(EVENT_API_URL);
  //a fetch is a get request by default
      // response.json also returns a promise
      const events = await response.json();
      console.log(events);
      return events;
    }

    async function postEvent(newEvent) {
      const response = await fetch(EVENT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
  
      const event = await response.json();
      console.log(event)
      return event;
    }
  
    async function deleteEvent(id) {
      const response = await fetch(`${EVENT_API_URL}/${id}`, {
        method: "DELETE",
      });
  
      await response.json();
      return id;
    }
  
    async function editEvent(id, newEvent) {
      const response = await fetch(`${EVENT_API_URL}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
  
      const updatedEvent = await response.json();
      return updatedEvent;
    }
  
    return {
      getEvents,
      postEvent,
      deleteEvent,
      editEvent,
    };
  })();
  
  
