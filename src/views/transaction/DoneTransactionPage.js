import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CRow} from "@coreui/react";
import {transactionDispatch} from "./redux/transactionRedux";
import moment from "moment";
import "moment/locale/id"
import {ViewTransactionDialog} from "../../reusable/transaction/ViewTransactionDialog";

const DoneTransactionPage = (props) =>{
  const [viewVisibility, setViewVisibility] = useState(false)
  const [transaction, setTransaction] = useState({})
  const fields = ['date','invoice_number','payment_method', 'total_amount', 'payment_status', 'status']
  const showViewDialog = (data) => {
    setViewVisibility(true)
    setTransaction(data)
  }
  const hideViewDialog = () => {
    setViewVisibility(false)
    setTransaction({})
  }
  useEffect(()=>{
    props.loadDoneTransaction()
  },[])
  return(
    <>
      <ViewTransactionDialog show={viewVisibility} transaction={transaction} hide={hideViewDialog}/>
      <CCard>
        <CCardHeader>
          Transaksi Selesai
        </CCardHeader>
        <CCardBody>
          <CCol>
            <CRow className="justify-content-between">
              <CCol>
                <CRow>
                  <CFormGroup>
                    <CInput id="name"  placeholder="Search" />
                  </CFormGroup>
                </CRow>
              </CCol>
            </CRow>
          </CCol>
          <CDataTable
            items={props.done_transactions}
            fields={fields}
            itemsPerPage={10}
            pagination
            striped
            sorter
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
    done_transactions: state.transaction.done_transactions
  }
}
export default connect(mapStateToProps, transactionDispatch)(DoneTransactionPage)
