import React, { useState, useEffect } from 'react';
import './style.css'

function ContactRow(props) {
    return (
        <tr>
           <td>{props.contact.name}</td>
           <td>{props.contact.phone}</td>
           <td>{props.contact.email}</td>
        </tr>
    )
}
  
function ContactTable(props) {

    const [contactlist, setContactlist] = useState([]);

    useEffect(() => {
        var rows = [];
        props.contacts.forEach((contact) => {
            if (contact.name.indexOf(props.filterText) === -1) {
              return;
            }
            rows.push(<ContactRow key={contact.key} contact={contact} />);
          });
        setContactlist([...rows])
        console.log("HELLO");
        console.log(rows);
        console.log(contactlist)
    }, [props.contacts]);

    return (
        <table className='table table-hover'>
          <thead>
            <tr>
              <th><i className="fa fa-fw fa-user"></i>Name</th>
              <th><i className="fa fa-fw fa-phone"></i>Phone</th>
              <th><i className="fa fa-fw fa-envelope"></i>Email</th>
            </tr>
          </thead>
          <tbody>{contactlist}</tbody>
        </table>
    );
}

function SearchBar() {

    const [filterTextInput, setFilterTextInput] = useState('');

    return (
        <form>
          <input
            className="form-control"
            type="text"
            placeholder="Search..."
            value={filterTextInput}
            onChange={event => setFilterTextInput(event.target.value)}
          />
        </form>
    );
}
  
function FilterableContactTable() {

    // FilterableContactTable is the owner of the state as the filterText is needed in both nodes (searchbar and table) that are below in the hierarchy tree.
    const [state, setState] = useState({
        filterText: '',
        contacts : [
          {key: 1, name: 'Tom Jackson', phone: '555-444-333', email: 'tom@gmail.com'},
          {key: 2, name: 'Mike James', phone: '555-777-888', email: 'mikejames@gmail.com'},
          {key: 3, name: 'Janet Larson', phone: '555-222-111', email: 'janetlarson@gmail.com'},
          {key: 4, name: 'Clark Thompson', phone: '555-444-333', email: 'clark123@gmail.com'},
          {key: 5, name: 'Emma Pager', phone: '555-444-333', email: 'emma1page@gmail.com'},
  
        ]
      });

    const addContact = (contact) => {
        var timestamp = new Date().getTime();
        contact['key'] = timestamp;
        console.log('BEFORE: this.state.contacts: '+ state.contacts.length);
        // update the state object
        state.contacts.push(contact);
        // set the state
        setState({ contacts: state.contacts });  
    };

    const handleFilterTextInput = (filterText) => {
        //Call to setState to update the UI
        setState({
          filterText: filterText
        });
      }

      return (
        <div>
          <h1>React Contacts List App</h1>
          <SearchBar
            // filterText={this.state.filterText}
            // onFilterTextInput={handleFilterTextInput}
          />
          <NewContactRow addContact={addContact}/>
          <ContactTable
            contacts={state.contacts}
            filterText={state.filterText}
          />
        </div>
      );

} 

function NewContactRow(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        const target = event.target;
        const name = target.name.value;
        const phone = target.phone.value;
        const email = target.email.value;
        
        var contact = {
          name : name,
          phone : phone,
          email : email
        };
        props.addContact(contact);
    };

    return (
        
        <form className="form-inline" onSubmit={handleSubmit}>
         <div className="form-group row">
           <div className="col-md-3">
             <input type="text" name="name" className="form-control" id="nameInput" placeholder="Name" />
           </div>
           <div className="col-md-3">
             <input type="text" name="phone" className="form-control" id="phoneInput" placeholder="Phone" />
           </div>
           <div className="col-md-3">
             <input type="email" name="email" className="form-control" id="emailInput" placeholder="Email" />
           </div>
           <div className="col-md-3">
             <button type="submit" className="btn btn-primary"><i className="fa fa-fw fa-plus"></i>Add</button>
           </div>
         </div>
       </form>
           
     )
}

var CONTACTS = [
    {key: 1, name: 'Tom Jackson', phone: '555-444-333', email: 'tom@gmail.com'},
    {key: 2, name: 'Mike James', phone: '555-777-888', email: 'mikejames@gmail.com'},
    {key: 3, name: 'Janet Larson', phone: '555-222-111', email: 'janetlarson@gmail.com'},
    {key: 4, name: 'Clark Thompson', phone: '555-444-333', email: 'clark123@gmail.com'},
    {key: 5,name: 'Emma Page', phone: '555-444-333', email: 'emma1page@gmail.com'},
];
  
const Contacts = () => {
    // document.getElementById('container')
    return(
        <>
        <div>
            {/* // We are in contact.<br/> */}
            <div class="row">
                <div class="col"></div>
                <div class="col-10 container" id="container">
                  <FilterableContactTable/>
                </div>
                <div class="col">
                </div>
            </div>
        </div>
        {/* We are in contacts. */}
        
        {/* <div>
          <h1>React Contacts List App</h1>
          <SearchBar
            // filterText={this.state.filterText}
            // onFilterTextInput={handleFilterTextInput}
          />
          <NewContactRow addContact={null}/>
          <ContactTable
            contacts={CONTACTS}
            filterText={''}
          />
        </div> */}
        {/* <ContactTable contacts={CONTACTS} filterText={''}/> */}
        </>      
    );
}

export default Contacts;
  