import React from "react";
import {CModal, CModalHeader, CModalBody, CModalFooter, CButton, CModalTitle} from "@coreui/react";

const DeleteDialog = ({onHide, show, item, onDelete}) => {
  console.log(show)
  return (
    <CModal
      show={show}
      onClose={onHide}
    >
      <CModalHeader closeButton>
        <CModalTitle>Konfirmasi Hapus</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Apakah anda akan menghapus {item} ini?
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={onDelete}>Hapus</CButton>{' '}
        <CButton
          color="primary"
          onClick={onHide}
        >Batal</CButton>
      </CModalFooter>
    </CModal>
  )
}
export default DeleteDialog
