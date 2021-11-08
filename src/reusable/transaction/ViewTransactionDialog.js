import React, {useState} from "react";
import {Modal, Image, Row, Col,Table} from "react-bootstrap";
import convertRupiah from "rupiah-format";
import moment from "moment";
import "moment/locale/id"

export const ViewTransactionDialog = ({show,hide,transaction}) => {
  let total = 0
  return(
    <Modal
      show={show}
      size={'lg'}
      aria-labelledby="example-modal-sizes-title-lg"
      onHide={hide}
    >
      <Modal.Header>
        <Modal.Title>Detail Transaksi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-between bg-gray-100 rounded align-items-center mx-auto">
          <Col className='pt-3'>
            <div><h5>No. Invoice #{transaction.invoice_number}</h5></div>
            <div><p>Tanggal dibuat : {moment(transaction.createdAt).format('lll')}</p></div>

          </Col>
          <div className='mt-3 mr-3'><p className='bg-success px-5 py-1 rounded'>{transaction.status}</p></div>
        </Row>
        <Row className='mx-auto bg-gray-100 mt-3 align-items-center rounded'>
          <Col className='pt-1'>
            <h5>Pembeli</h5>
          </Col>
        </Row>
        <Row className='mx-auto align-items-start justify-content-between'>
          <Col lg={8} sm={12} className='flex-wrap'>
            <div>{transaction.customer_name}</div>
            <div>{transaction.phone_number}</div>
            <div style={{
              wordWrap: 'break-word'
            }}>{transaction.address}</div>
          </Col>
          <Col lg={4} sm={12}>
            <Row className='justify-content-end mx-auto'>
              <div>Kurir : {transaction.shipping_expedition_service}</div>
            </Row>
            <Row className='justify-content-end mx-auto'>
              <div>Metode Pembayaran : {transaction.payment_method}</div>
            </Row>
          </Col>
        </Row>
        <Row className='mx-auto mt-3'>
          <Col>
            {transaction.transaction_product && (
              <Table striped bordered hover size="sm">
                <thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Produk</th>
                  <th>Qty</th>
                  <th>Harga</th>
                  <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {transaction.transaction_product.map(data=>{
                  total += data.total
                  return(
                    <tr key={data.id}>
                      <td>{data.product_code}</td>
                      <td>{data.product_name}</td>
                      <td>{data.product_qty}</td>
                      <td>{convertRupiah.convert(data.product_price)}</td>
                      <td>{convertRupiah.convert(data.total)}</td>
                    </tr>
                  )
                })}

                <tr>
                  <td colSpan="3"></td>
                  <td >Sub Total</td>
                  <td>{convertRupiah.convert(total)}</td>
                </tr>
                <tr>
                  <td colSpan="3"></td>
                  <td >Ongkos Kirim</td>
                  <td>{convertRupiah.convert(transaction.shipping_cost)}</td>
                </tr>
                <tr>
                  <td colSpan="3"></td>
                  <td >Administrasi</td>
                  <td>{convertRupiah.convert(transaction.administrative_cost)}</td>
                </tr>
                <tr>
                  <td colSpan="3"></td>
                  <td ><h5>Total</h5></td>
                  <td>{convertRupiah.convert(transaction.total_amount)}</td>
                </tr>
                </tbody>
              </Table>

            )}

          </Col>
        </Row>
        <Row className='mx-auto'>
          <Col>
            <div>Catatan</div>
            <div className='border p-2 rounded' style={{
              minHeight: '100px',
              wordWrap: 'break-word'
            }}>{transaction.note}</div>
          </Col>

        </Row>
      </Modal.Body>

    </Modal>
  )
}