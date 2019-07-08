import React from 'react';
import {Modal} from 'react-bootstrap'
const modal = (props) => {
    
    return( <Modal show={props.show} onHide = {props.hide}>
            {props.content}
            </Modal>)
    
    }
export default modal;