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
import { cilPencil, cilTrash, cilZoomIn } from '@coreui/icons'
// ------------   redux ---------------------
import { getCategoriesList } from 'src/redux/action'
import { useDispatch, useSelector } from 'react-redux'
import globalVariable from 'src/globalVariable'
// ------------   redux ---------------------

const AllCategories = () => {
  const [currentProcess, setCurrentProcess] = useState('')
  const [selectedId, setselectedId] = useState('')
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()
  const AllCategories = useSelector((state) => state.categoriesReducer)

  const updateData = () => {
    dispatch(getCategoriesList())
  }

  // custom for every new table
  const TableName = 'Categories'
  // custom for every new table

  const [name, setname] = useState('')
  const [status, setstatus] = useState('')

  const data = {
    name: name,
    setname: setname,
    status: status,
    setstatus: setstatus,
  }

  // ----------------------------------------------------------------
  const deleteData = async (itemId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('are you sure you want to delete!')) {
      fetch(`${process.env.REACT_APP_BACKEND_1}/admin/categories/delete/${itemId}`, {
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
    setstatus('active')
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

    setname(thisRow.children[1].textContent)
    setstatus(thisRow.children[2].textContent)
  }

  const handleUpdate = (e, rowId, itemId) => {
    // ----------------------------------------------------------------
    setCurrentProcess('update')
    setselectedId(itemId)
    setVisible(true)
    // ----------------------------------------------------------------
    let thisRow = document.getElementById(`${TableName}_${rowId}`)

    setname(thisRow.children[1].textContent)
    setstatus(thisRow.children[2].textContent)
  }
  // ==================== update / Delete / Add =================

  useEffect(() => {
    if (AllCategories.length === 0) {
      dispatch(getCategoriesList())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>Categories Data</strong>{' '}
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
                    <CTableHeaderCell scope="col">Category Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Category Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="action-width">
                      Action
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {AllCategories.map((value, index) => {
                    return (
                      <CTableRow key={index} id={`${TableName}_${index}`}>
                        <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                        {/* ----------------- */}
                        <CTableDataCell>{value.name}</CTableDataCell>
                        <CTableDataCell>{value.status}</CTableDataCell>
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
      />
    </>
  )
}

export default AllCategories
