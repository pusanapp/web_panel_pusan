import React from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CModalTitle,
  CCol,
  CLabel,
  CFormGroup
} from "@coreui/react";
import moment from "moment";
import "moment/locale/id"
import convertRupiah from "rupiah-format";

const ConfirmationOrderDialog =({show, transaction, onHide, submit}) =>{
  return (
    <CModal
      show={show}
      size=""
      onClose={onHide}
    >
      <CModalHeader >
        <CModalTitle>Konfirmasi Pesanan</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup row>
          <CCol md="3" xs="2">
            <CLabel>Invoice</CLabel>
          </CCol>
          <CCol xs="10" md="9">
            <p className="form-control-static">: {transaction.invoice_number}</p>
          </CCol>
          <CCol md="3" xs="2">
            <CLabel>Metode Pembayaran</CLabel>
          </CCol>
          <CCol xs="10" md="9">
            <p className="form-control-static">: {transaction.payment_method}</p>
          </CCol>
          <CCol md="3" xs="2">
            <CLabel>Total Bayar</CLabel>
          </CCol>
          <CCol xs="10" md="9">
            <p className="form-control-static">: {convertRupiah.convert(transaction.total_amount)}</p>
          </CCol>
          <CCol md="3" xs="2">
            <CLabel>Waktu Pemesanan</CLabel>
          </CCol>
          <CCol xs="10" md="9">
            <p className="form-control-static">: {moment(transaction.createdAt).format('lll')}</p>
          </CCol>
          <CCol md="3" xs="2">
            <CLabel>Waktu Pembayaran</CLabel>
          </CCol>
          <CCol xs="10" md="9">
            <p className="form-control-static">: {moment(transaction.payment_date).format('lll')}</p>
          </CCol>
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="danger" onClick={onHide}>Batal</CButton>{' '}
        <CButton
          color="success"
          onClick={submit}
        >Konfirmasi</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ConfirmationOrderDialog
