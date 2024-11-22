document.addEventListener('DOMContentLoaded', async () => {
    const eventTableBody = document.getElementById('eventTableBody');
    const addNewEventButton = document.getElementById('addNewEventButton');
  
    // Fetch and render events on page load
    const events = await eventAPI.getEvents();
    if (events) {
      renderEvents(events);
    }
  
    // Function to render events into the table
    function renderEvents(events) {
      eventTableBody.innerHTML = ''; // Clear the table body before rendering new rows
      events.forEach(event => {
        addEventRow(event);
      });
    }
  
    // Function to add a single event row
    function addEventRow(event) {
      const eventRow = document.createElement('tr');
      eventRow.classList.add('event-row');
      eventRow.setAttribute('id', `eventRow-${event.id}`);
  
      eventRow.innerHTML = `
        <td class="event-name">
          <span class="event-label">${event.eventName}</span>
          <input type="text" class="edit-input event-name-input hidden" value="${event.eventName}">
        </td>
        <td class="event-start">
          <span class="event-label">${event.startDate}</span>
          <input type="date" class="edit-input event-start-input hidden" value="${event.startDate}">
        </td>
        <td class="event-end">
          <span class="event-label">${event.endDate}</span>
          <input type="date" class="edit-input event-end-input hidden" value="${event.endDate}">
        </td>
        <td class="event-actions">
          <button class="edit-btn" id="editBtn-${event.id}">Edit</button>
          <button class="save-btn hidden" id="saveBtn-${event.id}">Save</button>
          <button class="delete-btn" id="deleteBtn-${event.id}">Delete</button>
        </td>
      `;
  
      eventTableBody.appendChild(eventRow);
  
      // Add event listeners to the edit, save, and delete buttons
      document.getElementById(`editBtn-${event.id}`).addEventListener('click', () => editEvent(event.id));
      document.getElementById(`saveBtn-${event.id}`).addEventListener('click', () => saveEvent(event.id));
      document.getElementById(`deleteBtn-${event.id}`).addEventListener('click', () => deleteEventHandler(event.id));
    }
  
    // Event listener for "Add New Event" button
    addNewEventButton.addEventListener('click', () => {
      addNewEventRow();
    });
  
    // Function to add a new row for adding a new event
    function addNewEventRow() {
      const newEventRow = document.createElement('tr');
      newEventRow.classList.add('event-row');
      newEventRow.setAttribute('id', `newEventRow`);
  
      newEventRow.innerHTML = `
        <td><input type="text" class="new-event-name" id="newEventName" placeholder="Event Name"></td>
        <td><input type="date" class="new-event-start" id="newEventStart"></td>
        <td><input type="date" class="new-event-end" id="newEventEnd"></td>
        <td>
          <button class="add-btn" id="saveNewEventBtn"> Save</button>
          <button class="cancel-btn" id="cancelNewEventBtn"> Cancel</button>
        </td>
      `;
  
      // Append new event row at the end of the current event list
      eventTableBody.appendChild(newEventRow);
  
      // Add event listeners for the save and cancel buttons
      document.getElementById('saveNewEventBtn').addEventListener('click', async () => {
        const eventName = document.getElementById('newEventName').value;
        const startDate = document.getElementById('newEventStart').value;
        const endDate = document.getElementById('newEventEnd').value;
  
        if (eventName && startDate && endDate) {
          const newEvent = {
            eventName,
            startDate,
            endDate
          };
  
          const createdEvent = await eventAPI.postEvent(newEvent);
          if (createdEvent) {
            addEventRow(createdEvent);
            newEventRow.remove(); // Remove the input row after adding
          }
        } else {
          alert('Please fill in all fields to add a new event.');
        }
      });
  
      document.getElementById('cancelNewEventBtn').addEventListener('click', () => {
        newEventRow.remove();
      });
    }
  
    // Function to edit an event
    function editEvent(eventId) {
      const eventRow = document.getElementById(`eventRow-${eventId}`);
      const labels = eventRow.querySelectorAll('.event-label');
      const inputs = eventRow.querySelectorAll('.edit-input');
      const editButton = document.getElementById(`editBtn-${eventId}`);
      const saveButton = document.getElementById(`saveBtn-${eventId}`);
  
      labels.forEach(label => label.classList.add('hidden'));
      inputs.forEach(input => input.classList.remove('hidden'));
      editButton.classList.add('hidden');
      saveButton.classList.remove('hidden');
    }
  
    // Function to save an edited event
    async function saveEvent(eventId) {
      const eventRow = document.getElementById(`eventRow-${eventId}`);
      const eventNameInput = eventRow.querySelector('.event-name-input').value;
      const eventStartInput = eventRow.querySelector('.event-start-input').value;
      const eventEndInput = eventRow.querySelector('.event-end-input').value;
  
      const updatedEvent = {
        eventName: eventNameInput,
        startDate: eventStartInput,
        endDate: eventEndInput
      };
  
      const result = await eventAPI.editEvent(eventId, updatedEvent);
      if (result) {
        // Update the display with new values
        const labels = eventRow.querySelectorAll('.event-label');
        labels[0].textContent = eventNameInput;
        labels[1].textContent = eventStartInput;
        labels[2].textContent = eventEndInput;
  
        // Hide the inputs and show the labels
        const inputs = eventRow.querySelectorAll('.edit-input');
        inputs.forEach(input => input.classList.add('hidden'));
        labels.forEach(label => label.classList.remove('hidden'));
  
        // Toggle buttons
        const editButton = document.getElementById(`editBtn-${eventId}`);
        const saveButton = document.getElementById(`saveBtn-${eventId}`);
        saveButton.classList.add('hidden');
        editButton.classList.remove('hidden');
      }
    }
  
    // Function to delete an event
    async function deleteEventHandler(eventId) {
      const result = await eventAPI.deleteEvent(eventId);
      if (result !== undefined) {
        const eventRow = document.getElementById(`eventRow-${eventId}`);
        eventRow.remove();
      }
    }
  });