import React, {useEffect} from "react";
import {connect} from "react-redux";
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CRow} from "@coreui/react";
import {transactionDispatch} from "./redux/transactionRedux";

const DoneTransactionPage = (props) =>{
  const fields = ['invoice_number','payment_method', 'total_amount', 'payment_status', 'status']

  useEffect(()=>{
    props.loadDoneTransaction()
  },[])
  return(
    <>
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
            sorter
            loading={props.loading}
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
