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

const AddModal = ({ visible, setVisible }) => {
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Modal title</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* form body */}

          <CCardBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlInput1">Email address</CFormLabel>
                <CFormInput
                  type="email"
                  id="exampleFormControlInput1"
                  placeholder="name@example.com"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="exampleFormControlTextarea1">Example textarea</CFormLabel>
                <CFormTextarea id="exampleFormControlTextarea1" rows="3"></CFormTextarea>
              </div>
              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton type="button" color="primary">
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
