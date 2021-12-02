import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {masterDispatch} from "./redux/masterRedux";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInput,
  CPagination,
  CRow,
  CImg
} from "@coreui/react";
import {Link} from "react-router-dom";
import {FaPencilAlt, FaTrashAlt} from "react-icons/all";
import {useHistory} from "react-router-dom";
import DeleteDialog from "../../reusable/dialogs/DeleteDialog";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";

const MasterPage = (props) => {
  const history = useHistory()
  const [deleteVisibility, setDeleteVisibility] = useState(false)
  const [deleteCategoryVisibility, setDeleteCategoryVisibility] = useState(false)
  const [deleteBrandVisibility, setDeleteBrandVisibility] = useState(false)

  const [deletedId, setDeletedId] = useState(-1)
  const [deletedCategoryId, setDeletedCategoryId] = useState(-1)
  const [deletedBrandId, setDeletedBrandId] = useState(-1)
  const showDeleteDialog = (id)=>{
    setDeleteVisibility(true)
    setDeletedId(id)
  }
  const hideDeleteDialog = ()=>{
    setDeleteVisibility(false)
    setDeletedId(-1)
  }
  const showDeleteBrandDialog = (id)=>{
    setDeleteBrandVisibility(true)
    setDeletedBrandId(id)
  }
  const hideDeleteBrandDialog = ()=>{
    setDeleteBrandVisibility(false)
    setDeletedBrandId(-1)
  }
  const showDeleteCategoryDialog = (id)=>{
    setDeleteCategoryVisibility(true)
    setDeletedCategoryId(id)
  }
  const hideDeleteCategoryDialog = ()=>{
    setDeleteCategoryVisibility(false)
    setDeletedCategoryId(-1)
  }
  const deleteType = () =>{
    console.log('delete')
    props.deleteProductType(deletedId)
    hideDeleteDialog()
  }
  const deleteCategory = () =>{
    console.log('delete')
    props.deleteProductCategory(deletedCategoryId)
    hideDeleteCategoryDialog()
  }
  const deleteBrand = () =>{
    console.log('delete')
    props.deleteProductBrand(deletedBrandId)
    hideDeleteBrandDialog()
  }
  useEffect(()=>{
    props.loadProductType()
    props.loadProductCategory()
    props.loadProductBrand()
  },[])
  const fields = [
    {
      key: 'name',
      sort: true
    },
    'icon',
    'action'
  ]
  const brandFields = [
    {
      key: 'name',
      sort: true
    },
    'action'
  ]
  const categoryFields = [
    {
      key: 'name',
      sort: true,
    },
    'icon',
    'action'
  ]

  const { SearchBar } = Search;
  const jenisColumns = [
    {
      dataField: 'name',
      text: 'Nama',
      sort: true
    },
    {
      dataField: 'icon',
      text: 'Icon',
      formatter: (cell, row) => {
        return(
          <CImg src={row.icon_url} rounded width={24} height={24} />
        )
      }
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: (cell, row) => {
        return(
          <>
            <Link to={
              {
                pathname: `/master/product-type/add`,
                state: {
                  type: props.types.filter(
                    (d) => d.id === row.id
                  ),
                },
              }
            }>
                    <span>
                      <FaPencilAlt color="green"/>
                    </span>
            </Link>
            <a className='ml-3' onClick={()=>showDeleteDialog(row.id)}>
              <span><FaTrashAlt color="red"/></span>
            </a>
          </>
        )
      }
    }
  ]
  const brandColumns = [
    {
      dataField: 'name',
      text: 'Nama',
      sort: true
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: (cell, row) => {
        return(
          <>
            <Link to={
              {
                pathname: `/master/product-type/add`,
                state: {
                  type: props.types.filter(
                    (d) => d.id === row.id
                  ),
                },
              }
            }>
                    <span>
                      <FaPencilAlt color="green"/>
                    </span>
            </Link>
            <a className='ml-3' onClick={()=>showDeleteBrandDialog(row.id)}>
              <span><FaTrashAlt color="red"/></span>
            </a>
          </>
        )
      }
    }
  ]
  const categoryColumns = [
    {
      dataField: 'name',
      text: 'Nama',
      sort: true
    },
    {
      dataField: 'icon',
      text: 'Icon',
      formatter: (cell, row) => {
        return(
          <CImg src={row.icon_url} rounded width={24} height={24} />
        )
      }
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: (cell, row) => {
        return(
          <>
            <Link to={
              {
                pathname: `/master/product-type/add`,
                state: {
                  type: props.types.filter(
                    (d) => d.id === row.id
                  ),
                },
              }
            }>
                    <span>
                      <FaPencilAlt color="green"/>
                    </span>
            </Link>
            <a className='ml-3' onClick={()=>showDeleteCategoryDialog(row.id)}>
              <span><FaTrashAlt color="red"/></span>
            </a>
          </>
        )
      }
    }
  ]


  return(
    <>
      <DeleteDialog show={deleteVisibility} onHide={hideDeleteDialog} item={"jenis produk"} onDelete={deleteType}/>
      <DeleteDialog show={deleteCategoryVisibility} onHide={hideDeleteCategoryDialog} item={"kategori produk"} onDelete={deleteCategory}/>
      <DeleteDialog show={deleteBrandVisibility} onHide={hideDeleteBrandDialog} item={"merek produk"} onDelete={deleteBrand}/>
      <CRow>
        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>
              Master Jenis Produk
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <ToolkitProvider
                    keyField="id"
                    data={props.types}
                    columns={jenisColumns}
                    search
                  >
                    {(props) => (
                      <div>
                        <div className="row align-items-center justify-content-between mx-auto">
                          <SearchBar {...props.searchProps} />
                          <button
                            className="col-auto btn btn-success "
                            onClick={()=>history.push('/master/product-type/add')}
                          >
                            Tambah Jenis Baru
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
        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>
              Master Kategori
            </CCardHeader>
            <CCardBody>

              <CRow>
                <CCol>
                  <ToolkitProvider
                    keyField="id"
                    data={props.categories}
                    columns={categoryColumns}
                    search
                  >
                    {(props) => (
                      <div>
                        <div className="row align-items-center justify-content-between mx-auto">
                          <SearchBar {...props.searchProps} />
                          <button
                            className="col-auto btn btn-success "
                            onClick={()=>history.push('/master/product-category/add')}
                          >
                            Tambah Kategori
                          </button>
                        </div>
                        <BootstrapTable
                          {...props.baseProps}
                          // remote
                          striped
                          pagination={paginationFactory({
                            sizePerPage: 5
                          })}
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

        <CCol xs="12" lg="6">
          <CCard>
            <CCardHeader>
              Master Merk
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <ToolkitProvider
                    keyField="id"
                    data={props.brands}
                    columns={brandColumns}
                    search
                  >
                    {(props) => (
                      <div>
                        <div className="row align-items-center justify-content-between mx-auto">
                          <SearchBar {...props.searchProps} />
                          <button
                            className="col-auto btn btn-success "
                            onClick={()=>history.push('/master/product-brand/add')}
                          >
                            Tambah Merk Baru
                          </button>
                        </div>
                        <BootstrapTable
                          {...props.baseProps}
                          // remote
                          striped
                          pagination={paginationFactory({
                            sizePerPage: 5
                          })}
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
      </CRow>

    </>
  )
}

const mapStateToProps = (state) =>{
  return{
    types: state.master.types,
    categories: state.master.categories,
    loading: state.master.loading,
    brands: state.master.brands
  }
}
export default connect(mapStateToProps, masterDispatch)(MasterPage)
