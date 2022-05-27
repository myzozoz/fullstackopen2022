const Contact = ({contact, deleteAction}) =>
  <p>
    {contact.name} {contact.number}
    <button onClick={deleteAction(contact)}>Delete</button>
  </p>

const ContactList = ({contacts, deleteAction}) =>
  <div>
    {contacts.map((c) => <Contact key={c.name} contact={c} deleteAction={deleteAction}/>)}
  </div>

export default ContactList