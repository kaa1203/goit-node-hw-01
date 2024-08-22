import { Command } from "commander";
import { listContacts, getContactById, addContact, removeContact } from "./contacts.js";
import chalk from "chalk";

const program = new Command();

program  
   .option("-a, --action <type>", "choose action")
   .option("-i, --id <type>", "user id")
   .option("-f, --fname <type>", "user fname")
   .option("-l, --lname <type>", "user lname")
   .option("-e, --email <type>", "user email")
   .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const invokeAction = async({ action, id, fname, lname, email, phone }) => {
   switch (action) {
      case 'list':
         const contacts = await listContacts();
			if (contacts.length > 0) return console.table(contacts);
			return console.log(chalk.greenBright("No contacts yet, try adding one!"));
      case 'get':
         return getContactById(id);
      case 'add':
         return addContact({ fname, lname, email, phone });
      case 'remove':
         return removeContact(id);
      default:
         break;
   }
}

invokeAction(argv);