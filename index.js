const contactsOperations = require("./contacts");
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

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contactsOperations.listContacts().then(console.table);
      break;

    case "get":
      contactsOperations.getContactById(id).then(console.log);
      break;

    case "add":
      contactsOperations.addContact(name, email, phone).then(console.log);
      break;

    case "remove":
      contactsOperations.removeContact(id).then(console.log);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
