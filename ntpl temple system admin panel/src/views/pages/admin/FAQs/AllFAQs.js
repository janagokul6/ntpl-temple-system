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
const Centers = () => {
  const dispatch = useDispatch()
  const AllFaqs = useSelector((state) => state.faqsReducer)
  const [visible, setVisible] = useState(false)
  const [faqList, setFaqList] = useState([])

  useEffect(() => {
    if (AllFaqs.length === 0) {
      dispatch(getFAQsList())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                      <CAccordionHeader>{item.question}</CAccordionHeader>
                      <CAccordionBody>{item.answer}</CAccordionBody>
                    </CAccordionItem>
                  ))}
                </CAccordion>
              </CCardBody>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <AddModal visible={visible} setVisible={setVisible} />
    </>
  )
}

export default Centers
