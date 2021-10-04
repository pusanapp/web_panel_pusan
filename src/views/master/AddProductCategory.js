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
  CInputFile,
  CInput,
  CLabel,
  CRow, CSelect
} from "@coreui/react";
import {useHistory} from "react-router-dom";
import {masterDispatch} from "./redux/masterRedux";
import {Redirect} from "react-router-dom";
import LoadingDialog from "../../reusable/dialogs/LoadingDialog";

const AddProductCategory = (props) => {
  const dispatch = useDispatch()
  // console.log(props.location.state.type[0])
  const [name, setName] = useState('')
  const [productTypeId, setProductTypeId] = useState(-1)
  const [iconFile, setIconFile] = useState(undefined)


  const onChangeName = (event) => {
    setName(event.target.value)
  }
  const onChangeSelectType = (event) => {
    console.log(event.target.value)
    setProductTypeId(event.target.value)
  }
  const onChangeInputIcon = event => {
    console.log(event.target.files)
    const fileUploaded = event.target.files[0];
    setIconFile(fileUploaded)
  };
  const submit = () => {
    const icon = new FormData()
    icon.append('icons', iconFile)
    const category = {
      name: name,
      product_type_id: parseInt(productTypeId)
    }
    const data = {
      category: category,
      icon: icon
    }
    console.log(data)
    props.saveProductCategory(data)
  }
  useEffect(() => {
    dispatch(masterDispatch.loadProductType())
  }, [])
  return (
    <>
      <LoadingDialog show={props.loading}/>
      {props.status ? (
        <Redirect to="/master/all"/>
      ) : (

        <CCard>
          <CCardHeader>
            Tambah Kategori Produk
          </CCardHeader>
          <CCardBody>

            <CCol md="4" sm={"2"}>
              <CFormGroup>
                <CLabel>Nama Kategori</CLabel>
                <CInput placeholder="Nama Kategori" onChange={onChangeName} required/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Pilih Jenis Product</CLabel>
                <CSelect custom onChange={onChangeSelectType}>
                  <option value={-1}>Pilih Jenis Produk</option>
                  {props.types.map(data => (
                    <option key={data.id} value={data.id}>{data.name}</option>
                  ))}
                </CSelect>
                <CFormGroup>
                  <CLabel>Icon Kategori</CLabel>
                  <CInputFile placeholder="Icon Category" onChange={onChangeInputIcon} required/>
                </CFormGroup>
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
const mapStateToProps = (state) => {
  return {
    status: state.master.status,
    loading: state.master.loading,
    types: state.master.types,
  }
}
export default connect(mapStateToProps, masterDispatch)(AddProductCategory)
