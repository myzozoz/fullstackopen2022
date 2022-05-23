const Contact = ({contact}) => <p>{contact.name}</p>

const ContactList = ({contacts}) => {
  console.log(contacts)
  return (<div>
    {contacts.map((c, i) => <Contact key={c.name} contact={c}/>)}
  </div>)
}

export default ContactList