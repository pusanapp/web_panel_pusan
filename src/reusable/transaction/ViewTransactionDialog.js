import React, {useEffect, useState} from "react";
import {Modal, Image, Row, Col,Table} from "react-bootstrap";
import convertRupiah from "rupiah-format";
import moment from "moment";
import "moment/locale/id"
import {onDelivery, statusMapper} from "../../utils/statusMapper";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {transactionDispatch} from "../../views/transaction/redux/transactionRedux";
import {CButton} from "@coreui/react";

export const ViewTransactionDialog = ({show,hide,transaction}) => {
  const dispatch = useDispatch()
  const [trackingVisibility, setTrackingVisibility] = useState(false)
  let subTotal = 0;
  let specialPrice = 0;
  let total = 0;
  let type = '';
  const {
    tracking_status,
    tracking_data,
    tracking_loading,
    has_done,
    has_done_loading
  } = useSelector(state => state.transaction)
  console.log('has_done, ', has_done)
  useEffect(()=>{
    dispatch(transactionDispatch.checkHasFinish(transaction.id? transaction.id : 0))
  },[show])
  useEffect(()=>{
    if(trackingVisibility){
      const data = {
        waybill: transaction.shipping_number,
        service: transaction.shipping_expedition_code
      }
      console.log('trigger tracking, ', data)
      dispatch(transactionDispatch.trackDelivery(data))

    }
  },[trackingVisibility])
  return(
    <Modal
      show={show}
      size={'lg'}
      aria-labelledby="example-modal-sizes-title-lg"
      onHide={()=>{
        hide()
        setTrackingVisibility(false)
        dispatch(transactionDispatch.resetTrackingState())
      }}
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
          <div className='mt-3 mr-3'><p className='bg-behance px-2 py-1 rounded'>{statusMapper(transaction.status)}</p></div>
        </Row>
        <Row className='mx-auto bg-gray-100 mt-3 align-items-center rounded'>
          <Col className='pt-1'>
            <h5>Pembeli</h5>
          </Col>
        </Row>
        <Row className='mx-auto align-items-start justify-content-between'>
          <Col lg={7} sm={12} className='flex-wrap'>
            <div>Alamat Pengiriman : </div>
            <div>{transaction.customer_name}</div>
            <div>{transaction.phone_number}</div>
            <div style={{
              wordWrap: 'break-word'
            }}>{transaction.address}</div>
          </Col>
          <Col lg={5} sm={12}>
            <Row className='justify-content-end mx-auto'>
              <div>Metode Pembayaran : {transaction.payment_method}</div>
            </Row>
            <Row className='justify-content-end mx-auto'>
              <div>Status Pembayaran : {transaction.payment_status}</div>
            </Row>
            <Row className='justify-content-end mx-auto'>
              <div>Kurir : {transaction.shipping_expedition_service}</div>
            </Row>
            {onDelivery(transaction.status) && (
              <>
                <Row className='justify-content-end mx-auto'>
                  <div>No Resi : {transaction.shipping_number}</div>
                </Row>
                <Row className='justify-content-end mx-auto'>
                  <button onClick={()=>{
                    setTrackingVisibility(!trackingVisibility)
                  }} className='btn btn-info text-white'>Lacak Pengiriman</button>
                </Row>
              </>
            )}
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
        <Row className='mx-auto'>
          <Col>
            <div>Catatan2</div>
            <div className='border p-2 rounded' style={{
              minHeight: '50px',
              wordWrap: 'break-word'
            }}>{transaction.note}</div>
          </Col>

        </Row>
        {trackingVisibility && (
          <>
            <Row className='mx-auto bg-gray-100 mt-3 align-items-center rounded'>
              <Col className='pt-1'>
                <h5>Lacak Pengiriman</h5>
              </Col>
            </Row>
            {tracking_loading? (
              <Row className='mx-auto'>
                <Col>
                  <div>LOADING...</div>
                </Col>
              </Row>
            ): (
              <>
                {tracking_data && (
                  <>
                    <Row className='mx-auto'>
                      <Col>
                        <div>Status Pengiriman: {tracking_data.delivery_status.status}</div>
                        <div className='mt-1'>
                          <ul className="list-group list-group-flush">
                            {tracking_data.manifest.map((track, index) => (
                              <li key={index} className="list-group-item"><span className='font-weight-bold'>{moment(track.manifest_date).format('LL')} | {track.manifest_time}</span>
                                <br />{track.manifest_description}</li>
                            ))}
                          </ul>
                        </div>
                      </Col>

                    </Row>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Modal.Body>
      {onDelivery(transaction.status) && (
        <Modal.Footer>
          <div className='col'>
            {(has_done && !has_done_loading) && (
                <>
                  <div className='row mx-auto'>
                    <span>*Menunggu konfirmasi dari user</span>
                  </div>
                </>

            )  }
            {(!has_done && !has_done_loading) && (
              <>
                <div className='row mx-auto'>
                  <span>*Pastikan status pesanan adalah terkirim[DELIVERED].</span>
                </div>
                <div className='row mx-auto justify-content-end'>
                  <CButton
                    color="success"
                    onClick={()=>{
                      dispatch(transactionDispatch.finishTransaction(transaction.id))
                      hide()
                      setTrackingVisibility(false)
                      dispatch(transactionDispatch.resetTrackingState())
                    }}
                  >Pesanan Selesai</CButton>
                </div>
              </>
            )}
          </div>



        </Modal.Footer>
      )}

    </Modal>
  )
}


