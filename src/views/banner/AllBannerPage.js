import React, {useEffect, useState} from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CFormGroup,
  CInput,
  CInputFile,
  CLabel,
  CRow, CSelect, CTextarea, CToast, CToastBody, CToaster, CToastHeader
} from "@coreui/react";
import {connect, useDispatch} from "react-redux";
import {bannerDispatch} from "./redux/bannerRedux";
import {discountDispatch} from "../product/redux/discountRedux";
import Select from "react-select";
import {FaEye, FaPencilAlt, FaTrashAlt} from "react-icons/all";
import DeleteDialog from "../../reusable/dialogs/DeleteDialog";

const AllBannerPage = (props) => {
  const dispatch = useDispatch()
  const discountOptions = []
  props.discounts.map(data => {
    const added = {value: data.id, label: data.name}
    discountOptions.push(added)
  })

  const [bannerData, setBannerData] = useState({})
  const [deletedId, setDeletedId] = useState(0)
  const [deleteVisibility, setDeleteVisibility] = useState(false)
  const showDeleteDialog = (data) => {
    setDeletedId(data)
    setDeleteVisibility(true)
  }
  const hideDeleteDialog = () => {
    setDeleteVisibility(false)
    setDeletedId(0)
  }
  const deleteBanner = () => {
    props.deleteBanner(deletedId)
    hideDeleteDialog()
  }
  const [name, setName] = useState('')
  const onChangeName = (event) => {
    setName(event.target.value)
  }
  const [image, setImage] = useState(undefined)
  const onChangeImage= event => {
    console.log(event.target.files)
    const fileUploaded = event.target.files[0];
    setImage(fileUploaded)
  };

  const [isDiscount, setIsDiscount] = useState(false)
  const onChangeInputDiscount = (event) => {
    console.log(event.target.value)
    setIsDiscount(event.target.value)
  }

  const [discountId, setDiscountId] = useState(null)
  const onChangeDiscount = (option) => {
    console.log(option)
    setDiscountId(option.value)
  }
  const [status, setStatus] = useState(true)
  const onChangeStatus = (event) => {
    setStatus(event.target.value)
  }

  const showAddFormToggle = (event) => {
    props.showAddBannerToggle(true)
    props.showEditBannerToggle(false)
    event.preventDefault()
  }
  const hideAddFormShow = () => {
    props.showAddBannerToggle(false)
  }

  const showEditBannerToggle = (data) => {
    if(!props.editBannerVisibility){
      props.showEditBannerToggle(true)
      props.showAddBannerToggle(false)
      setBannerData(data)
    }else {
      alert('Selesaikan edit atau klik batal')
    }
  }

  const hideEditBannerShow = () => {
    props.showEditBannerToggle(false)
    setBannerData({})
  }

  const submitSaveBanner = () => {
    const bannerImage = new FormData()
    bannerImage.append('banner', image)
    const banner = {
      name: name,
      status: true,
      is_discount: isDiscount,
      discount_id: discountId,
      show: status
    }
    const payload = {
      image: bannerImage,
      banner: banner,
    }
    props.saveNewBanner(payload)
    console.log(payload)
  }

  const fields = [
    {
      key: 'name',
      sort: true
    },
    'banner',
    // 'diskon',
    'discount',
    'status',
    'action'
  ]


  useEffect(()=>{
    props.loadAllBanner()
    dispatch(discountDispatch.loadAllDiscount())
    return()=>{
      props.showAddBannerToggle(false)
    }
  },[])

  return (
    <>
      <DeleteDialog show={deleteVisibility} onHide={hideDeleteDialog} item='Banner' onDelete={deleteBanner}/>
      <CRow>
        <CCol lg={(props.addBannerVisibility || props.editBannerVisibility) ? '7' : '12'}>
          <CCard>
            <CCardBody>
              <CToaster
                position={'top-right'}
                key={'toaster' + 'top-right2'}
              >

                <CToast
                  key={'toast' + 12}
                  show={props.status}
                  autohide={5000}
                  fade={true}
                  color={'success'}
                  onStateChange={(state)=>{
                    if (state==='hiding'){
                      props.resetBannerStatus()
                    }
                  }}
                >
                  <CToastHeader closeButton>
                    Toast title
                  </CToastHeader>
                  <CToastBody>
                    {`Banner Disimpan`}
                  </CToastBody>
                </CToast>

              </CToaster>
              <CRow>
                <CCol>
                  <CRow className="d-flex justify-content-between align-items-center mx-auto">
                    <div>
                      Semua Banner
                    </div>
                    <div>
                      <CButton color={"primary"} onClick={showAddFormToggle}>Tambah Baru</CButton>
                    </div>
                  </CRow>
                  <CRow className="mt-3 mx-auto">
                    <CDataTable
                      items={props.banners}
                      fields={fields}
                      itemsPerPage={8}
                      loading={props.loading}
                      sorter
                      pagination
                      scopedSlots={{
                        'banner': (item) => (
                          <td>
                            <img src={item.image_url} alt={'tess'} className='rounded' width={100}/>
                          </td>
                        ),
                        'discount': (item) => (
                          <td>{item.app_product_discount? `${item.app_product_discount.name}`: 'Not Include Discount'}</td>
                        ),
                        'status': (item) => (
                          <td>{item.status? 'Active' : 'Not Active'}</td>
                        ),
                        'action': (item) => (
                          <td>
                            <a onClick={()=>showEditBannerToggle(item)} >
                    <span>
                      <FaPencilAlt color="green"/>
                    </span>
                            </a>
                            <a className='ml-3' onClick={()=>showDeleteDialog(item.id)}>
                              <span><FaTrashAlt color="red"/></span>
                            </a>
                          </td>
                        )
                      }}
                    />
                  </CRow>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        {props.addBannerVisibility && (
          <CCol lg={'5'}>
            <CCard>
              <CCardHeader>
                Tambah Banner Baru
              </CCardHeader>
              <CCardBody>

                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="name">Nama Banner</CLabel>
                      <CInput id="name" placeholder="Nama Banner" onChange={onChangeName} required/>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">Pilih Gambar</CLabel>
                      <CInputFile onChange={onChangeImage} id="name" required/>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">Masukkan Diskon</CLabel>
                      <CSelect required onChange={onChangeInputDiscount}>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </CSelect>
                    </CFormGroup>
                    {(isDiscount ==='true') && (
                      <CFormGroup>
                        <CLabel htmlFor="name">Pilih Diskon</CLabel>
                        <Select options={discountOptions} onChange={onChangeDiscount}  />
                      </CFormGroup>
                    )}
                    <CFormGroup>
                      <CLabel htmlFor="name">Show Banner</CLabel>
                      <CSelect required onChange={onChangeStatus}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </CSelect>
                    </CFormGroup>
                    <CRow className={'mx-auto justify-content-end'}>
                      <CButton color={'danger'} onClick={hideAddFormShow}>
                        Batal
                      </CButton>
                      <CButton color={'info'} className='ml-2' onClick={submitSaveBanner}>
                        Simpan
                      </CButton>
                    </CRow>

                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        )}
        {props.editBannerVisibility && (
          <CCol lg={'5'}>
            <CCard>
              <CCardHeader>
                Edit Banner
              </CCardHeader>
              <CCardBody>

                <CRow>
                  <CCol>
                    <CFormGroup>
                      <CLabel htmlFor="name">Nama Banner</CLabel>
                      <CInput id="name" defaultValue={bannerData.name} placeholder="Nama Banner" onChange={onChangeName} required/>
                    </CFormGroup>
                    <CFormGroup>
                      <img src={bannerData.image_url} alt={'tess'} className='rounded' width={100}/>

                      <CLabel htmlFor="name">Pilih Gambar</CLabel>
                      <CInputFile onChange={onChangeImage} id="name" required/>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel htmlFor="name">Masukkan Diskon</CLabel>
                      <CSelect defaultValue={bannerData.is_discount} required onChange={onChangeInputDiscount}>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </CSelect>
                    </CFormGroup>
                    {(isDiscount ==='true') && (
                      <CFormGroup>
                        <CLabel htmlFor="name">Pilih Diskon</CLabel>
                        <Select options={discountOptions} defaultValue={{data: bannerData.discount_id, label: bannerData.app_product_discount.name}} onChange={onChangeDiscount}  />
                      </CFormGroup>
                    )}
                    <CFormGroup>
                      <CLabel htmlFor="name">Show Banner</CLabel>
                      <CSelect defaultValue={bannerData.show} required onChange={onChangeStatus}>
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                      </CSelect>
                    </CFormGroup>
                    <CRow className={'mx-auto justify-content-end'}>
                      <CButton color={'danger'} onClick={hideEditBannerShow}>
                        Batal
                      </CButton>
                      <CButton color={'info'} className={'ml-2'} onClick={submitSaveBanner}>
                        Simpan
                      </CButton>
                    </CRow>

                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        )}
      </CRow>
    </>

  )
}

const mapStateToProps = (state) => {
  return{
    addBannerVisibility: state.banner.addBannerVisibility,
    editBannerVisibility: state.banner.editBannerVisibility,
    discounts: state.discount.discounts,
    banners: state.banner.banners,
    loading: state.banner.loading,
    status: state.banner.status,
  }
}

export default connect(mapStateToProps, bannerDispatch)(AllBannerPage)
