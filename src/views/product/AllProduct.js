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
import {productDispatch} from "./redux/productRedux";
import CIcon from '@coreui/icons-react'
import DeleteDialog from "../../reusable/dialogs/DeleteDialog";
import {searchFilter} from "../../utils/filterHelper";
import {FaPencilAlt, FaTrashAlt, FaEye} from "react-icons/all";
import {subscribeToChat} from "../../utils/socketHelper";

const AllProduct = (props) => {
  const history = useHistory()
  const fields = ['name','code', 'brand', 'category', 'stock','action']
  const [search, setSearch] = useState(false)
  const [deleteVisibility, setDeleteVisibility] = useState(false)
  const [deletedId, setDeletedId] = useState(-1)
  const showDeleteDialog = (data)=>{
    setDeleteVisibility(true)
    setDeletedId(data.id)
  }
  const hideDeleteDialog = ()=>{
    setDeleteVisibility(false)
    setDeletedId(-1)
  }
  const onChangeSearch = (event)=>{
    setSearch(event.target.value)
  }
  const deleteProduct = () => {
    props.deleteProduct(deletedId)
    hideDeleteDialog()
  }

  useEffect(()=>{
    props.loadAllProduct()
    subscribeToChat()
  },[])

  return(
    <>
      <DeleteDialog show={deleteVisibility} onHide={hideDeleteDialog} item={"produk"}onDelete={deleteProduct}/>

      <CCard>
        <CCardHeader>
          Semua Produk
        </CCardHeader>
        <CCardBody>
          <CCol>
            <CRow className="justify-content-between">
              <CCol>
                <CRow>
                  <CFormGroup>
                    <CInput id="name"  placeholder="Search" onChange={onChangeSearch} />
                  </CFormGroup>
                </CRow>
              </CCol>
              <div>
                <CButton color="primary" size={'md'}onClick={()=>history.push('/pusan/products/add')}>
                  Tambah Produk Baru
                </CButton>
              </div>
            </CRow>
          </CCol>
          <CDataTable
            items={searchFilter(props.products,'name',search)}
            fields={fields}
            itemsPerPage={10}
            pagination
            sorter
            loading={props.loading}
            scopedSlots = {{
              'stock':
                (item)=>(
                  <td>
                    {item.hafara_product.stock}
                  </td>
                ),
              'action':(item)=>(
                <td>
                  <Link to={'/'}>
                    <span>
                      <FaEye color="blue"/>
                    </span>
                  </Link>
                  <Link className='ml-3' to={'/'}>
                    <span>
                      <FaPencilAlt color="green"/>
                    </span>
                  </Link>
                  <a className='ml-3' onClick={()=>showDeleteDialog(item)}>
                    <span><FaTrashAlt color="red"/></span>
                  </a>
                </td>
              )
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}
const mapStateToProps = (state) => {
  console.log('STATE, ',state)
  return{
    products: state.product.products,
    loading: state.product.loading
  }
}
export default connect(mapStateToProps, productDispatch)(AllProduct)
