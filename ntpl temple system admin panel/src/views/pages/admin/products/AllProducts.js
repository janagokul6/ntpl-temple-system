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
import { getProductsList, getCategoriesList } from 'src/redux/action'
import { useDispatch, useSelector } from 'react-redux'
import globalVariable from 'src/globalVariable'
// ------------   redux ---------------------

const AllProducts = () => {
  const [currentProcess, setCurrentProcess] = useState('')
  const [selectedId, setselectedId] = useState('')
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()
  const AllProducts = useSelector((state) => state.productsReducer)
  const AllCategories = useSelector((state) => state.categoriesReducer)

  const updateData = () => {
    dispatch(getProductsList())
  }
  // custom for every new table
  const TableName = 'Products'
  // custom for every new table

  const [name, setname] = useState('')
  const [image, setimage] = useState('')
  const [image2, setimage2] = useState('')
  const [image3, setimage3] = useState('')
  const [image4, setimage4] = useState('')
  const [image5, setimage5] = useState('')
  const [description, setdescription] = useState('')
  const [mrp, setmrp] = useState('')
  const [price, setprice] = useState('')
  const [category, setcategory] = useState('')
  const [status, setstatus] = useState('')

  const handleCheckBoxChange = (item) => {
    if (category.includes(item)) {
      setcategory((prevArray) => prevArray.filter((value, index) => value !== item))
    } else {
      setcategory((prevArray) => [...prevArray, item])
    }
  }

  const data = {
    name: name,
    setname: setname,
    image: image,
    setimage: setimage,
    image2: image2,
    setimage2: setimage2,
    image3: image3,
    setimage3: setimage3,
    image4: image4,
    setimage4: setimage4,
    image5: image5,
    setimage5: setimage5,
    description: description,
    setdescription: setdescription,
    mrp: mrp,
    setmrp: setmrp,
    price: price,
    setprice: setprice,
    category: category,
    setcategory: setcategory,
    status: status,
    setstatus: setstatus,
  }

  // ----------------------------------------------------------------
  const deleteData = async (itemId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('are you sure you want to delete!')) {
      fetch(`${process.env.REACT_APP_BACKEND_1}/admin/products/delete/${itemId}`, {
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
    setimage2('')
    setimage3('')
    setimage4('')
    setimage5('')
    setdescription('')
    setmrp('')
    setprice('')
    setcategory('')
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
    setimage(thisRow.children[2].children[0].src)
    setimage2(thisRow.children[3].children[0].src)
    setimage3(thisRow.children[4].children[0].src)
    setimage4(thisRow.children[5].children[0].src)
    setimage5(thisRow.children[6].textContent)
    setdescription(thisRow.children[7].textContent)
    setmrp(thisRow.children[8].textContent)
    setprice(thisRow.children[9].textContent)
    // setcategory(thisRow.children[10].textContent)
    if (thisRow.children[10].textContent) {
      setcategory(JSON.parse(thisRow.children[10].textContent))
    } else {
      setcategory([])
    }
    setstatus(thisRow.children[11].textContent)
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
    setimage2(thisRow.children[3].children[0].src)
    setimage3(thisRow.children[4].children[0].src)
    setimage4(thisRow.children[5].children[0].src)
    setimage5(thisRow.children[6].textContent)
    setdescription(thisRow.children[7].textContent)
    setmrp(thisRow.children[8].textContent)
    setprice(thisRow.children[9].textContent)
    // setcategory(thisRow.children[10].textContent)
    if (thisRow.children[10].textContent) {
      setcategory(JSON.parse(thisRow.children[10].textContent))
    } else {
      setcategory([])
    }
    setstatus(thisRow.children[11].textContent)
  }
  // ==================== update / Delete / Add =================

  useEffect(() => {
    if (AllProducts.length === 0) {
      dispatch(getProductsList())
    }
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
              <strong>Products Data</strong>{' '}
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
                    <CTableHeaderCell scope="col">name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">image</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">description</CTableHeaderCell> */}
                    <CTableHeaderCell scope="col">mrp</CTableHeaderCell>
                    <CTableHeaderCell scope="col">price</CTableHeaderCell>
                    <CTableHeaderCell scope="col">category</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                    <CTableHeaderCell scope="col" className="action-width">
                      Action
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {AllProducts.map((value, index) => {
                    return (
                      <CTableRow key={index} id={`${TableName}_${index}`}>
                        <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                        {/* ----------------- */}
                        <CTableDataCell>{value.name}</CTableDataCell>
                        <CTableDataCell>
                          <img className="table-img" src={value.image} alt="" />
                        </CTableDataCell>
                        <CTableDataCell style={{ display: 'none' }}>
                          <img className="table-img" src={value.image2} alt="" />
                        </CTableDataCell>
                        <CTableDataCell style={{ display: 'none' }}>
                          <img className="table-img" src={value.image3} alt="" />
                        </CTableDataCell>
                        <CTableDataCell style={{ display: 'none' }}>
                          <img className="table-img" src={value.image4} alt="" />
                        </CTableDataCell>
                        <CTableDataCell style={{ display: 'none' }}>
                          <img className="table-img" src={value.image5} alt="" />
                        </CTableDataCell>
                        <CTableDataCell style={{ display: 'none' }}>
                          {value.description}
                        </CTableDataCell>
                        <CTableDataCell>{value.mrp}</CTableDataCell>
                        <CTableDataCell>{value.price}</CTableDataCell>
                        <CTableDataCell style={{ display: 'none' }}>
                          {value.category}
                        </CTableDataCell>
                        <CTableDataCell>
                          {value.category &&
                            JSON.parse(value.category).length > 0 &&
                            JSON.parse(value.category).map((value1, index1) =>
                              AllCategories.map((value2, index2) => {
                                if (value2._id === value1) {
                                  return <span key={index2}>{value2.name} , </span>
                                } else {
                                  return ''
                                }
                              }),
                            )}
                        </CTableDataCell>
                        <CTableDataCell>{value.status}</CTableDataCell>
                        {/* ----------------- */}
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
        AllCategories={AllCategories}
        handleCheckBoxChange={handleCheckBoxChange}
      />
    </>
  )
}

export default AllProducts
