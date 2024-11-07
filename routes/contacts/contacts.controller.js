const ContactsService = require('./contacts.service');

class ContactsController {
  static async getAllContacts(req, res) {
    try {
      const contacts = await ContactsService.getContacts();
      res.json(contacts);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving contacts' });
    }
  }

  static async getContactById(req, res) {
    const { id } = req.params;
    try {
      const contact = await ContactsService.getContactById(Number(id));
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.json(contact);
    } catch (err) {
      res.status(500).json({ message: 'Error retrieving contact' });
    }
  }

  static async addContact(req, res) {
    const newContact = req.body;
    try {
      const contacts = await ContactsService.getContacts();
      const newContactWithId = { id: Date.now(), ...newContact };
      contacts.push(newContactWithId);

      await ContactsService.saveData();
      res.status(201).json(newContactWithId);
    } catch (err) {
      res.status(500).json({ message: 'Error adding contact' });
    }
  }

  static async updateContact(req, res) {
    const { id } = req.params;
    const updatedData = req.body;

    try {
      const updatedContact = await ContactsService.updateContact({ id: Number(id), ...updatedData });
      if (!updatedContact) {
        return res.status(404).json({ message: 'Contact not found for update' });
      }
      res.json(updatedContact);
    } catch (err) {
      res.status(500).json({ message: 'Error updating contact' });
    }
  }

  static async deleteContact(req, res) {
    const { id } = req.params;
    try {
      const del = await ContactsService.deleteContact(Number(id));

      res.status(200).json(del);
    } catch (err) {
      res.status(500).json({ message: 'Error deleting contact' });
    }
  }
}

module.exports = ContactsController;