document.addEventListener('DOMContentLoaded', () => {
    const apiURL = 'http://localhost:3000/events';
    const eventTableBody = document.getElementById('eventTableBody');
  
    // Fetch events from the local API and render them
    fetch(apiURL)
      .then(response => response.json())
      .then(events => {
        renderEvents(events);
      })
      .catch(error => console.error('Error fetching events:', error));
  
    // Function to render events into the table
    function renderEvents(events) {
      eventTableBody.innerHTML = ''; // Clear the table body before rendering new rows
      events.forEach(event => {
        const eventRow = document.createElement('tr');
        eventRow.classList.add('event-row');
        eventRow.setAttribute('id', `eventRow-${event.id}`);
  
        eventRow.innerHTML = `
          <td class="event-name">${event.eventName}</td>
          <td class="event-start">${event.startDate}</td>
          <td class="event-end">${event.endDate}</td>
          <td class="event-actions">
            <button class="edit-btn" id="editBtn-${event.id}">Edit</button>
            <button class="delete-btn" id="deleteBtn-${event.id}">Delele</button>
          </td>
        `;
  
        // Append the row to the table body
        eventTableBody.appendChild(eventRow);
      });
  
      // Add event listeners to dynamically created buttons
      addEventListeners();
    }
  
    // Function to add event listeners to dynamically created edit and delete buttons
    function addEventListeners() {
      const editButtons = document.querySelectorAll('.edit-btn');
      const deleteButtons = document.querySelectorAll('.delete-btn');
  
      editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          const eventId = event.target.id.split('-')[1];
          console.log('Edit button clicked for event ID:', eventId);
          // Add your edit event logic here
        });
      });
  
      deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
          const eventId = event.target.id.split('-')[1];
          console.log('Delete button clicked for event ID:', eventId);
          // Add your delete event logic here
        });
      });
    }
  });


// Select one edit buttons
// 
  



// Select the new event name input field
const newEventNameInput = document.querySelector('#new-event-name');


// const addEventButton = document.getElementById('addEventButton');
// addEventButton.addEventListener('click', () => {
//   console.log('Add event button clicked');
// });

// Query all delete buttons



