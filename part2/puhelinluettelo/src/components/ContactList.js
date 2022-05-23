const Contact = ({contact}) => <p>{contact.name} {contact.number}</p>

const ContactList = ({contacts}) => {
  return (<div>
    {contacts.map((c, i) => <Contact key={c.name} contact={c}/>)}
  </div>)
}

export default ContactList