import React,{useState,useEffect} from 'react';
import axios from '../../axios-contacts';
import {Table} from 'react-bootstrap'
import Pagination from '../../Components/Pagination/Pagination'
import classes from './ContactPage.module.css'
import Nav from '../../Components/NavBar/NavBar'
import Modal from '../../Components/Modal/Modal'
import DeleteModal from '../../Components/Modal/DeleteModal'
import EditModal from '../../Components/Modal/EditModal'
import AddModal from '../../Components/Modal/AddModal'
import ErrorModal from '../../Components/Modal/ErrorModal'
import Contact from '../../Components/Contact/Contact'

const ContactPage = (props) => {

    //state
    const [contacts, setContacts] = useState([]);
    const [searchedContacts, setSearchedContacts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [currPage, setCurrPage] = useState(1);
   

    const getContacts = async () => {
        try {
          let response = await axios.get("/contacts.json");
          const contacts = [];
          for (let key in response.data) {
            response.data[key].id = key;
            contacts.push(response.data[key]);
          }
          setContacts(contacts);
        } catch (error) {
          showErrorModal();
        }
      };
//load contacts from Firebase
    useEffect(() => { getContacts()}, [])
    

    
    
    //searchHandler function
    const searchHandler = (e, contacts) => {
      let results = [];
      setSearchText(e.target.value.trim());
      if (e.target.value.trim() === "") {
        setSearchedContacts([]);
      } else {
        results = contacts.filter(contact => {
          const lc = {
            lcName: contact.name.toLowerCase(),
            lcLastName: contact.lastName.toLowerCase(),
            number: contact.number
          };

          const filter = e.target.value
            .trim()
            .toLowerCase()
            .split(" ");

          if (filter[1] === undefined) {
            return lc.lcName.includes(filter[0]);
          } else {
            return (
              lc.lcName.includes(filter[0]) &&
              lc.lcLastName.includes(filter[1]) &&
              filter[2] === undefined
            );
          }
        });

        setSearchedContacts(results);
      }
    };

    //deleting contacts
    const deleteContactHandler = async (id) => {
        let url = '/contacts/'+id+'.json';
       try{
         await axios.delete(url);
       }catch(error) {
           showErrorModal();
        }

        
        getContacts();

        hideModal();

    }

    const editContactHandler = async (name, lastName, number, id) => {
      let newData = {
        name: name,
        lastName: lastName,
        number: number
      };
      let url = "/contacts/" + id + ".json";
      try {
        await axios.patch(url, newData);
      } catch (error) {
        showErrorModal();
      }
      getContacts();

      setShowModal(false);
    };

    //adding new contacts
    const addContactHandler = async (name, lastName, number) => {
      let data = {
        name: name,
        lastName: lastName,
        number: number
      };

      try {
        await axios.post("/contacts.json", data);
      } catch (error) {
        showErrorModal();
      }
      getContacts();
      setShowModal(false);
    };

    //delete modal
    const setShowDeleteModal = id => {
      setModalContent(
        <DeleteModal
          hide={hideModal}
          id={id}
          action={deleteContactHandler}
        />
      );
      setShowModal(true);
    };

    //edit modal
    const showEditModal = contact => {
      setModalContent(
        <EditModal
          hide={hideModal}
          contact={contact}
          sumbitEdit={editContactHandler}
        />
      );
      setShowModal(true);
    };

    
    //add modal
    const showAddModal = () => {
      setModalContent(
        <AddModal hide={hideModal} submitAdd={addContactHandler} />
      );
      setShowModal(true);
    };

    const showErrorModal = () => {
      setModalContent(<ErrorModal hide={hideModal} />);
      setShowModal(true);
    };


    //hiding modals
    const hideModal = ()=> {
        setShowModal(false);
    }


    //paginate func
    const paginate = (num)=> {
        setCurrPage(num);
    }

    //pagination setup
    let indexLast = currPage * 9;
    let indexFirst = indexLast - 9;
    let currContacts = contacts.slice(indexFirst, indexLast);
   
    

    let display = null;

    //displaying all contacts or searched contacts
    if (searchedContacts.length === 0 && searchText === "") {
      display = currContacts.map(contact => {
        return (
          <Contact
            key={contact.id}
            contact={contact}
            setShowDelete={setShowDeleteModal}
            showEdit={showEditModal}
          />
        );
      });
    } else if (searchedContacts.length === 0 && searchText !== "")
      display = <tr><td>NO RESULTS</td><td>NO RESULTS</td><td>NO RESULTS</td></tr>;
    else
      display = searchedContacts.map(contact => {
        return (
          <Contact
            key={contact.id}
            contact={contact}
            setShowDelete={setShowDeleteModal}
            showEdit={showEditModal}
          />
        );
      });
        



        

    return (
      <React.Fragment>
        <Nav
          contacts={contacts}
          search={searchHandler}
          add={showAddModal}
        />

        <Table className="text-center" variant="light" striped>
          <thead>
            <tr>
              <th>FULLNAME</th>
              <th>NUMBER</th>
              <th className={classes.Actions}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>{display}</tbody>
        </Table>
        <Pagination
          total={contacts.length}
          contactsPerPage={9}
          paginate={paginate}
        />
        <Modal show={showModal} hide={hideModal} content={modalContent} />
      </React.Fragment>
    );

    }
export default ContactPage;