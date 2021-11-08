import React from "react";
import {Modal, Image, Row, Col} from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import convertRupiah from "rupiah-format";
import {CCarousel, CCarouselControl, CCarouselIndicators, CCarouselInner, CCarouselItem} from "@coreui/react";

export const ViewProductDialog = ({show, hide, product}) => {

  return (
    <Modal
      show={show}
      size={'lg'}
      aria-labelledby="example-modal-sizes-title-lg"
      onHide={hide}
    >
      <Modal.Header>
        <Modal.Title>Detail Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className='mx-auto'>
          <Col>
            <div>
              <h5>Gambar Product</h5>
            </div>
            <div>

              {product.image_product && (<Row className='justify-content-center'>
                <Col lg={6} sm={12}>
                  <CCarousel animate>
                    <CCarouselIndicators/>

                    <CCarouselInner>
                      {product.image_product.map((pict, index) => (
                        <CCarouselItem key={index}>
                          <img className="d-block w-100" src={pict.image_url} alt="slide 1"/>
                        </CCarouselItem>
                      ))}
                    </CCarouselInner>
                    <CCarouselControl direction="prev"/>
                    <CCarouselControl direction="next"/>
                  </CCarousel>

                </Col>
              </Row>)
              }
            </div>
          </Col>

        </Row>
        <Row className='mx-auto mt-4'>
          <Col>
            <h5>Informasi Produk</h5>
            <Row className='my-2'>
              <Col lg={3}>Kode</Col>
              <Col lg={9}>: {product.code}</Col>
            </Row>
            <Row className='my-2'>
              <Col lg={3}>Nama</Col>
              <Col lg={9}>: {product.name}</Col>
            </Row>
            <Row className='my-2'>
              <Col lg={3}>Merk</Col>
              <Col lg={9}>: {product.brand}</Col>
            </Row>
            <Row className='my-2'>
              <Col lg={3}>Jenis</Col>
              <Col lg={9}>: {product.type}</Col>
            </Row>
            <Row className='my-2'>
              <Col lg={3}>Kategori</Col>
              <Col lg={9}>: {product.category}</Col>
            </Row>
            <Row className='my-2'>
              <Col lg={3}>Berat (gram)</Col>
              <Col lg={9}>: {product.weight} gram</Col>
            </Row>
            {product.hafara_product && (
              <Row className='my-2'>
                <Col lg={3}>In Stock</Col>
                <Col lg={9}>: {product.hafara_product.stock} Unit</Col>
              </Row>
            )}
            <Row className='my-2'>
              <Col lg={3}>Min. Grosir</Col>
              <Col lg={9}>: {product.grosir} Unit</Col>
            </Row>
            <Row className='my-2'>
              <Col lg={3}>Deskripsi</Col>
              <Col lg={9}>: <div className='border rounded'><ReactQuill
                defaultValue={product.description}
                readOnly={true}
                theme={"bubble"}
              /></div></Col>
            </Row>
            <Row className='my-2'>
              <Col lg={3}>Spesifikasi</Col>
              <Col lg={9}>:
                <div className='border rounded'><ReactQuill
                  defaultValue={product.specification}
                  readOnly={true}
                  theme={"bubble"}
                /></div>
              </Col>
            </Row>
            <Row className='my-2'>
              <Col lg={3}>Rincian</Col>
              <Col lg={9}>:
                <div className='border rounded'><ReactQuill
                  defaultValue={product.detail}
                  readOnly={true}
                  theme={"bubble"}
                /></div>
              </Col>
            </Row>
          </Col>

        </Row>
        <Row className='mx-auto mt-4'>
          <Col>
            <h5>Harga</h5>
            <Row className='my-2'>
              <Col lg={3}>Eceran</Col>
              <Col lg={9}>: {convertRupiah.convert(product.price)}</Col>
            </Row>
            <Row className='my-2'>
              <Col lg={3}>Grosir</Col>
              <Col lg={9}>: {convertRupiah.convert(product.grosir_price)}</Col>
            </Row>
          </Col>
        </Row>
        <Row className='mx-auto mt-4'>
          <Col>
            <h5>Promo</h5>
            {product.app_product_discount && (
              <Row className='my-2'>
                <Col lg={3}>Discount</Col>
                <Col lg={9}>: {product.app_product_discount.name}</Col>
              </Row>
            )}
            {product.include_combo && (
              <Row className='my-2'>
                <Col lg={3}>Combo</Col>
                <Col lg={9}>: {product.include_combo.combo_name}</Col>
              </Row>
            )

            }

          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}
