import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {transactionDispatch} from "./redux/transactionRedux";
import {
  CCard,
  CBadge,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInput,
  CRow,
  CToast, CToastBody, CToaster,
  CToastHeader
} from "@coreui/react";
import {groupFilterStatus} from "../../utils/filterHelper";
import moment from "moment";
import "moment/locale/id"
import {ViewTransactionDialog} from "../../reusable/transaction/ViewTransactionDialog";
import {Row} from "react-bootstrap";
import {subscribePayment, unSubscribePayment} from "../../utils/socketHelper";
import convertRupiah from "rupiah-format";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTransactionPage = (props) =>{
  const [viewVisibility, setViewVisibility] = useState(false)
  const [transaction, setTransaction] = useState({})

  const [filterStatus, setFilterStatus] = useState('')
  const { SearchBar } = Search;
  const onChangeFilterStatus = (event) =>{
    setFilterStatus(event.target.value)
  }
  const notify = (data) => {
    console.log(data)
    toast.success(`Menerima Pembayaran Sebesar ${convertRupiah.convert(data.payment_amount)}, dari ${data.from}
    dengan Metode Pembayaran ${data.method}`,{
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      // closeOnClick: true,
      // pauseOnHover: true,
      // draggable: true,
      // progress: undefined,
    });
  }
  const showViewDialog = (data) => {
    setViewVisibility(true)
    setTransaction(data)
  }
  const hideViewDialog = () => {
    setViewVisibility(false)
    setTransaction({})
  }


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
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      showViewDialog(row)
    },
  };
  const listener = (data) => {
    console.log(data)
    console.log('listen')
    notify(data)

    props.loadAllTransaction()
  }
  useEffect(()=>{
    subscribePayment(listener)
    props.loadAllTransaction()
    return () => {
      unSubscribePayment(listener)
    }
  },[])
  return(
    <>
      <ToastContainer />
      <ViewTransactionDialog show={viewVisibility} transaction={transaction} hide={hideViewDialog}/>
      <CCard>
        <CCardHeader>
          Semua Transaksi
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol>
              <ToolkitProvider
                keyField="id"
                data={props.transactions}
                // data={groupFilterStatus(props.transactions,'status',filterStatus)}
                columns={columns}
                search
              >
                {(props) => (
                  <div>
                    <div className="row align-items-center justify-content-between mx-auto">
                      <SearchBar {...props.searchProps} />
                      <CFormGroup>
                        <select className='form-control' onChange={onChangeFilterStatus}>
                          <option value={''}>Semua</option>
                          <option value={'NEW ORDER'}>Pesanan Baru</option>
                          <option value={'ON PROCESS'}>Pesanan Diproses</option>
                          <option value={'ON DELIVERY'}>Dalam Pengiriman</option>
                          <option value={'DONE'}>Pesanan Selesai</option>
                        </select>
                      </CFormGroup>
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      // remote
                      striped
                      rowEvents={rowEvents}
                      pagination={paginationFactory()}
                      noDataIndication={() => (
                        <div>No data found</div>
                      )}
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
    transactions: state.transaction.transactions
  }
}
export default connect(mapStateToProps, transactionDispatch)(AllTransactionPage)
