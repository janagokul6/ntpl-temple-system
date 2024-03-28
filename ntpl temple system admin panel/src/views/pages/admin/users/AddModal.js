/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import {
  CButton,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CFormCheck,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import globalVariable from 'src/globalVariable'

// const RenderCheckBoxData = ({
//   processData,
//   currentItem,
//   currentItemArray,
//   handleCheckBoxChange2,
// }) => {
//   const [updateRenderCheckBoxData, setupdateRenderCheckBoxData] = useState(false)

//   useEffect(() => {
//     console.log('====================================')
//     console.log('updateRenderCheckBoxData updated')
//     console.log('====================================')
//   }, [updateRenderCheckBoxData])
//   return (

//   )
// }

const RenderCheckBox = ({ allRoles, dataArr, handleCheckBoxChange, handleCheckBoxChange2 }) => {
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    console.log('====================================')
    console.log('stage 1 changed')
    console.log('====================================')
  }, [update])

  return (
    <div>
      {allRoles.map((value, index) => {
        return (
          <div key={index}>
            <CFormCheck
              id="defaultCheck1"
              checked={dataArr[0][value]}
              onChange={() => {
                handleCheckBoxChange(value)
                setUpdate(!update)
              }}
              label={value}
            />
            {dataArr[0][value] && (
              // <RenderCheckBoxData
              //   processData={['view', 'add', 'update', 'delete']}
              //   currentItem={value}
              //   currentItemArray={dataArr[0][value]}
              //   handleCheckBoxChange2={handleCheckBoxChange2}
              // />
              <div className="p-3">
                {['view', 'add', 'update', 'delete'].map((value1, index1) => {
                  return (
                    <CFormCheck
                      key={index1}
                      id="defaultCheck1"
                      checked={dataArr[0][value].includes(value1)}
                      onChange={() => {
                        handleCheckBoxChange2(value, value1)
                        // setupdateRenderCheckBoxData(!updateRenderCheckBoxData)
                        setUpdate(!update)
                      }}
                      label={value1}
                    />
                  )
                })}
              </div>
            )}
          </div>
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
  handleCheckBoxChange,
  handleCheckBoxChange2,
}) => {
  let imageRef1 = useRef()

  function handleFormSubmit(e) {
    e.preventDefault()

    let form_data = new FormData()
    form_data.append('name', data.name)
    form_data.append('image', imageRef1.current.files[0])
    form_data.append('email', data.email)
    form_data.append('password', data.password)
    form_data.append('employeeId', data.employeeId)
    form_data.append('mobileNumber', data.mobileNumber)
    form_data.append('designation', data.designation)
    form_data.append('role', JSON.stringify(data.role))
    form_data.append('userId', JSON.parse(sessionStorage.getItem('admin_access_details'))._id)

    let url = ''
    let method = ''
    if (currentProcess === 'add') {
      url = `${process.env.REACT_APP_BACKEND_1}/admin/user/add`
      method = 'post'
    } else if (currentProcess === 'update') {
      url = `${process.env.REACT_APP_BACKEND_1}/admin/user/update/${selectedId}`
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
          <CModalTitle>Centers</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {/* form body */}

          <CCardBody>
            <CForm onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <CFormLabel htmlFor="title">name</CFormLabel>
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
                <CFormLabel htmlFor="title">email</CFormLabel>
                <CFormInput
                  type="text"
                  value={data.email}
                  onChange={(e) => {
                    data.setemail(e.target.value)
                  }}
                  id="email"
                  name="email"
                  placeholder="email"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">password</CFormLabel>
                <CFormInput
                  type="text"
                  value={data.password}
                  onChange={(e) => {
                    data.setpassword(e.target.value)
                  }}
                  id="password"
                  name="password"
                  placeholder="password"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">employeeId</CFormLabel>
                <CFormInput
                  type="text"
                  value={data.employeeId}
                  onChange={(e) => {
                    data.setemployeeId(e.target.value)
                  }}
                  id="employeeId"
                  name="employeeId"
                  placeholder="employeeId"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">mobileNumber</CFormLabel>
                <CFormInput
                  type="text"
                  value={data.mobileNumber}
                  onChange={(e) => {
                    data.setmobileNumber(e.target.value)
                  }}
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="mobileNumber"
                />
              </div>

              <div className="mb-3">
                <CFormLabel htmlFor="title">designation</CFormLabel>
                <CFormInput
                  type="text"
                  value={data.designation}
                  onChange={(e) => {
                    data.setdesignation(e.target.value)
                  }}
                  id="designation"
                  name="designation"
                  placeholder="designation"
                />
              </div>
              <div className="mb-3">
                <CFormLabel htmlFor="title">roles</CFormLabel>

                <RenderCheckBox
                  allRoles={JSON.parse(sessionStorage.getItem('AllRolesList'))}
                  dataArr={data.role}
                  handleCheckBoxChange={handleCheckBoxChange}
                  handleCheckBoxChange2={handleCheckBoxChange2}
                />
              </div>

              <CModalFooter>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                {(currentProcess === 'update' || currentProcess === 'add') && (
                  <CButton type="submit" color="primary">
                    Save
                  </CButton>
                )}
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
