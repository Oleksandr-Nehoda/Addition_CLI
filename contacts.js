const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data); 
    return contacts;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(contact => contact.id === String(contactId));
    // if (!contactById) {
    //   return null;
    // }
    return contactById;
  } catch (err) {
    console.error(`This is catch error: ${err}`);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(contact => contact.id !== String(contactId));
    // console.log(`UpContacts ${updatedContacts}`);
    const updatedContactsJson = JSON.stringify(updatedContacts);
    await fs.writeFile(contactsPath, updatedContactsJson) 
  } catch (err) {
    console.error(`This is catch error: ${err}`);
  }
}

async function addContact(name, email, phone) {
try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone
    };
    contacts.push(newContact);
    const updatedContactsJson = JSON.stringify(contacts);
    await fs.writeFile(contactsPath, updatedContactsJson); 
} catch (err) {
    console.error(`This is catch error: ${err}`);
}
}

module.exports = {listContacts, getContactById, removeContact, addContact}