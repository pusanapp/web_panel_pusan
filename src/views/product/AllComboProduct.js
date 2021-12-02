import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CSelect,
  CTextarea, CToast, CToastBody, CToaster, CToastHeader
} from "@coreui/react";
import {comboDispatch} from "./redux/comboRedux";
import {ViewComboDialog} from "../../reusable/product/ViewComboDialog";
import {productDispatch} from "./redux/productRedux";
import {AddComboProductDialog} from "../../reusable/product/AddComboProductDialog";
import {FaEye, FaPencilAlt, FaTrashAlt} from "react-icons/all";
import DeleteDialog from "../../reusable/dialogs/DeleteDialog";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";

const AllComboProduct = (props) => {
  const dispatch = useDispatch()
  const [showAddForm, setShowAddForm] = useState(false)

  const [addProductVisibility, setAddProductVisibility] = useState(false)
  const [addedProducts, setAddedProducts] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(true)
  const [deleteVisibility, setDeleteVisibility] = useState(false)
  const [deletedId, setDeletedId] = useState(0)
  const onChangeName = (event) => {
    setName(event.target.value)
  }
  const onChangeDescription = (event) => {
    setDescription(event.target.value)
  }
  const onChangeStatus = (event) => {
    setStatus(event.target.value)
  }
  const showAddFormToggle = (event) => {
    // setShowAddForm(!showAddForm)
    props.showAddComboToggle(!props.addFormVisibility)
    event.preventDefault()
  }
  const showDeleteDialog = (data) => {
    setDeletedId(data)
    setDeleteVisibility(true)
  }
  const hideDeleteDialog = () => {
    setDeleteVisibility(false)
    setDeletedId(0)
  }
  const deleteCombo = ()=>{
    props.deleteCombo(deletedId)
    hideDeleteDialog()
  }
  const fields = [
    {
      key: 'combo_name',
      sort: true
    },
    'status',
    'total_produk',
    'action'
  ]
  const productFields = [
    'name',
    'harga combo',
    'stock',
    'action'
  ]
  const { SearchBar } = Search;

  const comboColumns = [
    {
      dataField: 'combo_name',
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
      dataField: 'app_products.length',
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
            <a className='ml-3' onClick={()=>{showDeleteDialog(row.id)}}>
              <span><FaTrashAlt color="red"/></span>
            </a></>
        )
      }
    }
  ]
  const showAddProductDialog = () => {
    setAddProductVisibility(true)
  }
  const removeAddedProduct = (index) => {
    console.log(index)
    addedProducts.splice(index, 1);
    console.log(addedProducts);
    setAddedProducts([...addedProducts]);
  };
  const hideAddProductVisibility = () => {
    setAddProductVisibility(false)
  }
  const submitAddProduct = (data) => {
    addedProducts.push(data)
    console.log(addedProducts)
    setAddedProducts([...addedProducts])
    hideAddProductVisibility()
  }

  const submitAddCombo = () => {
    const data = {
      combo_name: name,
      description: description,
      status: status,
      combo_price: 0
    }
    const payload = {
      data: data,
      products: addedProducts
    }
    console.log(payload)
    props.addNewCombo(payload)
    setName('')
    setDescription('')
    setStatus(true)
    setAddedProducts([])
  }
  useEffect(() => {
    dispatch(productDispatch.loadAllProduct())
    props.loadAllCombo()
    return () => {
      props.showAddComboToggle(false)
    }
  }, [])
  return (
    <>
      {/*<ViewComboDialog/>*/}
      <AddComboProductDialog products={props.products} show={addProductVisibility} hide={hideAddProductVisibility}
                             submit={submitAddProduct}/>
      <DeleteDialog show={deleteVisibility} onDelete={deleteCombo} item='Combo' onHide={hideDeleteDialog}/>
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
                  onStateChange={(state) => {
                    if (state === 'hiding') {
                      props.resetComboStatus()
                    }
                  }}
                >
                  <CToastHeader closeButton>
                    Toast title
                  </CToastHeader>
                  <CToastBody>
                    {`Data Combo Disimpan`}
                  </CToastBody>
                </CToast>

              </CToaster>
              <CRow>
                <CCol>
                  <ToolkitProvider
                    keyField="id"
                    data={props.combos}
                    columns={comboColumns}
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
        {props.addFormVisibility && (
          <CCol lg={'5'}>
            <CCard>
              <CCardBody>
                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="name">Nama Combo</CLabel>
                      <CInput id="name" placeholder="Masukkan Nama Combo" required onChange={onChangeName}/>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">Deskripsi</CLabel>
                      <CTextarea id="name" placeholder="Masukkan Deskripsi" required onChange={onChangeDescription}/>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">Status</CLabel>
                      <CSelect required onChange={onChangeStatus}>
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
                            'harga combo': (item) => (
                              <td>{item.combo_price}</td>
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
                      <CButton color={'info'} onClick={submitAddCombo}>
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
    loading: state.combo.loading,
    combos: state.combo.combos,
    products: state.product.products,
    status: state.combo.status,
    addFormVisibility: state.combo.addFormVisibility
  }
}

export default connect(mapStateToProps, comboDispatch)(AllComboProduct)
