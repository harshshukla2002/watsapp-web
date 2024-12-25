import React, { useContext, useState } from "react";

import "./styles.css";
import ContactContext from "../../contexts/ContactContext";

const ContactList = () => {
  const { contacts, selectedContact, setSelectedContact } =
    useContext(ContactContext);
  const [searchedContact, setSearchedContact] = useState([]);
  const [text, setText] = useState("");

  const searchContact = (value) => {
    const newContact = contacts.filter((name) => {
      return name.toLowerCase().includes(value.toLowerCase());
    });

    setSearchedContact(newContact);
  };

  return (
    <div className="contacts">
      <div className="header">
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
            searchContact(e.target.value);
          }}
          placeholder="search person"
        />
      </div>
      {searchedContact.length > 0 || text !== ""
        ? searchedContact.map((name, index) => {
            return (
              <div className="contact" key={index}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4042/4042356.png"
                  alt=""
                />
                <p>{name}</p>
              </div>
            );
          })
        : contacts.map((name, index) => {
            return (
              <div
                className={`contact ${
                  selectedContact === name ? "active" : ""
                }`}
                onClick={() => setSelectedContact(name)}
                key={index}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4042/4042356.png"
                  alt=""
                />
                <p>{name}</p>
              </div>
            );
          })}
    </div>
  );
};

export default ContactList;
