import React, { useState } from 'react'
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
const ForgetPassword = () => {
  const navigate = useNavigate()

  const [isOtpSend, setIsOtpSend] = useState(false)
  const [token, setToken] = useState(false)

  const [email, setemail] = useState('')
  const [otp, setOtp] = useState('')
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [cPassword, setcPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSendingOtp(true)
    let form_data = new FormData()
    form_data.append('email', email)

    fetch(`${process.env.REACT_APP_BACKEND_1}/auth/admin/forget-password`, {
      method: 'POST',
      body: form_data,
    })
      .then((v) => v.json())
      .then((v) => {
        if (v.message === 'success') {
          setIsOtpSend(true)
          alert(`Otp send On Email ( ${email} ) Successfully!`)
        } else {
          alert('Invalid Credentials')
        }
      })
      .catch((err) => {
        alert('something went wrong Or Inconrrent Credentials! Please try again.')
        console.log(err.message)
      })
      .finally(() => {
        setIsSendingOtp(false)
      })
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()

    let form_data = new FormData()
    form_data.append('email', email)
    form_data.append('otp', otp)

    fetch(`${process.env.REACT_APP_BACKEND_1}/auth/admin/forget_password_verify`, {
      method: 'POST',
      body: form_data,
    })
      .then((v) => v.json())
      .then((v) => {
        if (v.message === 'success') {
          setToken(v.data.token)
        } else {
          alert('Invalid Otp')
        }
      })
      .catch((err) => {
        alert('something went wrong Or Inconrrent Otp! Please try again.')
        console.log(err.message)
      })
  }
  const handlePasswordUpdate = (e) => {
    e.preventDefault()
    console.log(token)

    let form_data = new FormData()
    form_data.append('newPassword', newPassword)

    fetch(`${process.env.REACT_APP_BACKEND_1}/auth/admin/forget-password-update`, {
      method: 'POST',
      body: form_data,
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    })
      .then((v) => v.json())
      .then((v) => {
        if (v.message === 'success') {
          alert('Password updated successfully! You Can Login.')
          navigate('/login')
        } else {
          if (v.message.detail === 'password_gen_error') {
            alert('Something Please Try Again.')
          } else if (v.message.detail === 'password_update_error') {
            alert('Something Please Try Again.')
          } else {
            alert('Something Please Try Again.')
          }
        }
      })
      .catch((err) => {
        alert('something went wrong! Please try again.')
        console.log(err.message)
      })
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  {!isOtpSend && (
                    <CForm
                      onSubmit={(e) => {
                        handleSubmit(e)
                      }}
                    >
                      <h1>Forget Password</h1>
                      <p className="text-medium-emphasis">Enter Your Registered Email Address</p>
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
                      {isSendingOtp && (
                        <CRow>
                          <CCol xs={12}>
                            <p>Please Wait! Sending Otp ...</p>
                          </CCol>
                        </CRow>
                      )}
                      <CRow>
                        <CCol xs={6}>
                          <CButton type="submit" color="primary" className="px-4">
                            Send Otp
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton
                            onClick={() => {
                              navigate('/login')
                            }}
                            color="link"
                            className="px-0"
                          >
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  )}
                  {isOtpSend && !token && (
                    <CForm
                      onSubmit={(e) => {
                        handleVerifyOtp(e)
                      }}
                    >
                      <h1>Verify Otp</h1>
                      <p className="text-medium-emphasis">
                        Enter Otp Sent Your Registered Email Address
                      </p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          value={otp}
                          onChange={(e) => {
                            setOtp(e.target.value)
                          }}
                          placeholder="Otp"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton type="submit" color="primary" className="px-4">
                            Verify Otp
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton
                            onClick={() => {
                              navigate('/login')
                            }}
                            color="link"
                            className="px-0"
                          >
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  )}
                  {token && (
                    <CForm
                      onSubmit={(e) => {
                        handlePasswordUpdate(e)
                      }}
                    >
                      <h1>Password Change</h1>
                      <p className="text-medium-emphasis">Enter New Password</p>
                      <CInputGroup className="mb-3">
                        <CInputGroupText>
                          <CIcon icon={cilUser} />
                        </CInputGroupText>
                        <CFormInput
                          type="text"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value)
                          }}
                          placeholder="password"
                        />
                      </CInputGroup>
                      <CInputGroup className="mb-4">
                        <CInputGroupText>
                          <CIcon icon={cilLockLocked} />
                        </CInputGroupText>
                        <CFormInput
                          value={cPassword}
                          onChange={(e) => {
                            setcPassword(e.target.value)
                          }}
                          type="password"
                          placeholder="Confirm Password"
                        />
                      </CInputGroup>
                      <CRow>
                        <CCol xs={6}>
                          <CButton type="submit" color="primary" className="px-4">
                            Update
                          </CButton>
                        </CCol>
                        <CCol xs={6} className="text-right">
                          <CButton
                            onClick={() => {
                              navigate('/login')
                            }}
                            color="link"
                            className="px-0"
                          >
                            Login
                          </CButton>
                        </CCol>
                      </CRow>
                    </CForm>
                  )}
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 login-div-box "
                style={{
                  backgroundImage: `url(${require('../../../assets/images/dummy/doctorimg.jpg')})`,
                }}
              ></CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ForgetPassword
