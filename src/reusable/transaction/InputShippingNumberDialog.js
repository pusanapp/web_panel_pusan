import React, {useState} from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CModalTitle,
  CCol,
  CInput,
  CLabel,
  CFormGroup
} from "@coreui/react";
import moment from "moment";
import "moment/locale/id"
import convertRupiah from "rupiah-format";
import {Modal, Row, Col, Table} from 'react-bootstrap'
import {statusMapper} from "../../utils/statusMapper";

const InputShippingNumberDialog =({show, transaction, onHide, submit}) =>{
  const [resi, setResi] = useState('')
  let subTotal = 0;
  let specialPrice = 0;
  let total = 0;
  let type = '';

  const onChangeInput = (event) => {
    setResi(event.target.value)
  }
  const resetState = ()=>{
    setResi('')
  }
  return (
    <Modal
      show={show}
      size={'lg'}
      aria-labelledby="example-modal-sizes-title-lg"
      onHide={onHide}
    >
      <Modal.Header >
        <Modal.Title id="example-modal-sizes-title-lg">Input Resi Pengiriman</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="justify-content-between bg-gray-100 rounded align-items-center mx-auto">
          <Col className='pt-3'>
            <div><h5>No. Invoice #{transaction.invoice_number}</h5></div>
            <div><p>Tanggal dibuat : {moment(transaction.createdAt).format('lll')}</p></div>

          </Col>
          <div className='mt-3 mr-3'><p className='bg-behance px-2 py-1 rounded'>{statusMapper(transaction.status)}</p></div>
        </Row>
        <Row className='mx-auto bg-gray-100 mt-3 align-items-center rounded'>
          <Col className='pt-1'>
            <h5>Pembeli</h5>
          </Col>
        </Row>
        <Row className='mx-auto align-items-start justify-content-between'>
          <Col lg={8} sm={12} className='flex-wrap'>
            <div>Alamat Pengiriman : </div>
            <div>{transaction.customer_name}</div>
            <div>{transaction.phone_number}</div>
            <div style={{
              wordWrap: 'break-word'
            }}>{transaction.address}</div>
          </Col>
          <Col lg={4} sm={12}>
            <Row className='justify-content-end mx-auto'>
              <div>Metode Pembayaran : {transaction.payment_method}</div>
            </Row>
            <Row className='justify-content-end mx-auto'>
              <div>Status Pembayaran : {transaction.payment_status}</div>
            </Row>
            <Row className='justify-content-end mx-auto'>
              <div>Kurir : {transaction.shipping_expedition_service}</div>
            </Row>
          </Col>
        </Row>
        <Row className='mx-auto mt-3'>
          <Col>
            {transaction.transaction_product && (
              <Table striped bordered hover size="sm">
                <thead>
                <tr>
                  <th style={{
                    'textAlign': 'center'
                  }}>Kode</th>
                  <th style={{
                    'textAlign': 'center'
                  }}>Nama Produk</th>
                  <th style={{
                    'textAlign': 'center'
                  }}>Qty</th>
                  <th style={{
                    'textAlign': 'center'
                  }}>Harga</th>
                  <th style={{
                    'textAlign': 'center'
                  }}>Harga Spesial</th>
                  <th style={{
                    'textAlign': 'center'
                  }}>Total</th>
                </tr>
                </thead>
                <tbody>
                {transaction.transaction_product.map(product=>{
                  if(product.discount_price){
                    total = product.product_qty*product.discount_price
                    subTotal += total
                    specialPrice = product.discount_price
                    type = '(Diskon)'
                  }else if(product.combo_price){
                    total = product.product_qty*product.combo_price
                    subTotal += total
                    specialPrice = product.combo_price
                    type = '(Combo)'

                  }else if(product.grosir_price){
                    total = product.product_qty*product.grosir_price
                    subTotal += total
                    specialPrice = product.grosir_price
                    type = '(Grosir)'
                  }else {
                    total = product.product_qty * product.product_price
                    subTotal += total
                    specialPrice = 0
                    type = ''
                  }
                  return(
                    <tr key={product.id}>
                      <td style={{
                        'textAlign': 'center'
                      }}>{product.product_code}</td>
                      <td>{product.product_name}</td>
                      <td style={{
                        'textAlign': 'center'
                      }}>{product.product_qty}</td>
                      <td style={{
                        'textAlign': 'center'
                      }}>{convertRupiah.convert(product.product_price)}</td>
                      <td style={{
                        'textAlign': 'center'
                      }}>{type} {convertRupiah.convert(specialPrice)}</td>
                      <td style={{
                        'textAlign': 'right'
                      }}>{convertRupiah.convert(total)}</td>
                    </tr>
                  )
                })}

                <tr>
                  <td colSpan="4"></td>
                  <td style={{
                    'textAlign': 'right'
                  }}>Sub Total</td>
                  <td style={{
                    'textAlign': 'right'
                  }}>{convertRupiah.convert(subTotal)}</td>
                </tr>
                <tr>
                  <td colSpan="4"></td>
                  <td style={{
                    'textAlign': 'right'
                  }}>Ongkos Kirim</td>
                  <td style={{
                    'textAlign': 'right'
                  }}>{convertRupiah.convert(transaction.shipping_cost)}</td>
                </tr>
                <tr>
                  <td colSpan="4"></td>
                  <td style={{
                    'textAlign': 'right'
                  }}>Administrasi</td>
                  <td style={{
                    'textAlign': 'right'
                  }}>{convertRupiah.convert(transaction.administrative_cost)}</td>
                </tr>
                <tr>
                  <td colSpan="4"></td>
                  <td style={{
                    'textAlign': 'right'
                  }}><h5>Total</h5></td>
                  <td style={{
                    'textAlign': 'right'
                  }}>{convertRupiah.convert(transaction.total_amount)}</td>
                </tr>
                </tbody>
              </Table>

            )}

          </Col>
        </Row>
        <Row className='mx-auto d-flex flex-wrap'>
          <Col>
            <div>Catatan</div>
            <div className='border p-2 rounded' style={{
              minHeight: '50px',
              wordWrap: 'break-word'
            }}>{transaction.note}</div>
          </Col>

        </Row>
        <Row className='mx-auto mt-3'>
          <Col>
            <div>Input Resi Pengiriman</div>
            <CInput placeholder='Resi Pengiriman' required onChange={onChangeInput}/>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <div className='col'>
          <div className='row mx-auto justify-content-end'>
            <CButton className='mr-2' color="danger" onClick={()=>{
              onHide()
              resetState()
            }}>Batal</CButton>{' '}
            <CButton
              color="success"
              onClick={()=>{
                const data = {
                  shipping_number: resi
                }
                if(resi){
                  console.log(data)
                  submit(data)
                }else {
                  alert('Tolong masukkan resi pengiriman')
                }
                resetState()
              }}
            >Konfirmasi</CButton>
          </div>

        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default InputShippingNumberDialog
