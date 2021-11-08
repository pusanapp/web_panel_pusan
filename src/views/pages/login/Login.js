import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import {useFormik} from "formik";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {useDispatch} from "react-redux";
import {loginDispatch} from "./loginRedux";
import * as Yup from 'yup';
const Login = () => {
  const dispatch = useDispatch()
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().min(5,'Minimal 5 Karakter').required(),
      password: Yup.string().min(6, 'Minimal 6 Karakter').required()
    }),
    onSubmit: values => {
      console.log(values)
      dispatch(loginDispatch.loginUser(values))
    }
  })

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={formik.handleSubmit}>
                    <CRow className="justify-content-center">
                      <h1>Login</h1>
                    </CRow>
                    <CRow className="justify-content-center">
                      <p className="text-muted">Sign In to your account</p>
                    </CRow>

                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" name="username" onChange={formik.handleChange} />

                    </CInputGroup>
                    {/*{formik.touched.username && formik.errors.username ? (*/}
                    {/*  <div>{formik.errors.username}</div>*/}
                    {/*) : null}*/}
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password"  name="password" onChange={formik.handleChange} />

                    </CInputGroup>
                    {/*{formik.touched.password && formik.errors.password ? (*/}
                    {/*  <span className={'mt-9'}>{formik.errors.password}</span>*/}
                    {/*) : null}*/}
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" className="px-4" type={'submit'}>Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>

            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
