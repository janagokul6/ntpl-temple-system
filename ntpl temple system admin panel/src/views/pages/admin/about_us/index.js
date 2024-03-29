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

const AboutUs = () => {
  let imageRef = useRef(null)
  const dispatch = useDispatch()
  const [data, setData] = useState({ title: '', image: '', description: '' })
  const updateData = () => {
    dispatch(getWebsiteDetailsList())
  }

  const handleImageChange = () => {
    const file = imageRef.current.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageDataUrl = reader.result
        setData({ ...data, image: imageDataUrl })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/admin/website-details/add', { about: data })
      updateData()
      setData({ title: '', image: '', description: '' })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CModalHeader>
        <CModalTitle>Basic Details</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* form body */}

        <CCardBody>
          <CForm onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <CFormLabel htmlFor="title">Title</CFormLabel>
              <CFormInput
                type="text"
                value={data.title}
                onChange={(e) => {
                  setData({ ...data, title: e.target.value })
                }}
                id="title"
                name="title"
                placeholder="Title"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="title">image</CFormLabel>
              <CFormInput type="file" name="image" onChange={handleImageChange} ref={imageRef} />
              <img className="form-img" src={data.image} alt="" />
            </div>

            <div className="mb-3">
              <CFormLabel htmlFor="description">Description</CFormLabel>
              <CFormTextarea
                type="text"
                value={data.description}
                onChange={(e) => {
                  setData({ ...data, description: e.target.value })
                }}
                id="description"
                name="description"
                placeholder="description"
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

export default AboutUs
