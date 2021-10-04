import React, {useEffect} from "react";
import {connect} from "react-redux";
import {transactionDispatch} from "./redux/transactionRedux";
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CRow} from "@coreui/react";

const NewOrderPage = (props) =>{
  const fields = ['invoice_number','payment_method', 'total_amount', 'payment_status', 'status']

  useEffect(()=>{
    props.loadNewOrder()
  },[])
  return(
    <>
      <CCard>
        <CCardHeader>
          Pesanan Baru
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
            items={props.new_orders}
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
    new_orders: state.transaction.new_orders
  }
}
export default connect(mapStateToProps, transactionDispatch)(NewOrderPage)
