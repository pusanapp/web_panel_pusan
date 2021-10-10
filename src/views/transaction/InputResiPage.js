import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CRow} from "@coreui/react";
import {transactionDispatch} from "./redux/transactionRedux";
import moment from "moment";
import "moment/locale/id"
import InputShippingNumberDialog from "../../reusable/dialogs/InputShippingNumberDialog";

const InputResiPage = (props) =>{
  const fields = ['date','invoice_number','payment_method', 'total_amount', 'payment_status', 'status']
  const [inputDialogVisibility, setInputDialogVisibility] = useState(false)
  const [transaction, setTransaction] = useState({})

  const showDialog = (data) =>{
    setInputDialogVisibility(true)
    setTransaction(data)
  }
  const hideDialog = () =>{
    setInputDialogVisibility(false)
    setTransaction({})
  }

  const submitConfirm = (data)=>{
    const payload = {
      data: data,
      id: transaction.id
    }
    console.log(payload)
    props.inputResi(payload)
    hideDialog()
  }
  useEffect(()=>{
    props.loadOnProcessTransaction()
  },[])
  return(
    <>
      <InputShippingNumberDialog show={inputDialogVisibility} transaction={transaction} onHide={hideDialog} submit={submitConfirm}/>
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
            items={props.on_process_transactions}
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
    on_process_transactions: state.transaction.on_process_transactions
  }
}
export default connect(mapStateToProps, transactionDispatch)(InputResiPage)
