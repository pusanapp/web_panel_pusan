import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {masterDispatch} from "../redux/masterRedux";
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
  CRow
} from "@coreui/react";
import {Link} from "react-router-dom";
import {FaPencilAlt, FaTrashAlt} from "react-icons/all";
import {useHistory} from "react-router-dom";
import DeleteDialog from "../../../reusable/dialogs/DeleteDialog";

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
  const fields = [
    {
      key: 'name',
      sort: true
    },
    'action'
  ]

  return(
    <>
      <DeleteDialog show={deleteVisibility} onHide={hideDeleteDialog} item={"jenis produk"} onDelete={deleteType}/>
      <CRow>
        <CCol xs="12" lg="6">
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
                loading={props.loading}
                sorter
                pagination
                scopedSlots = {{
                  'tes': (item) =>(
                    <td>{item.id}</td>
                  ),
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
              {/*<CPagination*/}
              {/*  activePage={1}*/}
              {/*  // onActivePageChange={pageChange}*/}
              {/*  pages={1000/10}*/}
              {/*  doubleArrows={false}*/}
              {/*  align="center"*/}
              {/*/>*/}
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
    loading: state.master.loading
  }
}
export default connect(mapStateToProps, masterDispatch)(ProductType)
