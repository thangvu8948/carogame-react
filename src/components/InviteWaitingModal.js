import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner } from 'react-bootstrap';
import { socket } from "../App";
import { connect } from "react-redux";
import { inviting_off } from "../actions";

const mapStateToProps = state => {
  console.log(state);
  return { isInviting: state.isInviting };
};

function mapDispatchToProps(dispatch) {
  return {
    inviting_off: value => dispatch(inviting_off(value))
  };
}

const InviteWaitingModal = (props) => {
  const CancelHandler = () => {
    //socket.emit('quick-game', JSON.stringify({type: "cancel"}));
    props.inviting_off();
  }
  return <Modal
    show={props.isInviting}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    onHide={props.hide}
    backdrop="static"
    keyboard={false}
  >

    <Modal.Body style={{ textAlign: "center" }}>
      <h4>Inviting</h4>
      <Spinner style={{ width: "150px", height: "150px", display: "block" }} className="mx-auto my-5" animation="border" />
      <button type="button" class="btn btn-primary btn-new-room" onClick={CancelHandler}>Cancel</button>

    </Modal.Body>

  </Modal>
}

export default connect(mapStateToProps, mapDispatchToProps)(InviteWaitingModal);