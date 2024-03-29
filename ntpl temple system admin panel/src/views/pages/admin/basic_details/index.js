import React, { useRef, useState } from 'react'
import {
  CButton,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import { API } from 'src/globalVariable'
import { getWebsiteDetailsList } from 'src/redux/action'
import { useDispatch } from 'react-redux'
const BasicDetails = () => {
  let imageRef = useRef(null)
  const dispatch = useDispatch()
  const [data, setData] = useState({
    iosLink: '',
    androidLink: '',
    logo: '',
    number: '',
    email: '',
    address: '',
  })
  const updateData = () => {
    dispatch(getWebsiteDetailsList())
  }

  const handleImageChange = () => {
    const file = imageRef.current.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageDataUrl = reader.result
        setData({ ...data, logo: imageDataUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/admin/website-details/add', { basicDetails: data })
      updateData()
      imageRef = null
      setData({
        iosLink: '',
        androidLink: '',
        logo: '',
        number: '',
        email: '',
        address: '',
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CModalHeader>
        <CModalTitle>About Us Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* form body */}

        <CCardBody>
          <CForm onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="title">IOS Link</CFormLabel>
              <CFormInput
                type="text"
                value={data.iosLink}
                onChange={(e) => {
                  setData({ ...data, iosLink: e.target.value })
                }}
                id="iosLink"
                name="iosLink"
                placeholder="IOS Link"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="title">Android Link</CFormLabel>
              <CFormInput
                type="text"
                value={data.androidLink}
                onChange={(e) => {
                  setData({ ...data, androidLink: e.target.value })
                }}
                id="androidLink"
                name="androidLink"
                placeholder="Android Link"
              />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="title">Logo</CFormLabel>
              <CFormInput type="file" name="logo" onChange={handleImageChange} ref={imageRef} />
              <img className="form-img" src={data.logo} alt="" />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="title">Email</CFormLabel>
              <CFormInput
                type="text"
                value={data.email}
                onChange={(e) => {
                  setData({ ...data, email: e.target.value })
                }}
                id="email"
                name="email"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="title">Mobile number</CFormLabel>
              <CFormInput
                type="text"
                value={data.mobileNumber}
                onChange={(e) => {
                  setData({ ...data, number: e.target.value })
                }}
                id="number"
                name="number"
                placeholder="Mobile number"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="address">Address</CFormLabel>
              <CFormTextarea
                type="text"
                value={data.address}
                onChange={(e) => {
                  setData({ ...data, address: e.target.value })
                }}
                id="address"
                name="address"
                placeholder="Address"
              />
            </div>

            <CModalFooter>
              <CButton type="submit" color="primary">
                Save changes
              </CButton>
            </CModalFooter>
          </CForm>
        </CCardBody>
        {/* form body */}
      </CModalBody>
    </>
  )
}

export default BasicDetails
