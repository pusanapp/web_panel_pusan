import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInput,
  CLabel,
  CRow, CSelect
} from "@coreui/react";
import {useHistory} from "react-router-dom";
import {masterDispatch} from "./redux/masterRedux";
import {Redirect} from "react-router-dom";
import LoadingDialog from "../../reusable/dialogs/LoadingDialog";
import {groupFilter} from "../../utils/filterHelper";
const AddProductBrand = (props) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState(0)
  const onChangeName = (event) => {
    setName(event.target.value)
  }
  const onChangeCategory = (event)=>{
    setCategoryId(event.target.value)
  }
  const submit = ()=>{
    const data = {
      name: name,
      product_category_id: parseInt(categoryId)
    }
    console.log(data)
    props.saveProductBrand(data)
  }
  useEffect(()=>{
    dispatch(masterDispatch.loadProductCategory())
  },[])
  return (
    <>
      <LoadingDialog show={props.loading}/>
      {props.status? (
        <Redirect to="/master/all"/>
      ) : (

        <CCard>
          <CCardHeader>
            Tambah Merk Produk
          </CCardHeader>
          <CCardBody>

            <CCol md="4" sm={"2"}>
              <CFormGroup>
                <CLabel>Nama Merk Produk</CLabel>
                <CInput placeholder="Nama Merk Produk" onChange={onChangeName} required />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Pilih Kategori Produk</CLabel>
                <CSelect custom onChange={onChangeCategory}>
                  <option value="">Pilih Kategori Produk</option>
                  {props.categories.map(data=>(
                    <option key={data.id} value={data.id}>{data.name}</option>
                  ))}

                </CSelect>
                <div className="mt-3">
                  <CButton color="info" onClick={submit}>Simpan</CButton>
                </div>
              </CFormGroup>
            </CCol>

          </CCardBody>
        </CCard>

      )}
    </>
  )
}
const mapStateToProps = (state)=>{
  return{
    status: state.master.status,
    loading: state.master.loading,
    categories: state.master.categories,
  }
}
export default connect(mapStateToProps,masterDispatch)(AddProductBrand)
