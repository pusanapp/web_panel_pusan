import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {transactionDispatch} from "./redux/transactionRedux";
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CRow} from "@coreui/react";
import {groupFilterStatus} from "../../utils/filterHelper";
import moment from "moment";
import "moment/locale/id"
import {ViewTransactionDialog} from "../../reusable/transaction/ViewTransactionDialog";
import {Row} from "react-bootstrap";
const AllTransactionPage = (props) =>{
  const [viewVisibility, setViewVisibility] = useState(false)
  const [transaction, setTransaction] = useState({})
  const fields = ['date','invoice_number','payment_method', 'total_amount', 'payment_status', 'status']
  const [filterStatus, setFilterStatus] = useState('')

  const onChangeFilterStatus = (event) =>{
    setFilterStatus(event.target.value)
  }
  const showViewDialog = (data) => {
    setViewVisibility(true)
    setTransaction(data)
  }
  const hideViewDialog = () => {
    setViewVisibility(false)
    setTransaction({})
  }
  useEffect(()=>{
    props.loadAllTransaction()
  },[])
  return(
    <>
      <ViewTransactionDialog show={viewVisibility} transaction={transaction} hide={hideViewDialog}/>
      <CCard>
        <CCardHeader>
          Semua Transaksi
        </CCardHeader>
        <CCardBody>
          <CCol>
            <CRow className="justify-content-between m-auto">
              <CCol>
                <Row className='justify-content-between'>
                  <CFormGroup>
                    <CInput id="name"  placeholder="Search" />
                  </CFormGroup>
                  <Row>
                    <CFormGroup>
                      <select className='form-control' onChange={onChangeFilterStatus}>
                        <option value={''}>Semua</option>
                        <option value={'NEW ORDER'}>Pesanan Baru</option>
                        <option value={'ON PROCESS'}>Pesanan Diproses</option>
                        <option value={'ON DELIVERY'}>Dalam Pengiriman</option>
                        <option value={'DONE'}>Pesanan Selesai</option>
                      </select>
                    </CFormGroup>
                    {/*<CFormGroup className={'ml-2'} >*/}
                    {/*  <select className='form-control'>*/}
                    {/*    <option>Semua</option>*/}
                    {/*    <option>Pesanan Baru</option>*/}
                    {/*    <option>Pesanan Diproses</option>*/}
                    {/*    <option>Dalam Pengiriman</option>*/}
                    {/*    <option>Pesanan Selesai</option>*/}
                    {/*  </select>*/}
                    {/*</CFormGroup>*/}
                  </Row>

                </Row>
              </CCol>
            </CRow>
          </CCol>
          <CDataTable
            items={groupFilterStatus(props.transactions,'status',filterStatus)}
            fields={fields}
            itemsPerPage={10}
            pagination
            sorter
            striped
            hover
            clickableRows
            loading={props.loading}
            onRowClick={(item) => {showViewDialog(item)}}
            scopedSlots = {{
              'date': (item)=>(
                <td>
                  {moment(item.createdAt).format('lll')}
                </td>
              )
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

const mapStateToProps = (state)=>{
  return{
    transactions: state.transaction.transactions
  }
}
export default connect(mapStateToProps, transactionDispatch)(AllTransactionPage)
