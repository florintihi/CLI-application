const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    contacts.map((contact, index) => {
      console.log(
        `${index + 1}. ${contact.name} - ${contact.email} - ${contact.phone}`
      );
    });
    return contacts;
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const filteredContacts = contacts.find(
      (contact) => contactId === contact.id
    );

    if (!filteredContacts) {
      console.log(`No contact with id ${contactId}`);
    } else {
      console.log(filteredContacts);
    }
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    let contacts = JSON.parse(data);
    if (!contacts.find((contact) => contactId === contact.id)) {
      console.log(`No contact with id ${contactId}`);
    } else {
      console.log(`Contact with ID ${contactId} has been removed`);
    }
    contacts = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = {
      id: Date.now().toString(),
      name: `${name}`,
      email: `${email}`,
      phone: `${phone}`,
    };

    contacts.unshift(newContact);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    console.log(contacts);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
