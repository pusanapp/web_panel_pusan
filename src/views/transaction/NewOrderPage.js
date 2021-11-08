import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {transactionDispatch} from "./redux/transactionRedux";
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CRow} from "@coreui/react";
import moment from "moment";
import "moment/locale/id"
import ConfirmationOrderDialog from "../../reusable/transaction/ConfirmationOrderDialog";
const NewOrderPage = (props) =>{
  const fields = ['date','invoice_number','payment_method', 'total_amount', 'payment_status', 'status']
  const [confirmationDialogVisibility, setConfirmationDialogVisibility] = useState(false)
  const [transaction, setTransaction] = useState({})

  const showDialog = (data) =>{
    setConfirmationDialogVisibility(true)
    setTransaction(data)
  }
  const hideDialog = () =>{
    setConfirmationDialogVisibility(false)
    setTransaction({})
  }

  const submitConfirm = ()=>{
    console.log(transaction.id)
    props.orderConfirmation(transaction.id)
    hideDialog()
  }
  useEffect(()=>{
    props.loadNewOrder()
  },[])
  return(
    <>
      <ConfirmationOrderDialog submit={submitConfirm} show={confirmationDialogVisibility} onHide={hideDialog} transaction={transaction}/>
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
            striped
            sorter
            hover
            clickableRows
            loading={props.loading}
            onRowClick={(item) =>showDialog(item)}
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
    new_orders: state.transaction.new_orders
  }
}
export default connect(mapStateToProps, transactionDispatch)(NewOrderPage)
