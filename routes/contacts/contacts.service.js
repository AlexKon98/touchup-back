const fs = require('fs/promises');
const path = require('path');

const filePath = path.join(__dirname, '..', '..', 'data.json');

class ContactsService {
  static data = null;

  static async loadData() {
    if (!ContactsService.data) {
      const jsonData = await fs.readFile(filePath, 'utf-8');
      ContactsService.data = JSON.parse(jsonData);
      return ContactsService.data;
    }
    return ContactsService.data;
  }

  static async saveData() {
    await fs.writeFile(filePath, JSON.stringify(ContactsService.data, null, 2));
  }

  static async getContacts() {
    const data = await ContactsService.loadData();
    return data;
  }

  static async getContactById(id) {
    const contacts = await ContactsService.getContacts();
    const contact = contacts.find(contact => contact.id === id);
    return contact || null;
  }

  static async updateContact(updatedContact) {
    const contacts = await ContactsService.loadData();
    const index = contacts.findIndex(contact => contact.id === updatedContact.id);
    if (index === -1) {
      return null;
    }

    contacts[index] = { ...contacts[index], ...updatedContact };

    await ContactsService.saveData();
    return contacts[index];
  }

  static async addContact(newContact) {
    const data = await ContactsService.loadData();
    const contactWithId = { id: Date.now(), name: newContact.name, phone: newContact.phone, email: newContact.email };
    data.push(contactWithId);
    await ContactsService.saveData();
    return contactWithId;
  }

  static async deleteContact(id) {
    const contacts = await ContactsService.loadData();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) {
      return false;
    }

    contacts.splice(index, 1);

    await ContactsService.saveData();
    return ContactsService.data;
  }
}

module.exports = ContactsService;
