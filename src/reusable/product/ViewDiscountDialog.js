import React from "react";
import {Modal, Image, Row, Col} from "react-bootstrap";
import {CButton} from "@coreui/react";

export const ViewDiscountDialog = ({show, discount, hide}) =>{
  return(
    <Modal
      show={show}
      size={'lg'}
      aria-labelledby="example-modal-sizes-title-lg"
      onHide={hide}
    >
      <Modal.Header>
        <Modal.Title>Lihat Diskon</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='mx-auto'>
          <Col>
            <Row className='my-2'>
              <Col lg={3}>Nama</Col>
              <Col lg={9}>: {discount.name}</Col>
            </Row>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <CButton color="danger" onClick={hide}>Tutup</CButton>{' '}
        {/*<CButton*/}
        {/*  color="success"*/}
        {/*  onClick={submit}*/}
        {/*>Konfirmasi</CButton>*/}
      </Modal.Footer>

    </Modal>
  )
}
