import React, {useEffect} from "react";
import {connect} from "react-redux";
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CRow} from "@coreui/react";
import {transactionDispatch} from "./redux/transactionRedux";

const InputResiPage = (props) =>{
  const fields = ['invoice_number','payment_method', 'total_amount', 'payment_status', 'status']

  useEffect(()=>{
    props.loadOnProcessTransaction()
  },[])
  return(
    <>
      <CCard>
        <CCardHeader>
          Transaksi Diproses
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
            items={props.transactions}
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
    on_process_transactions: state.transaction.on_process_transactions
  }
}
export default connect(mapStateToProps, transactionDispatch)(InputResiPage)
