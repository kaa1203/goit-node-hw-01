import fs from 'fs/promises';
import path from 'path';
import { nanoid } from "nanoid";
import chalk from "chalk";

const contactsPath = path.join('db', 'contacts.json');

const listContacts = async() => {
   try {
      const contacts = await fs.readFile(contactsPath);
      return JSON.parse(contacts);
   } catch (e) {
      console.error(e);
   }
}

const getContactById = async(contactId) => {
   try {
      const contacts = await listContacts();
      const user = contacts.find(contact => contact.id === contactId);

		if (user) return console.table(user);

		console.log(chalk.red("Invalid Id! Please try again!"));
   } catch (e) {
      console.error(e);
   }
}

const addContact = async({ fname, lname, email, phone }) => {
   try {
      const currentContacts = await listContacts();
		const name = fname +" "+ lname;
      const newContact = {
         id: nanoid(),
         name, 
         email,
         phone
      }

      const updatedContacts = [...currentContacts, newContact];
      
      await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
      
      console.log(`${chalk.underline.blue(name.toUpperCase())} is ${chalk.green('added')} to the contacts!`);
      
      return console.table(updatedContacts);
   } catch (e) {
      console.error(e);
   }
}

const removeContact = async(contactId) => {
   try {
      const contacts = await listContacts();
      const index = contacts.findIndex(contact => contact.id === contactId);

      if (index === -1) return console.log(chalk.red("Invalid Id! Please try again!"));
      
      contacts.splice(index, 1);
      
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      console.log(`User with id of ${chalk.underline.yellow(contactId)} has been successfully ${chalk.red('deleted')}!`);
      console.table(contacts);
   } catch (e) {
      console.error(e);
   }
}

export { listContacts, getContactById, addContact, removeContact };