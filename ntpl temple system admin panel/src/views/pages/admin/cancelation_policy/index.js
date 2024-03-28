import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { getWebsiteDetailsList } from 'src/redux/action'
import { API } from 'src/globalVariable'

const CancelationPolicy = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ title: '', description: '' })
  const AllWebsiteDetails = useSelector((state) => state.websiteDetailsReducer)
  useEffect(() => {
    if (AllWebsiteDetails.length === 0) {
      dispatch(getWebsiteDetailsList())
    }
  }, [])
  const updateData = () => {
    dispatch(getWebsiteDetailsList())
  }
  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post('/admin/website-details/add', { cancelationPolicy: data })
      updateData()
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <CModalHeader>
        <CModalTitle>Cancelation policy</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* form body */}

        <CCardBody>
          <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="Title">Title</CFormLabel>
              <CFormInput
                type="text"
                id="title"
                value={data.title}
                onChange={(e) => {
                  setData({ ...data, title: e.target.value })
                }}
                placeholder="Title"
              />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="description">Description</CFormLabel>
              <CFormTextarea
                id="description"
                value={data.description}
                onChange={(e) => {
                  setData({ ...data, description: e.target.value })
                }}
                rows="3"
              ></CFormTextarea>
            </div>
            <CModalFooter>
              <CButton type="button" color="primary" onClick={handleSave}>
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

export default CancelationPolicy
