import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useCookies } from 'react-cookie'
import globalVariable from 'src/globalVariable'

const Login = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['admin_access_token'])
  const navigate = useNavigate()

  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem('admin_access_details')) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    let form_data = new FormData()
    form_data.append('email', email)
    form_data.append('password', password)

    fetch(`${process.env.REACT_APP_BACKEND_1}/auth/admin/login`, {
      method: 'POST',
      body: form_data,
    })
      .then((v) => v.json())
      .then((v) => {
        if (v.message === 'success') {
          const now = new Date()
          setCookie('admin_access_token', v.data.token, {
            path: '/',
            secure: true,
            sameSite: 'None',
            expires: new Date(now.getTime() + 10 * 60 * 60 * 1000),
          })

          globalVariable.accessToken = v.data.token
          sessionStorage.setItem('admin_access_details', JSON.stringify(v.data.userData))
          alert('login success')
          window.location.reload()
        } else {
          alert('Invalid Credentials')
        }
      })
      .catch((err) => {
        alert('something went wrong Or Inconrrent Credentials! Please try again.')
        console.log(err.message)
      })
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer className="mt-4">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    onSubmit={(e) => {
                      handleSubmit(e)
                    }}
                  >
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        value={email}
                        onChange={(e) => {
                          setemail(e.target.value)
                        }}
                        placeholder="Email"
                        autoComplete="email"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        value={password}
                        onChange={(e) => {
                          setpassword(e.target.value)
                        }}
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          onClick={() => {
                            navigate('/forget-password')
                          }}
                          color="link"
                          className="px-0"
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 login-div-box"
                style={{
                  backgroundImage: `url(${require('../../../assets/images/dummy/doctorimg.jpg')})`,
                }}
              >
                {/* <img
                  src={}
                  alt="dummy img"
                  style={{ width: '100%', aspectRatio: 1 }}
                /> */}
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
