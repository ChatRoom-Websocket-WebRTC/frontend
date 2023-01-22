import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
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
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        var rows = [];
        props.contacts.forEach((contact) => {
            if (contact.name.indexOf(props.filterText) === -1) {
              return;
            }
            rows.push(<ContactRow key={contact.key} contact={contact} />);
          });
        setContactlist([...rows])
        setContacts([...props.contacts])
        // console.log("HELLO");
        // console.log(rows);
        // console.log(contactlist)
    }, [props.contacts]);

    const rows = [1, 2, 3, 4, 5]
    return (
      
        <Box paddingLeft="20%" paddingRight="20%">
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        
        <TableHead>
          <TableRow>
            <TableCell>User-ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Phone</TableCell>
            <TableCell align="right">Email</TableCell>
            {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow
              key={contact.key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {contact.key}
              </TableCell>
              <TableCell align="right">{contact.name}</TableCell>
              <TableCell align="right">{contact.phone}</TableCell>
              <TableCell align="right">{contact.email}</TableCell>
              <TableCell align="right">
                <Button variant="contained">Call</Button>
              </TableCell>
              <TableCell align="right">
                <Button variant="contained">Chat</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
      </TableContainer>
      </Box>
    
    );
}

function SearchBar() {

    const [filterTextInput, setFilterTextInput] = useState('');

    return (
      <Box paddingLeft={"20%"} paddingRight={"20%"}>
          <TextField label="Search..." variant="outlined" 
            fullWidth
            // margin='dense'
            value={filterTextInput}
            onChange={event => setFilterTextInput(event.target.value)}/>
      </Box>
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
        <Box sx={{
          display: 'flex',
          flexDirection: 'Column',
          alignItems: 'stretch'

        }}>
          <h1>React Contacts List App</h1>
          <Box flexGrow={12} alignItems="center">
            <SearchBar
              // filterText={this.state.filterText}
              // onFilterTextInput={handleFilterTextInput}
            />
            <NewContactRow addContact={addContact}/>
            <ContactTable
              contacts={state.contacts}
              filterText={state.filterText}
            />
          </Box>
        </Box>
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
        
           <Box paddingLeft={"20%"} paddingRight={"20%"} display={"flex"} flexDirection={"row"}>
              <TextField label="name" variant="outlined" flexGrow={4}
                />
                <TextField label="Phone" variant="outlined" flexGrow={4}
                />
                <TextField label="Email" variant="outlined" flexGrow={4}
                />
                <Button variant="contained">Add</Button>
          </Box>
          //  <div className="col-md-3">
          //    <button type="submit" className="btn btn-primary"><i className="fa fa-fw fa-plus"></i>Add</button>
          //  </div>
           
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
  