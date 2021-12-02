import {Modal, Row, Col, Table, Form, Button} from 'react-bootstrap'
import React from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
export const AddPanelUserDialog = ({show,submit,onHide}) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      username:'',
      role: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().min(5,'Minimal 6 Karakter').required(),
      username: Yup.string().min(6, 'Minimal 6 Karakter').required(),
      password: Yup.string().min(6, 'Minimal 6 Karakter').required(),
      role: Yup.string().required()
    }),
    onSubmit: (values, { resetForm }) => {
      // console.log(values)
      submit(values)
      resetForm()
    }
  })
  return(
    <Modal
      show={show}
      aria-labelledby="example-modal-sizes-title-lg"
      onHide={()=>{
        onHide()
        formik.resetForm()
      }}
    >
      <Modal.Header>
        <Modal.Title>Tambah User Baru</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col lg={12}>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group>
                <Form.Label>Nama</Form.Label>
                <input name='name' className='form-control' onChange={formik.handleChange}/>
                <span className={'font-sm text-danger'}>{formik.errors.name}</span>
              </Form.Group>
              <Form.Group>
                <Form.Label>Username</Form.Label>
                <input name='username' className='form-control' onChange={formik.handleChange}/>
                <span className={'font-sm text-danger'}>{formik.errors.username}</span>
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <input name='password' className='form-control' type={'password'} onChange={formik.handleChange}/>
                <span className={'font-sm text-danger'}>{formik.errors.password}</span>

              </Form.Group>
              <Form.Group>
                <Form.Label>Role</Form.Label>
                <select name='role' className='form-control' onChange={formik.handleChange}>
                  <option value=''>Pilih Role</option>
                  <option value='SALES'>Sales</option>
                  <option value='ADMIN'>Admin</option>
                  <option value='GUDANG'>Gudang</option>
                </select>
                <span className={'font-sm text-danger'}>{formik.errors.role}</span>
              </Form.Group>
              <Button type='submit' variant={'success'} size={'md'}>Simpan</Button>
            </Form>
          </Col>
        </Row>
      </Modal.Body>

    </Modal>
  )
}
