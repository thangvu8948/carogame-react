import React, { useState,useEffect } from "react";
import { Button, Modal, Spinner} from 'react-bootstrap';
import { finding_off, finding_on } from "../actions";
import { socket } from "../App";
import {connect} from "react-redux";
const mapStateToProps = state => {
  console.log(state);
  return { isFindingQuickGame: state.isFindingQuickGame };
};

function mapDispatchToProps(dispatch) {
  return {
      finding_off: () => dispatch(finding_off()),
      finding_on: () => dispatch(finding_on())
  };
}


const QuickGameModal = (props) => {
    const CancelHandler = () => {
        socket.emit('quick-game', JSON.stringify({type: "cancel"}));
        props.finding_off();
    }
    return <Modal
        show={props.isFindingQuickGame}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={props.hide}
      backdrop="static"
      keyboard={false}
    >
     
      <Modal.Body style={{textAlign:"center"}}>
        <h4>Waiting for other players</h4>
        <Spinner style={{width: "150px", height: "150px", display:"block"}} className="mx-auto my-5" animation="border" />
        <button type="button" class="btn btn-primary btn-new-room" onClick={CancelHandler}>Cancel</button>

      </Modal.Body>
      
    </Modal>
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickGameModal);