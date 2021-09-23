const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db/contacts.json");

async function findContactInArrById(arr, id) {
  return await arr.find((item) => item.id.toString() === id.toString());
}

async function listContacts() {
  try {
    return await fs.readFile(contactsPath).then(JSON.parse);
  } catch (error) {
    return error.message;
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    return await findContactInArrById(contacts, contactId);
  } catch (error) {
    return error.message;
  }
}

async function removeContact(contactId) {
  try {
    if (!contactId) throw new Error("Unknown ID");

    const contacts = await listContacts();
    const newContacts = JSON.stringify(
      contacts.filter((el) => el.id.toString() !== contactId.toString())
    );
    fs.writeFile(contactsPath, newContacts);
    return findContactInArrById(contacts, contactId);
  } catch (error) {
    return error.message;
  }
}

async function addContact(name, email, phone) {
  try {
    if (!name || !email || !phone) throw new Error("Unknown data");

    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    const newContacts = JSON.stringify([...contacts, newContact]);
    fs.writeFile(contactsPath, newContacts);
    return newContact;
  } catch (error) {
    return error.message;
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
