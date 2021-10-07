const uri = 'api/people';
let persons = [];

function getPersons() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayPersons(data))
        .catch(error => console.error('Unable to get persons.', error));
}

function addPerson() {
    const addFirstNameTextbox = document.getElementById('add-firstName');
    const addLastNameTextbox = document.getElementById('add-lastName');
    const person = {
        firstName: addFirstNameTextbox.value.trim(),
        lastName: addLastNameTextbox.value.trim()
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    })
        .then(response => response.json())
        .then(() => {
            getPersons();
            addFirstNameTextbox.value = '';
            addLastNameTextbox.value = '';
        })
        .catch(error => console.error('Unable to add person.', error));
}

function deletePerson(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getPersons())
        .catch(error => console.error('Unable to delete person.', error));
}

function displayEditForm(id) {
    const person = persons.find(person => person.id === id);

    document.getElementById('edit-firstName').value = person.firstName;
    document.getElementById('edit-lastName').value = person.lastName;
    document.getElementById('edit-id').value = person.id;
    document.getElementById('editForm').style.display = 'block';
}

function updatePerson() {
    const personId = document.getElementById('edit-id').value;
    const person = {
        id: parseInt(personId, 10),
        firstName: document.getElementById('edit-firstName').value.trim(),
        lastName: document.getElementById('edit-lastName').value.trim()
    };

    fetch(`${uri}/${personId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(person)
    })
        .then(() => getPersons())
        .catch(error => console.error('Unable to update person.', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(personCount) {
    const persons = (personCount === 1) ? 'użytkownik' : 'uyżtkowników';

    document.getElementById('counter').innerText = `${personCount} ${persons}`;
}

function _displayPersons(data) {
    const tBody = document.getElementById('persons');
    tBody.innerHTML = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(person => {

        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edytuj';
        editButton.setAttribute('onclick', `displayEditForm(${person.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Usuń';
        deleteButton.setAttribute('onclick', `deletePerson(${person.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNode = document.createTextNode(person.firstName);
        td1.appendChild(textNode);

        let td2 = tr.insertCell(1);
        let textNode2 = document.createTextNode(person.lastName);
        td2.appendChild(textNode2);

        let td3 = tr.insertCell(2);
        td3.appendChild(editButton);

        let td4 = tr.insertCell(3);
        td4.appendChild(deleteButton);
    });

    persons = data;
}