function getElement(selector) {
  return document.querySelector(selector);
}

function setCss(element, property, value) {
  // element.style.property = value;
  element.style[property] = value;
}

function on(element, eventType, callback) {
  element.addEventListener(eventType, callback);
}

function click(element, callback) {
  on(element, 'click', callback);
}

const contactsTable = getElement('#contactsTable tbody');
const addContactForm = getElement('#addContact');
const firstInput = getElement('#first');
const lastInput = getElement('#last');
const emailInput = getElement('#email');
const phoneInput = getElement('#phone');
const addContactButton = getElement('#add');
let contacts = [];

function hideAddContactForm() {
  setCss(addContactForm, 'display', 'none');
  addContactForm.reset();
  setCss(addContactButton, 'visibility', 'visible');
}

function addContact(first, last, email, phone) {

  if (!contacts.length) {
    contactsTable.innerHTML = '';
  }

  const newContact = {
    first,
    last,
    email,
    phone,
  };

  contacts.push(newContact);

  const row = contactsTable.insertRow();

  row.innerHTML = `
    <td>${first}</td>
    <td>${last}</td>
    <td>${email}</td>
    <td>${phone}</td>
    <td><button>delete</button></td>
  `;

  row.querySelector('button').addEventListener('click', () => {
    row.remove();

    contacts = contacts.filter(c => c !== newContact);

    if (!contacts.length) {
      contactsTable.innerHTML = `<tr>
          <td colspan="5">no contacts loaded</td>
        </tr>`;
    }
  });


}
on(addContactForm, 'submit', e => {
  e.preventDefault();

  addContact(firstInput.value, lastInput.value, emailInput.value, phoneInput.value);

  hideAddContactForm();
});

click(addContactButton, () => {
  setCss(addContactForm, 'display', 'block');
  setCss(addContactButton, 'visibility', 'hidden');
});

click(getElement('#cancel'), hideAddContactForm);

try {
  const response = await fetch('names.json');
  if (!response.ok) {
    throw new Error(`${response.status} - ${response.statusText}`);
  }
  const t = await response.json();
  console.log(t);

  t.forEach(contact => {
    addContact(contact.first, contact.last, contact.email, contact.phone);
  });
} catch (e) {
  console.error('oops', e);
}

