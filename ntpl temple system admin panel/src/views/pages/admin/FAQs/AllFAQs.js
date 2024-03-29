import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import AddModal from './AddModal'
import { useDispatch, useSelector } from 'react-redux'
import { getFAQsList } from 'src/redux/action'
import Typography from 'src/views/theme/typography/Typography'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilZoomIn } from '@coreui/icons'
import { API } from 'src/globalVariable'
const Centers = () => {
  const dispatch = useDispatch()
  const AllFaqs = useSelector((state) => state.faqsReducer)
  const [visible, setVisible] = useState(false)
  const [faqDataToUpdate, setFaqDataToUpdate] = useState({})

  useEffect(() => {
    if (AllFaqs.length === 0) {
      dispatch(getFAQsList())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const deleteData = async (id) => {
    try {
      await API.delete(`admin/faq/delete/${id}`)
      dispatch(getFAQsList())
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdate = async (item) => {
    setVisible(true)
    setFaqDataToUpdate(item)
  }

  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>FAQs Data</strong>{' '}
              <button
                onClick={() => {
                  setVisible(true)
                }}
                className="btn btn-primary"
              >
                Add New
              </button>
            </CCardHeader>

            <CCardBody style={{ overflowX: 'scroll' }}>
              {/* <CTable>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">1</CTableHeaderCell>
                  </CTableRow>
                </CTableBody>
              </CTable> */}
              <CCardHeader>
                <strong>FAQs</strong>
              </CCardHeader>
              <CCardBody>
                <CAccordion activeItemKey={0}>
                  {AllFaqs.map((item, i) => (
                    <CAccordionItem itemKey={i} key={i}>
                      <CAccordionHeader className="">
                        <p className="col-9 col-lg-10">{item.question}</p>
                        <div className="d-flex gap-3 col-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleUpdate(item)
                            }}
                            style={{ color: 'white' }}
                            className="btn btn-warning m-1"
                          >
                            <CIcon icon={cilPencil} />
                          </button>
                          <button
                            style={{ color: 'white' }}
                            onClick={(e) => {
                              e.stopPropagation()
                              deleteData(item._id)
                            }}
                            className="btn btn-danger m-1"
                          >
                            <CIcon icon={cilTrash} />
                          </button>
                        </div>
                      </CAccordionHeader>
                      <CAccordionBody>{item.answer}</CAccordionBody>
                    </CAccordionItem>
                  ))}
                </CAccordion>
              </CCardBody>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <AddModal visible={visible} faqDataToUpdate={faqDataToUpdate} setVisible={setVisible} />
    </>
  )
}

export default Centers
