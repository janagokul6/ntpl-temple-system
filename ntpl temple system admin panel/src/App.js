import React, { Component, Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './scss/style.scss'
import './app.css'

// ---------- redux ----------
import { useDispatch, useSelector } from 'react-redux'

// ---------- redux ----------

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const AdminAuth = React.lazy(() => import('./views/pages/auth/AdminAuth'))
const ForgetPassword = React.lazy(() => import('./views/pages/login/ForgetPassword'))
const Login = React.lazy(() => import('./views/pages/login/Login'))

// Pages
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route
              exact
              path="/forget-password"
              name="Register Page"
              element={<ForgetPassword />}
            />
            <Route exact path="/login" name="Login Page" element={<Login />} />
            {/* <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
            <Route path="*" name="Home" element={<AdminAuth />} />
          </Routes>
        </Suspense>
      </HashRouter>
    )
  }
}

export default App
