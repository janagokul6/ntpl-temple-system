/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
  CLink,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CPopover,
  CTooltip,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import axios from 'axios'
import { API } from 'src/globalVariable'
import { getFAQsList } from 'src/redux/action'
import { useDispatch, useSelector } from 'react-redux'

const AddModal = ({ visible, setVisible }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ question: '', answer: '' })
  const updateData = () => {
    dispatch(getFAQsList())
  }
  const handleSave = async (e) => {
    try {
      const res = await API.post('/admin/faq/add', data)
      setVisible(false)
      updateData()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>FAQs</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* form body */}

          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="Question">FAQ question</CFormLabel>
                <CFormInput
                  type="text"
                  id="question"
                  value={data.question}
                  onChange={(e) => {
                    setData({ ...data, question: e.target.value })
                  }}
                  placeholder="Question"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="answer">FAQ answer</CFormLabel>
                <CFormTextarea
                  id="answer"
                  value={data.answer}
                  onChange={(e) => {
                    setData({ ...data, answer: e.target.value })
                  }}
                  rows="3"
                ></CFormTextarea>
              </div>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton type="button" color="primary" onClick={handleSave}>
                  Save changes
                </CButton>
              </CModalFooter>
            </CForm>
          </CCardBody>
          {/* form body */}
        </CModalBody>
      </CModal>
    </>
  )
}

export default AddModal
