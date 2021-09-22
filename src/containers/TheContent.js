import React, { Suspense } from 'react'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'

// routes config
import routes from '../routes'
import Page404 from "../views/pages/page404/Page404";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheContent = ({isLogin}) => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props =>
                    isLogin?(
                      <CFade>
                        <route.component {...props} />
                      </CFade>):(
                      <Redirect to={{ pathname: "/login" }} />
                    )

                  } />
              )
            })}
            {/*<Route exact path="*" name="Page 404" render={props => <Page404 {...props}/>} />*/}
            {/*<Redirect from="*" to="/dashboard" />*/}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
