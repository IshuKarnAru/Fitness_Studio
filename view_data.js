document.addEventListener('DOMContentLoaded', function() {
    const request = indexedDB.open('registration', 1);

    request.onsuccess = (event) => {
        const db = event.target.result;
        const registeredData = document.getElementById('registeredData');

        displayRegisteredUsers();

        function displayRegisteredUsers() {
            registeredData.innerHTML = ''; // Clear the existing list

            const transaction = db.transaction(['registrations'], 'readonly');
            const objectStore = transaction.objectStore('registrations');

            objectStore.openCursor().onsuccess = (e) => {
                const cursor = e.target.result;
                if (cursor) {
                    const userData = cursor.value;
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${userData.first_name}</td>
                        <td>${userData.last_name}</td>
                        <td>${userData.email}</td>
                        <td>${userData.phone_number}</td>
                        <td>${userData.message}</td>
                    `;
                    registeredData.appendChild(row);
                    cursor.continue();
                }
            };
        }
    };
});
