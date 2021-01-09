import React, { useState,useEffect } from "react";
import { Button, Modal } from 'react-bootstrap';
import { socket } from "../App";
import AccountService from "../services/account.service";


const InviteModal = (props) => {

    const [loading, setLoading] = useState(false);
    let invitationInfo = props.invitationInfo;
    const acceptHandler = () => {
        const user = AccountService.getCurrentUserInfo();
        socket.emit("invite-game", JSON.stringify({ type: "accept", data: {user: user, sourceSK: invitationInfo.data.senderSK} }))
        setLoading(true);

    }

    const deniedHandler = () => {
        props.handleClose();
        invitationInfo = null;
    }
    return <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Invitation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you have an invitation for a game from {invitationInfo && invitationInfo.data.sender.Username}</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={deniedHandler}>
                Close
      </Button>
            <Button variant="primary" onClick={acceptHandler}>
                Save Changes
                <span hidden={!loading}><div class="mx-1 spinner-border text-light spinner-grow-sm" role="status">
                    <span class="sr-only">Loading...</span>
                </div></span>
            </Button>
        </Modal.Footer>
    </Modal>
}
export default InviteModal;
