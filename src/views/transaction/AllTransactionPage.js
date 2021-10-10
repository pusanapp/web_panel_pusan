import React, {useEffect} from "react";
import {connect} from "react-redux";
import {transactionDispatch} from "./redux/transactionRedux";
import {CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CRow} from "@coreui/react";
import {searchFilter} from "../../utils/filterHelper";
import {Link} from "react-router-dom";
import {FaEye, FaPencilAlt, FaTrashAlt} from "react-icons/all";
import moment from "moment";
import "moment/locale/id"

const AllTransactionPage = (props) =>{

  const fields = ['date','invoice_number','payment_method', 'total_amount', 'payment_status', 'status']

  useEffect(()=>{
    props.loadAllTransaction()
  },[])
  return(
    <>
      <CCard>
        <CCardHeader>
          Semua Transaksi
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
            striped
            hover
            clickableRows
            loading={props.loading}
            onRowClick={(item) => {console.log(item)}}
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
