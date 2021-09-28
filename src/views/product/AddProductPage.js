import React, {useEffect, useState} from "react";
import {
  CButton,
  CImg,
  CRow,
  CInput,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CLabel,
  CFormText, CFormGroup,
  CTextarea,
  CSelect,
} from "@coreui/react";
import Select from 'react-select'
import {FaPlus} from "react-icons/all";
import {connect, useDispatch} from "react-redux";
import {masterDispatch} from "../master/redux/masterRedux";
import {productDispatch} from "./redux/productRedux";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import {groupFilter} from "../../utils/filterHelper";

const AddProductPage = (props) => {
  const dispatch = useDispatch()
  const hiddenFileInput = React.useRef(null);
  const [value, setValue] = useState('');
  const [image, setImage] = useState([])
  const [hafara, setHafara] = useState({
    pid: 1667,
    kode_barang: "",
    nama_barang: "",
    merk: "",
    jenis_barang: "",
    kategori_barang: "",
    harga_pokok: "",
    harga_jual_umum: "",
    harga_jual_reseller: "",
    harga_jual_grosir: "",
    harga_spesial: "",
    // grosir: 6,
    stock: 6,
    status: 1,
    company: "HAFARA",
    deskripsi: "",
    spesifikasi: "",
    // weight: 0,
    keyword: "",
    thumbnail: ""
  })
  const [productTypeId, setProductTypeId] = useState(0)
  const [categoryId, setCategoryId] = useState(0)

  const onchangeProductType = (event) => {
    setProductTypeId(event.target.value.split('|')[0])
  }
  const onchangeCategory = (event) => {
    setCategoryId(event.target.value.split('|')[0])
  }

  const onValueChange = (value)=> {
    console.log(value)
    setValue(value)
  }

  const options = []
  props.hafara.map(data=>{
    const added = {value: data, label: data.nama_barang}
    options.push(added)
  })

  const onSelectProductChange = (option) =>{
    console.log(option.value)
    setHafara(option.value)
  }

  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const removeImage = (index) => {
    image.splice(index, 1);
    console.log(image);
    setImage([...image]);
  };
  const handleChange = event => {
    console.log(event.target.files)
    const fileUploaded = event.target.files[0];
    image.push(fileUploaded)
    console.log(image)
    setImage([...image])
  };
  useEffect(()=>{
    dispatch(masterDispatch.loadProductCategory())
    dispatch(masterDispatch.loadProductType())
    dispatch(masterDispatch.loadProductBrand())
    props.loadHafaraProduct()
  },[])
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol md={"6"}>
              <CFormGroup>
                <CLabel htmlFor="name">Pilih Produk Gudang</CLabel>
                <Select options={options} onChange={onSelectProductChange}/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Nama Produk</CLabel>
                <CInput id="name" placeholder="Masukkan Nama Produk" defaultValue={hafara.nama_barang} required/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Kode</CLabel>
                <CInput id="name" placeholder="Masukkan Kode Produk" defaultValue={hafara.kode_barang} required/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Harga</CLabel>
                <CInput id="name" placeholder="Masukkan Harga Produk" defaultValue={hafara.harga_jual_umum} required/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Harga Grosir</CLabel>
                <CInput id="name" placeholder="Masukkan Harga Grosir" defaultValue={hafara.harga_jual_grosir} required/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Jumlah Grosir</CLabel>
                <CInput id="name" type="number" placeholder="Masukkan Jumlah Grosir" defaultValue={hafara.grosir} required/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Harga Diskon</CLabel>
                <CInput id="name" placeholder="Masukkan Harga Diskon"  required/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Berat</CLabel>
                <CInput id="name" placeholder="Masukkan Berat Produk" defaultValue={hafara.weight} required/>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Stock</CLabel>
                <CInput id="name" placeholder="Masukkan Berat Produk" defaultValue={hafara.stock} disabled required/>
              </CFormGroup>


            </CCol>
            <CCol md={"6"}>
              <CFormGroup>
                <CLabel htmlFor="name">Pilih Jenis Product</CLabel>
                <CSelect custom onChange={onchangeProductType}>
                  <option value="">Pilih Jenis Produk</option>
                  {props.types.map(data=>(
                    <option key={data.id} value={`${data.id}|${data.name}`}>{data.name}</option>
                  ))}

                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Pilih Kategori Produk</CLabel>
                <CSelect custom onChange={onchangeCategory}>
                  <option value="">Pilih Kategori Produk</option>
                  {groupFilter(props.categories,'product_type_id',productTypeId).map(data=>(
                    <option key={data.id} value={`${data.id}|${data.name}`}>{data.name}</option>
                  ))}

                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Pilih Merk Produk</CLabel>
                <CSelect custom>
                  <option value="">Pilih Merk Produk</option>
                  {groupFilter(props.brands,'product_category_id', categoryId).map(data=>(
                    <option key={data.id} value={`${data.id}|${data.name}`}>{data.name}</option>
                  ))}

                </CSelect>
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Pilih Gambar Product</CLabel>
                <div>

                  <CButton className="btn-linkedin btn-brand mr-1 mb-1" onClick={handleClick}>
                    Tambah Gambar
                  </CButton>
                  <input type="file"
                         ref={hiddenFileInput}
                         onChange={handleChange}
                         style={{display: 'none'}}
                  />
                </div>
              </CFormGroup>
              {image.length>0 && (
                <CFormGroup>
                  <CLabel htmlFor="name">Preview Gambar</CLabel>
                  <CRow className={"px-3"}>
                    <div>
                    </div>
                    {image.map(data => (
                      <div>
                        <CImg src={URL.createObjectURL(data)} rounded width={80}/>
                      </div>
                    ))}
                  </CRow>
                </CFormGroup>
              )}
              <CFormGroup>
                <CLabel htmlFor="name">Deskripsi</CLabel>

                  <div>
                    <ReactQuill className={"px-1"} theme="snow" value={value} onChange={onValueChange}/>
                  </div>

              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="name">Spesifikasi</CLabel>

                <div>
                  <ReactQuill className={"px-1"} theme="snow" onChange={onValueChange}/>
                </div>

              </CFormGroup>

              <CFormGroup>
                <CLabel htmlFor="name">Keyword</CLabel>
                <CTextarea id="name" placeholder="Masukkan Keyword" defaultValue={hafara.keyword} required/>
              </CFormGroup>


            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CButton color="success">Simpan</CButton>
        </CCardFooter>

      </CCard>


    </>
  );
}

const mapStateToProps = (state)=>{
  return{
    status: state.product.status,
    loading: state.product.loading,
    hafara: state.product.hafara,
    categories: state.master.categories,
    types: state.master.types,
    brands: state.master.brands,
  }
}
export default connect(mapStateToProps,productDispatch)(AddProductPage)
