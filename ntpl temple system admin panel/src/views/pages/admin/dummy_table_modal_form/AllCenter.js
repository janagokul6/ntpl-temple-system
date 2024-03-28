import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import AddModal from './AddModal'
const Centers = () => {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader className="d-flex justify-content-between">
              <strong>Center Data</strong>{' '}
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
              <CTable>
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
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <AddModal visible={visible} setVisible={setVisible} />
    </>
  )
}

export default Centers
