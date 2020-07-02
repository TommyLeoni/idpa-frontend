import React from "react";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";

export default function LoadingModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <ModalHeader>
        <ModalTitle>Analyse läuft ..</ModalTitle>
      </ModalHeader>
      <ModalBody>Bitte einen Moment warten</ModalBody>
    </Modal>
  );
}
