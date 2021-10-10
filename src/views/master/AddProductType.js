import React, {useState} from "react";
import {connect} from "react-redux";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInput, CInputFile,
  CLabel,
  CRow
} from "@coreui/react";
import {useHistory} from "react-router-dom";
import {masterDispatch} from "./redux/masterRedux";
import {Redirect} from "react-router-dom";
import LoadingDialog from "../../reusable/dialogs/LoadingDialog";
const AddProductType = (props) => {
  // console.log(props.location.state.type[0])
  const [name, setName] = useState('')
  // const [type] = useState(props.location.state.type[0])
  const history= useHistory()
  const [iconFile, setIconFile] = useState(undefined)

  const onChangeName = (event) => {
    setName(event.target.value)
  }
  const onChangeInputIcon = event => {
    console.log(event.target.files)
    const fileUploaded = event.target.files[0];
    setIconFile(fileUploaded)
  };
  const submit = ()=>{
    const icon = new FormData()
    icon.append('icons', iconFile)
    const type = {
      name: name,
    }
    const data = {
      type: type,
      icon: icon
    }
    console.log(data)
    props.saveProductType(data)
  }
  return (
    <>
      <LoadingDialog show={props.loading}/>
      {props.status? (
        <Redirect to="/master/all"/>
      ) : (

        <CCard>
          <CCardHeader>
            Tambah Jenis Produk
          </CCardHeader>
          <CCardBody>

            <CCol md="4" sm={"2"}>
              <CFormGroup>
                <CLabel>Nama Jenis Produk</CLabel>
                <CInput placeholder="Nama Jenis Produk" onChange={onChangeName} required />

              </CFormGroup>
              <CFormGroup>
                <CLabel>Icon Jenis Produk</CLabel>
                <CInputFile placeholder="Icon Category" onChange={onChangeInputIcon} required/>
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
    loading: state.master.loading
  }
}
export default connect(mapStateToProps,masterDispatch)(AddProductType)
