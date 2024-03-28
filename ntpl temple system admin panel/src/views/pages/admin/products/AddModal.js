/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react'
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
  CFormCheck,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import globalVariable from 'src/globalVariable'

const RenderCheckBox = ({ allCenters, data, handleCheckBoxChange }) => {
  return (
    <div>
      {allCenters.map((value, index) => {
        return (
          <CFormCheck
            key={index}
            id="defaultCheck1"
            checked={data.includes(value._id)}
            onChange={() => {
              handleCheckBoxChange(value._id)
            }}
            label={value.name}
          />
        )
      })}
    </div>
  )
}

const AddModal = ({
  visible,
  setVisible,
  updateData,
  data,
  currentProcess,
  selectedId,
  AllCategories,
  handleCheckBoxChange,
}) => {
  let imageRef1 = useRef()
  let imageRef2 = useRef()
  let imageRef3 = useRef()
  let imageRef4 = useRef()
  let imageRef5 = useRef()

  function handleFormSubmit(e) {
    e.preventDefault()

    let form_data = new FormData()
    form_data.append('name', data.name)
    form_data.append('image', imageRef1.current.files[0])
    form_data.append('image2', imageRef2.current.files[0])
    form_data.append('image3', imageRef3.current.files[0])
    form_data.append('image4', imageRef4.current.files[0])
    form_data.append('image5', imageRef5.current.files[0])
    form_data.append('description', data.description)
    form_data.append('mrp', data.mrp)
    form_data.append('price', data.price)
    form_data.append('category', JSON.stringify(data.category))
    form_data.append('status', data.status)

    let url = ''
    let method = ''
    if (currentProcess === 'add') {
      url = `${process.env.REACT_APP_BACKEND_1}/admin/products/add`
      method = 'post'
    } else if (currentProcess === 'update') {
      url = `${process.env.REACT_APP_BACKEND_1}/admin/products/update/${selectedId}`
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
                <CFormLabel htmlFor="title">Product Name</CFormLabel>
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
                <CFormLabel htmlFor="title">image</CFormLabel>
                <CFormInput type="file" name="image" ref={imageRef1} />
                <img className="form-img" src={data.image} alt="" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">image2</CFormLabel>
                <CFormInput type="file" name="image2" ref={imageRef2} />
                <img className="form-img" src={data.image2} alt="" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">image3</CFormLabel>
                <CFormInput type="file" name="image3" ref={imageRef3} />
                <img className="form-img" src={data.image3} alt="" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">image4</CFormLabel>
                <CFormInput type="file" name="image4" ref={imageRef4} />
                <img className="form-img" src={data.image4} alt="" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">image5</CFormLabel>
                <CFormInput type="file" name="image5" ref={imageRef5} />
                <img className="form-img" src={data.image5} alt="" />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Description</CFormLabel>
                <CFormTextarea
                  type="text"
                  value={data.description}
                  onChange={(e) => {
                    data.setdescription(e.target.value)
                  }}
                  id="name"
                  name="description"
                  placeholder="description"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">MRP</CFormLabel>
                <CFormInput
                  type="number"
                  value={data.mrp}
                  onChange={(e) => {
                    data.setmrp(e.target.value)
                  }}
                  id="name"
                  name="mrp"
                  placeholder="MRP"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Selling Price</CFormLabel>
                <CFormInput
                  type="number"
                  value={data.price}
                  onChange={(e) => {
                    data.setprice(e.target.value)
                  }}
                  id="name"
                  name="price"
                  placeholder="Selling Price"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Categories</CFormLabel>

                <RenderCheckBox
                  allCenters={AllCategories}
                  data={data.category}
                  handleCheckBoxChange={handleCheckBoxChange}
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">Product Status</CFormLabel>

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
