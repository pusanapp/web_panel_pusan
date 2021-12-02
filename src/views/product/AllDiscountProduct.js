import React, {useEffect, useState} from "react";
import {
  CButton,
  CImg,
  CRow,
  CInput,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CLabel,
  CFormText, CFormGroup,
  CTextarea,
  CSelect, CDataTable, CAlert, CToast, CToastHeader, CToastBody, CToaster,
} from "@coreui/react";
import {Link} from "react-router-dom";
import {FaEye, FaPencilAlt, FaTrashAlt} from "react-icons/all";
import {connect, useDispatch} from "react-redux";
import {discountDispatch} from "./redux/discountRedux";
import {AddDiscountProductDialog} from "../../reusable/product/AddDiscountProductDialog";
import {productDispatch} from "./redux/productRedux";
import DeleteDialog from "../../reusable/dialogs/DeleteDialog";
import {ViewDiscountDialog} from "../../reusable/product/ViewDiscountDialog";

import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";

const AllDiscountProduct = (props) => {
  const dispatch = useDispatch()
  const [addProductVisibility, setAddProductVisibility] = useState(false)
  const [addedProducts, setAddedProducts] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(true)

  const [deleteVisibility, setDeleteVisibility] = useState(false)
  const [deletedId, setDeletedId] = useState(0)
  const showDelete = (data) =>{
    setDeletedId(data)
    setDeleteVisibility(true)
  }
  const hideDelete = () => {
    setDeletedId(0)
    setDeleteVisibility(false)
  }
  const deleteDiscount = () => {
    props.deleteDiscount(deletedId)
    hideDelete()
  }

  console.log('STATUS KUUUU,',props.status)
  const onChangeName = (event) => {
    setName(event.target.value)
  }
  const onChangeDescription = (event) => {
    setDescription(event.target.value)
  }
  const onChangeStatus = (event) => {
    setStatus(event.target.value)
  }
  const submitAddProduct = (data) => {
    addedProducts.push(data)
    console.log(addedProducts)
    setAddedProducts([...addedProducts])
    hideAddProductVisibility()
  }

  const removeAddedProduct = (index) => {
    console.log(index)
    addedProducts.splice(index, 1);
    console.log(addedProducts);
    setAddedProducts([...addedProducts]);
  };
  const showAddFormToggle = (event) => {
    props.showAddDiscountToggle(!props.addFormVisibility)
    event.preventDefault()
  }
  const showAddProductDialog = () => {
    setAddProductVisibility(true)
  }
  const hideAddProductVisibility = () => {
    setAddProductVisibility(false)
  }
  console.log(addedProducts)
  const productFields = [
    'name',
    'harga diskon',
    'stock',
    'action'
  ]
  const { SearchBar } = Search;

  const discountColumns = [
    {
      dataField: 'name',
      text: 'Nama',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      formatter: (cell, row) => {
        return(
          <>
            {row.status ? 'Active' : 'Non Active'}
          </>
        )
      },
      sort: true,
    },
    {
      dataField: 'app_product.length',
      text: 'Total Produk',
      sort: true,
    },
    {
      dataField:'action',
      text: 'Action',
      formatter: (cell, row) => {
        return(
          <>
            <a >
                    <span>
                      <FaEye color="blue"/>
                    </span>
            </a>
            <a className={'ml-3'}>
                    <span>
                      <FaPencilAlt color="green"/>
                    </span>
            </a>
            <a className='ml-3' onClick={()=>{showDelete(row.id)}}>
              <span><FaTrashAlt color="red"/></span>
            </a></>
        )
      }
    }
  ]



  const submitAddDiscount = () => {
    const data = {
      name: name,
      description: description,
      status: status,
      discount_amount: 0
    }
    const payload = {
      data: data,
      products: addedProducts
    }
    // console.log(payload)
    console.log(payload)
    props.addNewDiscount(payload)
    setName('')
    setDescription('')
    setStatus(true)
    setAddedProducts([])
  }



  useEffect(() => {
    props.loadAllDiscount()
    dispatch(productDispatch.loadAllProduct())
    return ()=>{
      props.showAddDiscountToggle(false)
    }
  }, [])
  return (

    <>
      {/*<ViewDiscountDialog/>*/}
      <DeleteDialog show={deleteVisibility} onDelete={deleteDiscount} onHide={hideDelete} item={'Diskon'}/>
      <AddDiscountProductDialog show={addProductVisibility} products={props.products} submit={submitAddProduct}
                                hide={hideAddProductVisibility}/>
      <CRow>
        <CCol lg={props.addFormVisibility ? '7' : '12'}>
          <CCard>
            <CCardBody>
              <CToaster
                position={'top-right'}
                key={'toaster' + 'top-right'}
              >

                      <CToast
                        key={'toast' + 0}
                        show={props.status}
                        autohide={5000}
                        fade={true}
                        color={'success'}
                        onStateChange={(state)=>{
                          if (state==='hiding'){
                            props.resetDiscountStatus()
                          }
                        }}
                      >
                        <CToastHeader closeButton>
                          Toast title
                        </CToastHeader>
                        <CToastBody>
                          {`Data Diskon Disimpan`}
                        </CToastBody>
                      </CToast>

              </CToaster>
              <CRow>
                <CCol>

                    <ToolkitProvider
                      keyField="id"
                      data={props.discounts}
                      columns={discountColumns}
                      search
                    >
                      {(props) => (
                        <div>
                          <div className="row align-items-center justify-content-between mx-auto">
                            <SearchBar {...props.searchProps} />
                            <button
                              className="col-auto btn btn-success"
                              onClick={showAddFormToggle}
                            >
                              Tambah Baru
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
                            loading={props.loading}
                            bootstrap4
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
        </CCol>
        {(props.addFormVisibility) && (
          <CCol lg={'5'}>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="name">Nama Diskon</CLabel>
                      <CInput id="name" placeholder="Masukkan Nama Diskon" required
                              onChange={onChangeName}/>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">Deskripsi</CLabel>
                      <CTextarea  id="name" placeholder="Masukkan Deskripsi"
                                 onChange={onChangeDescription} required/>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">Status</CLabel>
                      <CSelect required onChange={onChangeStatus} >
                        <option value={true}>Active</option>
                        <option value={false}>Non Active</option>
                      </CSelect>
                    </CFormGroup>
                    <CFormGroup>

                      <CCol lg={'12'}>
                        <CRow className={"align-items-center justify-content-between"}>
                          <div>Produk</div>
                          <CButton color={'success'} onClick={showAddProductDialog}>Tandai Produk</CButton>
                        </CRow>
                      </CCol>
                      <div className="mt-2">
                        <CDataTable
                          items={addedProducts}
                          fields={productFields}
                          itemsPerPage={8}
                          loading={props.loading}
                          sorter
                          pagination
                          scopedSlots={{
                            'harga diskon': (item) => (
                              <td>{item.discount_price}</td>
                            ),
                            'action': (item, index) => (
                              <td>
                                <a onClick={() => {
                                  removeAddedProduct(index)
                                }}>
                                  <span><FaTrashAlt color="red"/></span>
                                </a>
                              </td>
                            )
                          }}
                        />
                      </div>
                    </CFormGroup>
                    <CRow className={'mx-auto justify-content-end'}>
                      <CButton color={'info'} onClick={submitAddDiscount}>
                        Simpan
                      </CButton>
                    </CRow>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        )}
      </CRow>
    </>

  )
}
const mapStateToProps = (state) => {
  return {
    discounts: state.discount.discounts,
    loading: state.discount.loading,
    products: state.product.products,
    status: state.discount.status,
    addFormVisibility: state.discount.addFormVisibility
  }
}
export default connect(mapStateToProps, discountDispatch)(AllDiscountProduct)
