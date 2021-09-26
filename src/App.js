import React, {Component, useEffect} from 'react';
import {HashRouter, BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './scss/style.scss';
import {useSelector} from "react-redux";
import {initiateSocket, subscribeToChat} from "./utils/socketHelper";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = ()=> {
  useEffect(()=>{
    initiateSocket()
  },[])
  const isLogin = useSelector(state => state.user.user)
  // render() {
    return (
      <Router>
          <React.Suspense fallback={loading}>
            <Switch>
              {isLogin &&(
                <Redirect from="/login" to="/"/>
              )}
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props} isLogin={isLogin}/>} />
              {/*<ProtectedRouter path="/" name="Home" component={TheLayout} isAuth={true}/>*/}
              {/*<Route path="*" name="Page 404" render={props => <Page404 {...props}/>} />*/}
              {/*<Redirect from="/" to="/dashboard" />*/}
            </Switch>
          </React.Suspense>
      </Router>
    );
  // }
}

export default App;

const ProtectedRouter = ({isAuth: isAuth, component: Component, ...rest})=>{
  console.log(isAuth)
  return(
    <Route
      {...rest}
      render={props=>{
        if(isAuth){
          return <Component/>
        }else {
          return (
            <Redirect to="/login"/>
          )
        }
      }}
    />
  )
}
