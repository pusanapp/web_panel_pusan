import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {CBadge, CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CRow} from "@coreui/react";
import {transactionDispatch} from "./redux/transactionRedux";
import moment from "moment";
import "moment/locale/id"
import InputShippingNumberDialog from "../../reusable/transaction/InputShippingNumberDialog";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";
import convertRupiah from "rupiah-format";

const InputResiPage = (props) =>{
  const fields = ['date','invoice_number','payment_method', 'total_amount', 'payment_status', 'status']
  const [inputDialogVisibility, setInputDialogVisibility] = useState(false)
  const [transaction, setTransaction] = useState({})
  const { SearchBar } = Search;

  const columns = [
    {
      dataField: 'createdAt',
      text: 'Tanggal',
      sort: true,
      formatter: (coll, row) => {
        return(
          <>{moment(row.createdAt).format('lll')}</>
        )
      }
    },
    {
      dataField: 'invoice_number',
      text: 'Invoice',
    },
    {
      dataField: 'payment_method',
      text: 'Metode Pembayaran',
      sort: true
    },
    {
      dataField: 'total_amount',
      text: 'Total Pembayaran',
      sort: true,
      formatter: (cell,row) => {
        return(
          <>{convertRupiah.convert(row.total_amount)}</>
        )
      }
    },
    {
      dataField: 'payment_status',
      text: 'Status Pembayaran',
      sort: true,
      formatter: (cell, row) => {
        if (row.payment_status === 'BELUM BAYAR') {
          return(
            <CBadge color='danger'>Belum Dibayar</CBadge>
          )
        }else if(row.payment_status === 'DIBAYAR'){
          return(
            <CBadge color='success'>Sudah Dibayar</CBadge>
          )
        }
      }
    },
    {
      dataField: 'status',
      text: 'Status Pesanan',
      sort: true,
    }
  ]

  const showDialog = (data) =>{
    setInputDialogVisibility(true)
    setTransaction(data)
  }
  const hideDialog = () =>{
    setInputDialogVisibility(false)
    setTransaction({})
  }
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      showDialog(row)
    },
  };
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
          Pesanan Diproses
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <ToolkitProvider
                keyField="id"
                data={props.on_process_transactions}
                columns={columns}
                search
              >
                {(props) => (
                  <div>
                    <div className="row align-items-center justify-content-between mx-auto">
                      <SearchBar {...props.searchProps} />
                      {/*<button*/}
                      {/*  className="col-auto btn btn-success font-weight-bold"*/}
                      {/*  onClick={showAddFormToggle}*/}
                      {/*>*/}
                      {/*  Tambah Baru*/}
                      {/*</button>*/}
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      // remote
                      striped
                      pagination={paginationFactory()}
                      noDataIndication={() => (
                        <div>No data found</div>
                      )}
                      rowEvents={rowEvents}
                      loading={props.loading}
                      bootstrap4
                      hover
                      bordered={false}
                      // onTableChange={onTableChange}
                      overlay={overlayFactory({
                        spinner: true,
                        styles: {
                          overlay: (base) => ({
                            ...base,
                            background:
                              "rgba(192,192,192,0.5)",
                          }),
                        },
                      })}
                    />
                  </div>
                )}
              </ToolkitProvider>
            </CCol>
          </CRow>

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
