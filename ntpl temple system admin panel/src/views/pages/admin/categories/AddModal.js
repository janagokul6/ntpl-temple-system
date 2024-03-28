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
import globalVariable from 'src/globalVariable'

const AddModal = ({ visible, setVisible, updateData, data, currentProcess, selectedId }) => {
  function handleFormSubmit(e) {
    e.preventDefault()

    let form_data = new FormData()
    form_data.append('name', data.name)
    form_data.append('status', data.status)

    let url = ''
    let method = ''
    if (currentProcess === 'add') {
      url = `${process.env.REACT_APP_BACKEND_1}/admin/categories/add`
      method = 'post'
    } else if (currentProcess === 'update') {
      url = `${process.env.REACT_APP_BACKEND_1}/admin/categories/update/${selectedId}`
      method = 'put'
    }
    fetch(url, {
      method: method,
      body: form_data,
      headers: new Headers({
        Authorization: `Bearer ${globalVariable.accessToken}`,
      }),
    })
      .then((v) => v.json())
      .then((v) => {
        if (v.message === 'success') {
          if (currentProcess === 'add') {
            alert('Created successfully!')
          } else if (currentProcess === 'update') {
            alert('Updated successfully!')
          }
          setVisible(false)
          updateData()
        } else {
          alert('Something Went Wrong!')
        }
      })
      .catch((err) => {
        // console.log('====================================')
        // console.log(err.message)
        // console.log('====================================')
        alert('Something Went Wrong!')
      })
  }
  return (
    <>
      <CModal backdrop="static" visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Category Modal</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* form body */}

          <CCardBody>
            <CForm onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Category Name</CFormLabel>
                <CFormInput
                  type="text"
                  value={data.name}
                  onChange={(e) => {
                    data.setname(e.target.value)
                  }}
                  id="name"
                  name="name"
                  placeholder="name"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Category Status</CFormLabel>

                <select
                  className="form-select"
                  value={data.status}
                  onChange={(e) => {
                    data.setstatus(e.target.value)
                  }}
                  required
                  aria-label="Default select example"
                >
                  {['active', 'inactive'].map((value, index) => {
                    return (
                      <option key={index} value={value}>
                        {value}
                      </option>
                    )
                  })}
                </select>
              </div>

              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton type="submit" color="primary">
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
