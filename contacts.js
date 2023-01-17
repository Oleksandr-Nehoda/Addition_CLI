const path = require('path');
const fs = require('fs').promises;

const contactsPath = path.resolve('./db/contacts.json');

// console.log(`LOG: ${path.resolve('./db/contcts.json')}`);

async function listContacts () {
    try {
    const data = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
} catch (err) {
console.error(err);
}
    } ;
console.log(listContacts());


 const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contactById = contacts.find(item => item.id === String(contactId));
        if(!contactById) {
            return null;
        }
        return contactById;
    } catch (err) {
        console.error(err); 
    }
    } ;   
    console.log(`LOGById: ${getContactById(1)}`);
    
    