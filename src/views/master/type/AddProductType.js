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
  CInput,
  CLabel,
  CRow
} from "@coreui/react";
import {useHistory} from "react-router-dom";
import {masterDispatch} from "../redux/masterRedux";
import {Redirect} from "react-router-dom";
import LoadingDialog from "../../../reusable/dialogs/LoadingDialog";
const AddProductType = (props) => {
  // console.log(props.location.state.type[0])
  const [name, setName] = useState('')
  // const [type] = useState(props.location.state.type[0])
  const history= useHistory()
  const onChangeName = (event) => {
    setName(event.target.value)
  }
  const submit = ()=>{
    const data = {
      name: name
    }
    console.log(data)
    props.saveProductType(data)
  }
  return (
    <>
      <LoadingDialog show={props.loading}/>
      {props.status? (
        <Redirect to="/master/product-type"/>
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
                <div className="mt-2">
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
