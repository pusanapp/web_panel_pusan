import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebar.sidebarShow)
  const user = useSelector(state => state.user.user)
  // const role = useSelector(state => state.sidebar.role)
  const role = user && user.role.toLowerCase();
  console.log('USER, ',user)

  // const [role, setRole] = useState('general')
  // dispatch({type: 'role', role: 'admin' })
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" >
        <h3 className="c-sidebar-brand-full">Pusan Panel</h3>
        <h5  className="c-sidebar-brand-minimized" onClick={()=>{console.log('tess2')}}>Pusan</h5>
        {/*<CIcon*/}
        {/*  className="c-sidebar-brand-full"*/}
        {/*  name="logo-negative"*/}
        {/*  height={35}*/}
        {/*/>*/}
        {/*<CIcon*/}
        {/*  className="c-sidebar-brand-minimized"*/}
        {/*  name="sygnet"*/}
        {/*  height={35}*/}
        {/*/>*/}
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={navigation[role]}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
