const express = require('express');
const router = express.Router();

const ContactsController = require('./contacts.controller');

router.get('/', ContactsController.getAllContacts);
router.get('/:id', ContactsController.getContactById);
router.post('/', ContactsController.addContact);
router.put('/:id', ContactsController.updateContact);
router.delete('/:id', ContactsController.deleteContact);

module.exports = router;
