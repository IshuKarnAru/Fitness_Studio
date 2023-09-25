// Wrap your JavaScript code in a DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Delete the existing database (if any) to apply the updated schema
    indexedDB.deleteDatabase('registration');

    // Open or create a new database
    const request = indexedDB.open('registration', 1);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create an object store for registrations
        const objectStore = db.createObjectStore('registrations', { keyPath: 'id', autoIncrement: true });

        // Define object store schema
        objectStore.createIndex('first_name', 'first_name', { unique: false });
        objectStore.createIndex('last_name', 'last_name', { unique: false });
        objectStore.createIndex('email', 'email', { unique: false }); // Remove unique constraint
        objectStore.createIndex('phone_number', 'phone_number', { unique: false });
        objectStore.createIndex('message', 'message', { unique: false });
    };

    request.onsuccess = (event) => {
        const db = event.target.result;

        // Handle form submission
        document.getElementById('registrationForm').addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const firstName = document.getElementById('first_name').value;
            const lastName = document.getElementById('last_name').value;
            const email = document.getElementById('email').value;
            const phoneNumber = document.getElementById('phone_number').value;
            const message = document.getElementById('message').value;

            // Create a transaction and object store
            const transaction = db.transaction(['registrations'], 'readwrite');
            const objectStore = transaction.objectStore('registrations');

            // Add a new registration
            const newRegistration = {
                first_name: firstName,
                last_name: lastName,
                email: email,
                phone_number: phoneNumber,
                message: message,
            };

            const addRequest = objectStore.add(newRegistration);

            addRequest.onsuccess = () => {
                alert('Registration data stored successfully');
            };

            addRequest.onerror = () => {
                alert('Error storing registration data');
            };

            // Clear the form fields after submission
            document.getElementById('first_name').value = '';
            document.getElementById('last_name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone_number').value = '';
            document.getElementById('message').value = '';
        });
    };
});
