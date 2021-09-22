import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {masterDispatch} from "../redux/masterRedux";
import {CButton, CCard, CCardBody, CCardHeader, CCol, CDataTable, CFormGroup, CInput, CRow} from "@coreui/react";
import {searchFilter} from "../../../utils/filterHelper";
import {Link} from "react-router-dom";
import {FaPencilAlt, FaTrashAlt} from "react-icons/all";
import {useHistory} from "react-router-dom";
import DeleteDialog from "../../../reusable/dialogs/DeleteDialog";
import LoadingDialog from "../../../reusable/dialogs/LoadingDialog";

const ProductType = (props) => {
  const history = useHistory()
  const [deleteVisibility, setDeleteVisibility] = useState(false)
  const [deletedId, setDeletedId] = useState(-1)
  const showDeleteDialog = (id)=>{
    setDeleteVisibility(true)
    setDeletedId(id)
  }
  const hideDeleteDialog = ()=>{
    setDeleteVisibility(false)
    setDeletedId(-1)
  }
  const deleteType = () =>{
    console.log('delete')
    props.deleteProductType(deletedId)
    hideDeleteDialog()
  }
  useEffect(()=>{
    props.loadProductType()
  },[])
  const fields = ['name','action']

  return(
    <>
      <DeleteDialog show={deleteVisibility} onHide={hideDeleteDialog} item={"jenis produk"} onDelete={deleteType}/>
      <LoadingDialog show={props.loading}/>
      <CCard>
        <CCardHeader>
          All Products
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
              <div>
                <CButton color="primary" size={'md'} onClick={()=>history.push('/master/product-type/add')}>
                  Tambah Jenis Produk
                </CButton>
              </div>
            </CRow>
          </CCol>
          <CDataTable
            items={props.types}
            fields={fields}
            itemsPerPage={5}
            pagination
            scopedSlots = {{
              'action':(item)=>(
                <td>
                  <Link to={
                    {
                      pathname: `/master/product-type/add`,
                      state: {
                        type: props.types.filter(
                          (d) => d.id === item.id
                        ),
                      },
                    }
                  }>
                    <span>
                      <FaPencilAlt color="green"/>
                    </span>
                  </Link>
                  <a className='ml-3' onClick={()=>showDeleteDialog(item.id)}>
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

const mapStateToProps = (state) =>{
  return{
    types: state.master.types
  }
}
export default connect(mapStateToProps, masterDispatch)(ProductType)
