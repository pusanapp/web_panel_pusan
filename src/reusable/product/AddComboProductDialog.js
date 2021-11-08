import React, {useState} from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CModalTitle,
  CCol,
  CInput,
  CRow,
  CLabel,
  CFormGroup
} from "@coreui/react";
import {Modal,Row,Col} from 'react-bootstrap'
import convertRupiah from "rupiah-format";
import moment from "moment";
import Select from 'react-select'

export const AddComboProductDialog = ({show, hide, products, submit}) => {
  const [product, setProduct] = useState({})
  const [comboPrice, setComboPrice] = useState(0)

  const resetState = () => {
    setComboPrice(0)
    setProduct({})
  }
  const options = []
  products.map(data => {
    const added = {value: data, label: data.name}
    options.push(added)
  })
  const onProductChange = (option) => {
    setProduct(option.value)
  }
  const onChangePrice = (event) => {
    setComboPrice(event.target.value)
  }
  return (
    <Modal

      show={show}
      aria-labelledby="example-modal-sizes-title-lg"
      onHide={hide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Tandai Produk
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <CFormGroup>
              <CLabel htmlFor="name">Pilih Produk</CLabel>
              <Select options={options}  onChange={onProductChange}/>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="name">Harga Combo (Harga Asli: {convertRupiah.convert(product.price)})</CLabel>
              {/*<CInput onChange={onChangePrice} defaultValue={discountPrice}/>*/}
              <input className="form-control"
                     placeholder="Discount"
                     defaultValue={product.price}
                     onChange={onChangePrice}/>
            </CFormGroup>
          </Col>
        </Row>

      </Modal.Body>
      <Modal.Footer>
        <CButton color="danger" onClick={()=>{
          hide()
          resetState()
        }}>Batal</CButton>{' '}
        <CButton
          color="success"
          onClick={() => {
            const data = {
              id: product.id,
              name: product.name,
              stock: product.hafara_product.stock,
              combo_price: parseInt(comboPrice)
            }
            console.log(data)
            resetState()
            submit(data)
          }}
        >Tambah</CButton>
      </Modal.Footer>
    </Modal>
  )
}
