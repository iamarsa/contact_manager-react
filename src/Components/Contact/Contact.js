import React from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import classes from "./Contact.module.css";

const contact = props => {
    
  return (
    <tr className={classes.Contact}>
      <td className >{props.contact.name + " " + props.contact.lastName}</td>
      <td className >{props.contact.number}</td>
      <td className >
        <MdEdit
          className={classes.Icons}
          onClick={() => props.showEdit(props.contact)}
        />
        <MdDelete
          className={classes.Icons}
          onClick={() => props.setShowDelete(props.contact.id)}
        />
      </td>
    </tr>
  );
};

export default contact;
