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
import 'react-quill/dist/quill.bubble.css';
import {groupFilter} from "../../utils/filterHelper";
import {Redirect, useParams} from "react-router-dom";
import LoadingDialog from "../../reusable/dialogs/LoadingDialog";
import '../../utils/additionalStyle.css'
import {comboDispatch} from "./redux/comboRedux";

const EditProductPage = (props) => {
  const dispatch = useDispatch()
  const {id} = useParams()
  const hiddenFileInput = React.useRef(null);
  const [image, setImage] = useState([])
  const [video, setVideo] = useState('')
  const [hafara, setHafara] = useState({})
  const [productTypeId, setProductTypeId] = useState(0)
  const [categoryId, setCategoryId] = useState(0)
  const [brandId, setBrandId] = useState(0)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [brand, setBrand] = useState('')
  const [type, setType] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [discountPrice, setDiscountPrice] = useState(0)
  const [grosir, setGrosir] = useState(hafara.grosir)
  const [grosirPrice, setGrosirPrice] = useState('')
  const [weight, setWeight] = useState('')
  const [description, setDescription] = useState('')
  const [detail, setDetail] = useState('')
  const [specification, setSpecification] = useState('')
  const [selectCombo, setSelectCombo] = useState(false)
  const [includeComboId, setIncludeComboId] = useState(0)
  const comboOptions = []
  props.combos.map(combo=>{
    const option = {value: combo.id, label: combo.combo_name}
    comboOptions.push(option)
  })
  const onChangeName = (event) => {
    setName(event.target.value)
  }
  const onChangeCode = (event) => {
    setCode(event.target.value)
  }
  const onChangePrice = (event) => {
    setPrice(event.target.value)
  }
  const onChangeDiscountPrice = (event) => {
    setDiscountPrice(event.target.value)
  }
  const onChangeGrosir = (event) => {
    setGrosir(event.target.value)
  }
  const onChangeGrosirPrice = (event) =>{
    setGrosirPrice(event.target.value)
  }
  const onChangeWeight = (event) => {
    setWeight(event.target.value)
  }
  const onChangeBrand = (event)=>{
    const split = event.target.value.split('|')
    setBrand(split[1])
    setBrandId(split[0])
  }
  const onchangeProductType = (event) => {
    const split = event.target.value.split('|')
    setProductTypeId(split[0])
    setType(split[1])
    if(split[1]==='SENAPAN'){
      setSelectCombo(true)
    }else {
      setSelectCombo(false)
    }
  }
  const onChangeSelectCombo = (option) => {
    console.log(option.value)
    setIncludeComboId(option.value)
  }
  const onchangeCategory = (event) => {
    const split = event.target.value.split('|')
    setCategoryId(split[0])
    setCategory(split[1])
  }
  const onChangeDescription = (value) => {
    setDescription(value)
  }
  const onChangeSpecification = (value) => {
    console.log(value)
    setSpecification(value)
  }
  const onChangeDetail = (value) => {
    setDetail(value)
  }
  const onChangeVideos = (event) => {
    setVideo(event.target.value)
  }

  const options = []
  props.hafara.map(data => {
    const added = {value: data, label: data.nama_barang}
    options.push(added)
  })

  const onSelectProductChange = (option) => {
    console.log(option.value)
    setHafara(option.value)
  }
  const handleClick = event => {
    hiddenFileInput.current.click();
  };
  const removeImage = (index) => {
    console.log(index)
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

  const submitData = () => {
    const images = new FormData()
    image.map(data => {
      images.append('images', data)
    })
    const videos = []
    // console.log(video)
    const split = video.split(';')
    console.log(split)
    split.map(url=>{
      const data = {
        url: url
      }
      videos.push(data)
    })
    const product = {
      data: {
        name: name? name : hafara.nama_barang,
        code: code? code : hafara.kode_barang,
        brand: brand,
        barang_id: parseInt(hafara.pid),
        type: type,
        category: category,
        price: price? parseInt(price) : parseInt(hafara.harga_jual_umum),
        grosir_price: grosirPrice? parseInt(grosirPrice) : parseInt(hafara.harga_jual_grosir),
        grosir: grosir? parseInt(grosir) : parseInt(hafara.grosir),
        weight: weight? parseInt(weight) : parseInt(hafara.weight),
        description: description,
        detail: detail,
        specification: specification,
        // keyword: hafara.keyword,
        status: 1,
        is_new: 1,
        is_favorite: 1,
        discount_price: discountPrice,
        category_id: parseInt(categoryId),
        type_id: parseInt(productTypeId),
        brand_id: parseInt(brandId),
        include_combo_id: includeComboId
      },
      videos: videos
    }
    const payload = {
      product: product,
      images: images
    }
    console.log(payload)
    props.saveNewProduct(payload)
  }
  useEffect(() => {
    dispatch(masterDispatch.loadProductCategory())
    dispatch(masterDispatch.loadProductType())
    dispatch(masterDispatch.loadProductBrand())
    dispatch(comboDispatch.loadAllCombo())
    props.loadHafaraProduct()
    props.loadProductById(id)
  }, [])
  return (

    <>
      <LoadingDialog show={props.loading}/>
      {props.status ? (
        <Redirect to="/pusan/products"/>
      ) : (
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
                  <CInput id="name" placeholder="Masukkan Nama Produk" defaultValue={hafara.nama_barang? hafara.nama_barang : 'Haniffff'} onChange={onChangeName} required/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Kode</CLabel>
                  <CInput id="name" placeholder="Masukkan Kode Produk" defaultValue={hafara.kode_barang} onChange={onChangeCode} required/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Harga Jual</CLabel>
                  <CInput id="name" placeholder="Masukkan Harga Produk" defaultValue={hafara.harga_jual_umum} onChange={onChangePrice} required/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Harga Grosir</CLabel>
                  <CInput id="name" placeholder="Masukkan Harga Grosir" defaultValue={hafara.harga_jual_grosir} onChange={onChangeGrosirPrice}required/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Jumlah Grosir</CLabel>
                  <CInput id="name" type="number" placeholder="Masukkan Jumlah Grosir" defaultValue={hafara.grosir} onChange={onChangeGrosir}
                          required/>
                </CFormGroup>
                {/*<CFormGroup>*/}
                {/*  <CLabel htmlFor="name">Harga Diskon</CLabel>*/}
                {/*  <CInput id="name" placeholder="Masukkan Harga Diskon" required onChange={onChangeDiscountPrice}/>*/}
                {/*</CFormGroup>*/}
                <CFormGroup>
                  <CLabel htmlFor="name">Berat</CLabel>
                  <CInput id="name" placeholder="Masukkan Berat Produk" defaultValue={hafara.weight}  onChange={onChangeWeight}required/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Stock</CLabel>
                  <CInput id="name" placeholder="Stock" defaultValue={hafara.stock} disabled required/>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Video Url (Jika lebih dari 1 pisahkan dengan tanda ; )</CLabel>
                  <CInput id="name" placeholder="Masukkan Url Video Produk" onChange={onChangeVideos}/>
                </CFormGroup>

              </CCol>
              <CCol md={"6"}>
                <CFormGroup>
                  <CLabel htmlFor="name">Pilih Jenis Product</CLabel>
                  <CSelect custom onChange={onchangeProductType}>
                    <option value="">Pilih Jenis Produk</option>
                    {props.types.map(data => (
                      <option selected={data.id === props.product.type_id} key={data.id} value={`${data.id}|${data.name}`}>{data.name}</option>
                    ))}

                  </CSelect>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Pilih Kategori Produk</CLabel>
                  <CSelect custom onChange={onchangeCategory}>
                    <option value="">Pilih Kategori Produk</option>
                    {groupFilter(props.categories, 'product_type_id', productTypeId?productTypeId : props.product.type_id).map(data => (
                      <option selected={data.id===props.product.category_id} key={data.id} value={`${data.id}|${data.name}`}>{data.name}</option>
                    ))}

                  </CSelect>
                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Pilih Merk Produk</CLabel>
                  <CSelect custom onChange={onChangeBrand}>
                    <option value="">Pilih Merk Produk</option>
                    {groupFilter(props.brands, 'product_category_id', categoryId? categoryId : props.product.category_id).map(data => (
                      <option selected={data.id === props.product.brand_id} key={data.id} value={`${data.id}|${data.name}`}>{data.name}</option>
                    ))}

                  </CSelect>
                </CFormGroup>
                {selectCombo && (
                  <CFormGroup>
                    <CLabel htmlFor="name">Pilih Combo (Opsional)</CLabel>
                    <Select options={comboOptions} onChange={onChangeSelectCombo}/>
                  </CFormGroup>
                )}
                <CFormGroup>
                  <CLabel htmlFor="name">Deskripsi</CLabel>

                  <div>
                    <ReactQuill className={"px-1"} theme="snow" onChange={onChangeDescription}/>
                  </div>
                  {/*<div>*/}
                  {/*<div dangerouslySetInnerHTML={{__html: value}}/>*/}
                  {/*<ReactQuill*/}
                  {/*  value={value}*/}
                  {/*  readOnly={true}*/}
                  {/*  theme={"bubble"}*/}
                  {/*/>*/}
                  {/*</div>*/}

                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Spesifikasi</CLabel>

                  <div>
                    <ReactQuill className={"px-1"} theme="snow" onChange={onChangeSpecification} defaultValue={props.product.specification}/>
                  </div>

                </CFormGroup>
                <CFormGroup>
                  <CLabel htmlFor="name">Rincian</CLabel>

                  <div>
                    <ReactQuill className={"px-1"} theme="snow" onChange={onChangeDetail}/>
                  </div>

                </CFormGroup>

                <CFormGroup>
                  <CLabel htmlFor="name">Pilih Gambar Product (Klik Gambar Untuk Hapus)</CLabel>
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
                {image.length > 0 && (
                  <CFormGroup>
                    <CLabel htmlFor="name">Preview Gambar</CLabel>
                    <CRow className={"px-3"}>
                      <div>
                      </div>
                      {image.map((data,index) => (
                        <div key={index} className='imageContainer'>
                          <div onClick={()=>{removeImage(index)}} className='closeButton'><span aria-hidden="true">&times;</span></div>

                          <img src={URL.createObjectURL(data)} className='myImage'/>

                        </div>
                      ))}
                    </CRow>
                  </CFormGroup>
                )}

                {/*<CFormGroup>*/}
                {/*  <CLabel htmlFor="name">Keyword</CLabel>*/}
                {/*  <CTextarea id="name" placeholder="Masukkan Keyword" defaultValue={hafara.keyword} required/>*/}
                {/*</CFormGroup>*/}


              </CCol>
            </CRow>
          </CCardBody>
          <CCardFooter>
            <CButton color="success" onClick={submitData}>Simpan</CButton>
          </CCardFooter>

        </CCard>

      )

      }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    status: state.product.status,
    loading: state.product.loading,
    hafara: state.product.hafara,
    categories: state.master.categories,
    types: state.master.types,
    brands: state.master.brands,
    combos: state.combo.combos,
    product: state.product.product
  }
}

export default connect(mapStateToProps, productDispatch)(EditProductPage)
