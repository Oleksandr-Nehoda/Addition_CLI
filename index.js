const {listContacts, getContactById, removeContact, addContact} = require('./contacts.js');

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
        const contacts = await listContacts();
        console.table(contacts);
      break;

    case "get":
        const contactById = await getContactById(id);
        console.log(contactById);
      break;

    case "add":
        const addCont = await addContact(name, email, phone);
        console.table(addCont);
       
      break;

    case "remove":
        const removeCont = await removeContact(id);
        console.table(removeCont);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);