//The document.addEventListener('DOMContentLoaded', async () => {}) is used to ensure that your JavaScript code runs only after the entire HTML document (DOM) has been fully loaded and parsed.

document.addEventListener("DOMContentLoaded", async () => {
  const events = await eventAPI.getEvents();
  console.log(events);
  const tableElem = document.getElementById("eventTableBody");
  //this is to add all events from the backend
  (function createEventElem() {
    console.log(events);
    events.forEach((event) => {
      addEventRow(event);
    });
  })();

  function addEventRow(event) {
    const eventRow = document.createElement("tr");
    tableElem.append(eventRow);
    eventRow.classList.add("event-row");
    eventRow.setAttribute("id", `eventRow-${event.id}`);
    let cell0 = document.createElement("td");
    cell0.textContent = `${event.eventName}`;
    eventRow.append(cell0);
    cell0.classList.add("event-row-name");
    cell0.setAttribute("id", `eventName-${event.id}`);
    let cell1 = document.createElement("td");
    cell1.textContent = `${event.startDate}`;
    eventRow.append(cell1);
    cell1.classList.add("event-row-start");
    cell1.setAttribute("id", `eventStart-${event.id}`);
    let cell2 = document.createElement("td");
    cell2.textContent = `${event.endDate}`;
    eventRow.append(cell2);
    cell2.classList.add("event-row-end");
    cell2.setAttribute("id", `eventEnd-${event.id}`);
    let cell3 = document.createElement("td");
    let editButton = document.createElement("button");
    editButton.textContent = `Edit`;
    editButton.classList.add("edit-button");
    editButton.setAttribute("id", `editButton-${event.id}`);
    editButton.addEventListener("click", () => {
      console.log("Edit Button clicked!");
      editEvent(event.id);
    });
    let deleteButton = document.createElement("button");
    deleteButton.textContent = `Delete`;
    deleteButton.classList.add("delete-button");
    deleteButton.setAttribute("id", `deleteButton-${event.id}`);
    deleteButton.addEventListener("click", () => {
      console.log("Delete Button clicked!");
      deleteEventHandler(event.id);
    });
    let saveHideButton = document.createElement("button");
    saveHideButton.textContent = `Save`;
    saveHideButton.classList.add("save-hide-button");
    saveHideButton.classList.add("hidden");
    saveHideButton.setAttribute("id", `saveHideButton-${event.id}`);
    saveHideButton.addEventListener("click", () => {
      console.log("SaveHide Button clicked!");
      saveHideHandler(event.id);
    });
    let cancelHideButton = document.createElement("button");
    cancelHideButton.textContent = `Cancel`;
    cancelHideButton.classList.add("cancel-button");
    cancelHideButton.classList.add("hidden");
    cancelHideButton.setAttribute("id", `cancelHideButton-${event.id}`);
    // cancelHideButton.addEventListener("click", () => {
    //     console.log("CancelHide Button clicked!");
    //   });

    cell3.append(editButton);
    cell3.append(deleteButton);
    cell3.append(saveHideButton);
    cell3.append(cancelHideButton);
    eventRow.append(cell3);
  }

  //achieve delete function using the delete button
  async function deleteEventHandler(eventId) {
    const result = await eventAPI.deleteEvent(eventId);
    if (result !== undefined) {
      const eventRow = document.getElementById(`eventRow-${eventId}`);
      eventRow.remove();
    }
  }

  // add a new row first need to render in input form to take client input
  const addNewEventButton = document.getElementById("addNewEventButton");
  addNewEventButton.addEventListener("click", () => {
    console.log("Add New Event Button clicked!");
    addNewEventRow();
  });

  // Append new event row at the end of the current event list when addNewEventButton clicked
  function addNewEventRow() {
    const newInputRow = document.createElement("tr");
    tableElem.append(newInputRow);
    newInputRow.classList.add("new-event-row");
    //   eventRow.setAttribute("id", `eventRow-${event.id}`);
    let cell0 = document.createElement("td");
    let cell0input = document.createElement("input");
    cell0.append(cell0input);
    newInputRow.append(cell0);
    cell0.classList.add("new-row-name");
    cell0input.setAttribute("id", `newRowName`);
    cell0input.type = "text";
    let cell1 = document.createElement("td");
    let cell1input = document.createElement("input");
    cell1.append(cell1input);
    newInputRow.append(cell1);
    cell1.classList.add("new-row-start");
    cell1input.setAttribute("id", `newRowStart`);
    cell1input.type = "date";
    let cell2 = document.createElement("td");
    let cell2input = document.createElement("input");
    cell2.append(cell2input);
    newInputRow.append(cell2);
    cell2.classList.add("new-row-end");
    cell2input.setAttribute("id", `newRowEnd`);
    cell2input.type = "date";

    let cell3 = document.createElement("td");
    let saveButton = document.createElement("button");
    saveButton.textContent = `Save`;
    saveButton.classList.add("save-button");
    saveButton.setAttribute("id", `saveButton`);

    let cancelButton = document.createElement("button");
    cancelButton.textContent = `Cancel`;
    cancelButton.classList.add("cancel-button");
    cancelButton.setAttribute("id", `cancelButton`);

    cell3.append(saveButton);
    cell3.append(cancelButton);
    newInputRow.append(cell3);

    eventTableBody.appendChild(newInputRow);

    document
      .getElementById("saveButton")
      .addEventListener("click", async () => {
        console.log("Save Button Click");
        const eventName = document.getElementById("newRowName").value;
        const startDate = document.getElementById("newRowStart").value;
        const endDate = document.getElementById("newRowEnd").value;
        console.log(`${eventName}, ${startDate}, ${endDate}`);
        if (eventName && startDate && endDate) {
          const newEvent = {
            eventName,
            startDate,
            endDate,
          };

          const createdEvent = await eventAPI.postEvent(newEvent);
          if (createdEvent) {
            addEventRow(createdEvent);
            console.log(createdEvent);
            newInputRow.remove(); // Remove the input row after adding
          }
        }
      });
    document.getElementById("cancelButton").addEventListener("click", () => {
      console.log("Cancel Button clicked!");
      newInputRow.remove();
    });
  }
  //edit Event clicked

  function editEvent(eventId) {
    const eventEditRow = document.getElementById(`eventRow-${eventId}`);
    const eventEditName = eventEditRow.querySelector(`#eventName-${eventId}`);
    const eventEditStart = eventEditRow.querySelector(`#eventStart-${eventId}`);
    const eventEditEnd = eventEditRow.querySelector(`#eventEnd-${eventId}`);
    const editButton = eventEditRow.querySelector(`#editButton-${eventId}`);
    editButton.classList.add("hidden");
    // const cancelButton = eventEditRow.querySelector(`#cancelHideButton-${eventId}`);
    // cancelButton.classList.remove('hidden');
    // const deleteButton = eventEditRow.querySelector(`#editButton-${eventId}`);
    // editButton.classList.add('hidden');

    const saveEditButton = eventEditRow.querySelector(
      `#saveHideButton-${eventId}`
    );
    saveEditButton.classList.remove("hidden");

    // const cancelEditButton = eventEditRow.querySelector(`#cancelHideButton-${eventId}`);
    // cancelEditButton.classList.remove('hidden');
    // cancelEditButton.addEventListener("click", () => {
    //     console.log("CancelHide Button clicked!")});

    console.log(eventEditRow);
    console.log(eventEditName);
    console.log(eventEditStart);
    console.log(eventEditEnd);

    let eventInputName = document.createElement("input");
    eventEditName.append(eventInputName);
    eventInputName.setAttribute("id", `eventInputName-${eventId}`);

    let eventInputStart = document.createElement("input");
    eventEditStart.append(eventInputStart);
    eventInputStart.type = "date";
    eventInputStart.setAttribute("id", `eventInputStart-${eventId}`);

    let eventInputEnd = document.createElement("input");
    eventEditEnd.append(eventInputEnd);
    eventInputEnd.type = "date";
    eventInputEnd.setAttribute("id", `eventInputEnd-${eventId}`);
  }

  async function saveHideHandler(eventId) {
    const eventEditRow = document.getElementById(`eventRow-${eventId}`);
    const eventEditName = eventEditRow.querySelector(`#eventName-${eventId}`);
    const eventEditStart = eventEditRow.querySelector(`#eventStart-${eventId}`);
    const eventEditEnd = eventEditRow.querySelector(`#eventEnd-${eventId}`);

    let eventInputNameNew = eventEditRow.querySelector(
      `#eventInputName-${eventId}`
    ).value;
    let eventInputStartNew = eventEditRow.querySelector(
      `#eventInputStart-${eventId}`
    ).value;
    let eventInputEndNew = eventEditRow.querySelector(
      `#eventInputEnd-${eventId}`
    ).value;

    if (eventInputNameNew && eventInputStartNew && eventInputEndNew) {
      const updatedEvent = {
        eventName: eventInputNameNew,
        startDate: eventInputStartNew,
        endDate: eventInputEndNew,
      };
      console.log(eventEditRow);
      console.log(eventInputNameNew);
      console.log(eventInputStartNew);
      console.log(eventInputEndNew);

      const result = await eventAPI.editEvent(eventId, updatedEvent);
      if (result) {
        console.log(result);
        // Update the display with new values

        eventEditName.textContent = eventInputNameNew;
        eventEditStart.textContent = eventInputStartNew;
        eventEditEnd.textContent = eventInputEndNew;
        const saveEditButton = eventEditRow.querySelector(
          `#saveHideButton-${eventId}`
        );
        saveEditButton.classList.add("hidden");
        const editButton = eventEditRow.querySelector(`#editButton-${eventId}`);
        editButton.classList.remove("hidden");
      }
    } else {
      alert("Please fill in all fields to edit the event.");
    }
  }
});

// (function initApp() {
//   eventAPI.getEvents().then((events) => {
//     for (const event of events) {
//       eventElem.append(event.eventName);
//       eventElem.append(event.startDate);
//       eventElem.append(event.endDate);
//     }

//   });
// })()
