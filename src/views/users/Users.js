import React, {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {connect} from "react-redux";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination, CFormGroup, CInput, CButton
} from '@coreui/react'
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {Search} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import overlayFactory from "react-bootstrap-table2-overlay";
import usersData from './UsersData'
import {userDispatch} from "../pages/login/loginRedux";
import {FaPencilAlt, FaTrashAlt} from "react-icons/all";
import {AddPanelUserDialog} from "../../reusable/user/AddPanelUserDialog";

const getBadge = status => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Inactive':
      return 'secondary'
    case 'Pending':
      return 'warning'
    case 'Banned':
      return 'danger'
    default:
      return 'primary'
  }
}

const Users = (props) => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [addPanelUserVisibility, setAddPanelUserVisibility] = useState(false)
  const {SearchBar} = Search;

  const columns = [
    {
      dataField: 'name',
      text: 'Nama',
      sort: true,
    },
    {
      dataField: 'username',
      text: 'Username',
      sort: true
    },
    {
      dataField: 'role',
      text: 'Role',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      sort: true,
      formatter: (cell, row) => {
        if (row.active) {
          return (
            <CBadge color={'success'}>Aktif</CBadge>
          )
        } else {
          return (
            <CBadge color={'danger'}>Tidak Aktif</CBadge>
          )
        }
      }
    },
    {
      dataField: 'action',
      text: 'Action',
      sort: true,
      formatter: (cell, row) => {
        return (
          <>
            <a>
                    <span>
                      <FaPencilAlt color="green"/>
                    </span>
            </a>
            <a className='ml-3'>
              <span><FaTrashAlt color="red"/></span>
            </a>
          </>
        )
      }
    }
  ]
  const showAddUserDialog = () => {
    setAddPanelUserVisibility(true)
  }
  const hideAddUserDialog = () => {
    setAddPanelUserVisibility(false)
  }
  const submitAddPanelUser = (data) => {
    data.active = true;
    console.log(data)
    props.addPanelUser(data)
    hideAddUserDialog()
  }

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }

  useEffect(() => {
    props.loadAllPanelUsers()
    props.loadAllAppsUsers()
  }, [])


  return (<>
      <AddPanelUserDialog show={addPanelUserVisibility} onHide={hideAddUserDialog} submit={submitAddPanelUser}/>
      <CRow>
        <CCol xl={6}>
          <CCard>
            <CCardHeader>
              Panel User
              {/*<small className="text-muted"> example</small>*/}
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <ToolkitProvider
                    keyField="id"
                    data={props.panelUsers}
                    columns={columns}
                    search
                  >
                    {(props) => (
                      <div>
                        <div className="row align-items-center justify-content-between mx-auto">
                          <SearchBar {...props.searchProps} />
                          <button
                            className="col-auto btn btn-success"
                            onClick={showAddUserDialog}
                          >
                            Tambah User Baru
                          </button>
                        </div>
                        <BootstrapTable
                          {...props.baseProps}
                          // remote
                          striped
                          pagination={paginationFactory()}
                          noDataIndication={() => (
                            <div>No data found</div>
                          )}
                          loading={props.loading}
                          bootstrap4
                          bordered={false}
                          // onTableChange={onTableChange}
                          overlay={overlayFactory({
                            spinner: true,
                            styles: {
                              overlay: (base) => ({
                                ...base,
                                background:
                                  "rgba(192,192,192,0.5)",
                              }),
                            },
                          })}
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xl={6}>
          <CCard>
            <CCardHeader>
              Aplikasi User
              {/*<small className="text-muted"> example</small>*/}
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol>
                  <ToolkitProvider
                    keyField="id"
                    data={props.appUsers}
                    columns={columns}
                    search
                  >
                    {(props) => (
                      <div>
                        <div className="row align-items-center justify-content-between mx-auto">
                          <SearchBar {...props.searchProps} />
                          {/*<button*/}
                          {/*  className="col-auto btn btn-success"*/}
                          {/*  onClick={showAddUserDialog}*/}
                          {/*>*/}
                          {/*  Tambah User Baru*/}
                          {/*</button>*/}
                        </div>
                        <BootstrapTable
                          {...props.baseProps}
                          // remote
                          striped
                          pagination={paginationFactory()}
                          noDataIndication={() => (
                            <div>No data found</div>
                          )}
                          loading={props.loading}
                          bootstrap4
                          bordered={false}
                          // onTableChange={onTableChange}
                          overlay={overlayFactory({
                            spinner: true,
                            styles: {
                              overlay: (base) => ({
                                ...base,
                                background:
                                  "rgba(192,192,192,0.5)",
                              }),
                            },
                          })}
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>

      </CRow>
    </>
  )
}
const mapStateToProps = (state) => {
  return {
    appUsers: state.user.appUsers,
    panelUsers: state.user.panelUsers,
    loading: state.user.loading
  }
}
export default connect(mapStateToProps, userDispatch)(Users)
