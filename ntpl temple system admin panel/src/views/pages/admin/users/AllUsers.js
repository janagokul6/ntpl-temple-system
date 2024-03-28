import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import AddModal from './AddModal'
import CIcon from '@coreui/icons-react'

// ------------   redux ---------------------
import { getUsersList } from 'src/redux/action'
import { useDispatch, useSelector } from 'react-redux'
// ------------   redux ---------------------
import { cilPencil, cilTrash, cilZoomIn } from '@coreui/icons'
import globalVariable from 'src/globalVariable'

const AllUsers = () => {
  const dispatch = useDispatch()
  const allUser = useSelector((state) => state.userReducer)

  const updateData = () => {
    dispatch(getUsersList())
  }

  // ==================== update / Delete / Add =================
  const [currentProcess, setCurrentProcess] = useState('')
  const [selectedId, setselectedId] = useState('')
  const [visible, setVisible] = useState(false)
  // custom for every new table
  const TableName = 'Users'
  // custom for every new table

  // ----------------------------------------------------------------
  const [name, setname] = useState('')
  const [image, setimage] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [employeeId, setemployeeId] = useState('')
  const [mobileNumber, setmobileNumber] = useState('')
  const [designation, setdesignation] = useState('')
  const [role, setrole] = useState([{}])

  // ==================== role related methods =================
  const handleCheckBoxChange = (item) => {
    let prevRole = role
    if (role[0][item]) {
      delete prevRole[0][item]
    } else {
      prevRole[0][item] = []
    }
    setrole(prevRole)
  }
  const handleCheckBoxChange2 = (item, value) => {
    let prevRole = role
    if (role[0][item]) {
      if (role[0][item].includes(value)) {
        prevRole[0][item] = prevRole[0][item].filter((value1, index1) => {
          return value1 !== value
        })
      } else {
        prevRole[0][item].push(value)
      }
      setrole(prevRole)
    }
  }
  // ==================== role related methods =================
  const data = {
    name: name,
    setname: setname,
    image: image,
    setimage: setimage,
    email: email,
    role: role,
    setemail: setemail,
    password: password,
    setpassword: setpassword,
    designation: designation,
    setdesignation: setdesignation,
    setrole: setrole,
    employeeId: employeeId,
    setemployeeId: setemployeeId,
    mobileNumber: mobileNumber,
    setmobileNumber: setmobileNumber,
  }

  // ----------------------------------------------------------------
  const deleteData = async (itemId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('are you sure you want to delete!')) {
      fetch(`${process.env.REACT_APP_BACKEND_1}/admin/user/delete/${itemId}`, {
        method: 'DELETE',
        headers: new Headers({
          Authorization: `Bearer ${globalVariable.accessToken}`,
        }),
      })
        .then((v) => v.json())
        .then((v) => {
          if (v.message === 'success') {
            alert('deleted successfully')
          } else {
            alert('Something went wrong! Please try again.')
          }
          updateData()
        })
        .catch((error) => {
          alert('something went wrong! Try again.')
        })
    }
  }
  const handleAdd = () => {
    // ----------------------------------------------------------------
    setCurrentProcess('add')
    setVisible(true)
    // ----------------------------------------------------------------
    setname('')
    setimage('')
    setemail('')
    setpassword('')
    setemployeeId('')
    setmobileNumber('')
    setdesignation('')
    setrole([{}])
  }
  const handleView = (e, rowId) => {
    // console.log('====================================')
    // console.log(thisRow.children[1].textContent)
    // console.log('====================================')
    // ----------------------------------------------------------------
    setCurrentProcess('view')
    setVisible(true)
    // ----------------------------------------------------------------
    let thisRow = document.getElementById(`${TableName}_${rowId}`)

    // settitle(thisRow.children[1].textContent)
    setname(thisRow.children[1].textContent)
    setimage(thisRow.children[2].children[0].src)
    setemail(thisRow.children[3].textContent)
    setemployeeId(thisRow.children[4].textContent)
    setmobileNumber(thisRow.children[5].textContent)
    setdesignation(thisRow.children[6].textContent)
    if (thisRow.children[7].textContent) {
      setrole(JSON.parse(thisRow.children[7].textContent))
    } else {
      setrole([])
    }
  }

  const handleUpdate = (e, rowId, itemId) => {
    // ----------------------------------------------------------------
    setCurrentProcess('update')
    setselectedId(itemId)
    setVisible(true)
    // ----------------------------------------------------------------
    let thisRow = document.getElementById(`${TableName}_${rowId}`)

    setname(thisRow.children[1].textContent)
    setimage(thisRow.children[2].children[0].src)
    setemail(thisRow.children[3].textContent)
    setemployeeId(thisRow.children[4].textContent)
    setmobileNumber(thisRow.children[5].textContent)
    setdesignation(thisRow.children[6].textContent)
    if (thisRow.children[7].textContent) {
      setrole(JSON.parse(thisRow.children[7].textContent))
    } else {
      setrole([])
    }
    // settitle(thisRow.children[1].textContent)
    // setname(thisRow.children[1].textContent)
    // setimage(thisRow.children[2].children[0].src)
    // setemployeeId(thisRow.children[3].textContent)
    // setmobileNumber(thisRow.children[4].textContent)
    // setemail(thisRow.children[5].textContent)
    // setpassword(thisRow.children[6].textContent)
    // setdesignation(thisRow.children[7].textContent)
    // if (thisRow.children[8].textContent) {
    //   setcenter(JSON.parse(thisRow.children[8].textContent))
    // } else {
    //   setcenter([])
    // }
  }
  // ==================== update / Delete / Add =================

  useEffect(() => {
    if (allUser.length === 0) {
      dispatch(getUsersList())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>Admin Data</strong>{' '}
              <button
                onClick={() => {
                  handleAdd()
                }}
                className="btn btn-primary"
              >
                Add New
              </button>
            </CCardHeader>

            <CCardBody style={{ overflowX: 'scroll' }}>
              <CTable>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    {/* ----------------- */}
                    <CTableHeaderCell scope="col">name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">image</CTableHeaderCell>
                    <CTableHeaderCell scope="col">email</CTableHeaderCell>
                    <CTableHeaderCell scope="col">employeeId</CTableHeaderCell>
                    <CTableHeaderCell scope="col">mobileNumber</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">password</CTableHeaderCell> */}
                    <CTableHeaderCell scope="col">designation</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Roles</CTableHeaderCell> */}
                    {/* ----------------- */}
                    <CTableHeaderCell scope="col" className="action-width">
                      Action
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {allUser.map((value, index) => {
                    return (
                      <CTableRow key={index} id={`${TableName}_${index}`}>
                        <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                        {/* ----------------- */}
                        <CTableDataCell>{value.name}</CTableDataCell>
                        <CTableDataCell>
                          <img className="table-img" src={value.image} alt="" />
                        </CTableDataCell>
                        <CTableDataCell>{value.email}</CTableDataCell>
                        <CTableDataCell>{value.employeeId}</CTableDataCell>
                        <CTableDataCell>{value.mobileNumber}</CTableDataCell>
                        <CTableDataCell>{value.designation}</CTableDataCell>

                        <CTableDataCell style={{ display: 'none' }}>
                          {JSON.stringify(value.role)}
                        </CTableDataCell>
                        {/* <CTableDataCell>
                          {value.role &&
                            value.role.map((value1, index1) => {
                              return <span key={index1}>{value1.title} , </span>
                            })}
                        </CTableDataCell> */}
                        {/* ----------------- */}
                        <CTableDataCell>
                          <button
                            onClick={(e) => {
                              handleView(e, index)
                            }}
                            style={{ color: 'white' }}
                            className="btn btn-success m-1"
                          >
                            <CIcon icon={cilZoomIn} />
                          </button>
                          <button
                            onClick={(e) => {
                              handleUpdate(e, index, value._id)
                            }}
                            style={{ color: 'white' }}
                            className="btn btn-warning m-1"
                          >
                            <CIcon icon={cilPencil} />
                          </button>
                          <button
                            style={{ color: 'white' }}
                            onClick={() => {
                              deleteData(value._id)
                            }}
                            className="btn btn-danger m-1"
                          >
                            <CIcon icon={cilTrash} />
                          </button>
                        </CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <AddModal
        visible={visible}
        setVisible={setVisible}
        updateData={updateData}
        data={data}
        currentProcess={currentProcess}
        selectedId={selectedId}
        handleCheckBoxChange={handleCheckBoxChange}
        handleCheckBoxChange2={handleCheckBoxChange2}
      />
    </>
  )
}

export default AllUsers
