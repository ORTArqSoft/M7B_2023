const axios = require("axios");
const EventSource = require("eventsource");

// Function to subscribe to an event and wait for the response
async function subscribeToEvent(event) {
  try {
    // Make a POST request to subscribe to the event
    const response = await axios.post(
      `http://localhost:3000/subscribe/${event}`
    );
    console.log(response.data);

    // Create a promise that resolves when the event is received
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Timeout waiting for event"));
      }, 60000); // Set a timeout for waiting, e.g., 60 seconds

      // Listen for the event
      const unsubscribe = (data) => {
        clearTimeout(timeout);
        console.log("Event received:", data);
        resolve(data);
      };

      // Subscribe to the event
      axios
        .post(`http://localhost:3000/subscribe/${event}`)
        .then((response) => {
          // Once subscribed, listen for the event
          const eventSource = new EventSource(
            `http://localhost:3000/subscribe/${event}`
          );
          eventSource.addEventListener(event, (event) => {
            unsubscribe(JSON.parse(event.data));
            console.log("entre");
            eventSource.close();
          });
        });
    });
  } catch (error) {
    console.error("Error subscribing to the event:", error.message);
  }
}

// Usage: Call subscribeToEvent with the desired event name
subscribeToEvent("Saludar")
  .then((data) => {
    console.log("Received event data:", data);
  })
  .catch((error) => {
    console.error(error.message);
  });
