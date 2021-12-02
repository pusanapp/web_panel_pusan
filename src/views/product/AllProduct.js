import React, {useEffect, useState} from "react";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CDataTable,
  CButton,
  CCol,
  CFormGroup,
  CLabel,
  CInput, CRow
} from "@coreui/react";
import usersData from "../users/UsersData";
import {DocsLink} from "../../reusable";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {tesAction} from "../../redux/tesRedux";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";

import {productDispatch} from "./redux/productRedux";
import CIcon from '@coreui/icons-react'
import DeleteDialog from "../../reusable/dialogs/DeleteDialog";
import {searchFilter} from "../../utils/filterHelper";
import {FaPencilAlt, FaTrashAlt, FaEye} from "react-icons/all";
import {subscribeToChat} from "../../utils/socketHelper";
import {ViewProductDialog} from "../../reusable/product/ViewProductDialog";
import convertRupiah from "rupiah-format";

const AllProduct = (props) => {
  const history = useHistory()

  const [search, setSearch] = useState(false)
  const [deleteVisibility, setDeleteVisibility] = useState(false)
  const [viewVisibility, setViewVisibility] = useState(false)
  const [viewedProduct, setViewedProduct] = useState({})
  const [deletedId, setDeletedId] = useState(-1)

  const actionFormatter = (cell, row)=> {
    return(
      <>
        <a onClick={() => {
          viewProduct(row)
        }}>
                    <span>
                      <FaEye color="blue"/>
                    </span>
        </a>
        <Link className='ml-3' to={'/'}>
                    <span>
                      <FaPencilAlt color="green"/>
                    </span>
        </Link>
        <a className='ml-3' onClick={() => showDeleteDialog(row)}>
          <span><FaTrashAlt color="red"/></span>
        </a>
      </>
    )
  }
  const { SearchBar } = Search;
  const columns = [
    {
      dataField: 'name',
      text: 'Nama Produk',
      sort: true
    },
    {
      dataField: 'code',
      text: 'Kode Produk',
      sort: true
    },
    {
      dataField: 'price',
      text: 'Harga',
      sort: true,
      formatter: (cell,row) => {
        return(
          <>{convertRupiah.convert(row.price)}</>
        )
      }
    },
    {
      dataField: 'brand',
      text: 'Merk',
      sort: true
    }, {
      dataField: 'category',
      text: 'Kategori',
      sort: true
    },
    {
      dataField: 'hafara_product.stock',
      text: 'Stock',
      sort: true
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: actionFormatter
    }
  ]
  const onTableChange = (type, {filters}) => {
    console.log('TYPE, ',type)
    console.log('FILTERS, ',filters)
  }



  const showDeleteDialog = (data) => {
    setDeleteVisibility(true)
    setDeletedId(data.id)
  }
  const hideDeleteDialog = () => {
    setDeleteVisibility(false)
    setDeletedId(-1)
  }
  const onChangeSearch = (event) => {
    setSearch(event.target.value)
  }
  const deleteProduct = () => {
    props.deleteProduct(deletedId)
    hideDeleteDialog()
  }
  const viewProduct = (data) => {
    setViewVisibility(true)
    setViewedProduct(data)
  }
  const hideViewProduct = () => {
    setViewVisibility(false)
    setViewedProduct({})
  }


  useEffect(() => {
    props.loadAllProduct()
    subscribeToChat()
  }, [])

  return (
    <>
      <DeleteDialog show={deleteVisibility} onHide={hideDeleteDialog} item={"produk"} onDelete={deleteProduct}/>
      <ViewProductDialog show={viewVisibility} hide={hideViewProduct} product={viewedProduct}/>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol>
              <ToolkitProvider
                keyField="id"
                data={props.products}
                columns={columns}
                search
              >
                {(props) => (
                  <div>
                    <div className="row align-items-center justify-content-between mx-auto">
                      <SearchBar {...props.searchProps} />
                      <button
                        className="col-auto btn btn-success"
                        onClick={() => history.push('/pusan/products/add')}
                      >
                        Tambah Produk Baru
                      </button>
                    </div>
                    <BootstrapTable
                      {...props.baseProps}
                      // remote
                      striped
                      pagination={paginationFactory()}
                      noDataIndication={() => (
                        <div>No data found</div>
                      )}
                      hover
                      loading={props.loading}
                      bootstrap4
                      bordered={false}
                      onTableChange={onTableChange}
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
const mapStateToProps = (state) => {
  console.log('STATE, ', state)
  return {
    products: state.product.products,
    loading: state.product.loading
  }
}
export default connect(mapStateToProps, productDispatch)(AllProduct)
