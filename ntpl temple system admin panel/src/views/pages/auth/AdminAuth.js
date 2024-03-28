import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { CSpinner } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
// ------------   redux ---------------------
import { getRolesList } from 'src/redux/action'
import { useDispatch } from 'react-redux'
// ------------   redux ---------------------
import globalVariable from 'src/globalVariable'
const DefaultLayout = React.lazy(() => import('../../../layout/DefaultLayout'))

const AdminAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cookies] = useCookies(['admin_access_token'])

  const [status, setStatus] = useState('check')

  const veryfyCookie = () => {
    fetch(`${process.env.REACT_APP_BACKEND_1}/auth/verify-token`, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${cookies.admin_access_token}`,
      }),
    })
      .then((v) => v.json())
      .then((v) => {
        if (v.message === 'success') {
          setStatus('verified')
          dispatch(getRolesList())
          sessionStorage.setItem('admin_access_details', JSON.stringify(v.data.userData))
          setTimeout()
        } else {
          setStatus(false)
          navigate('/login')
        }
      })
      .catch((err) => {
        setStatus(false)
        navigate('/login')
      })
    // .finally(() => {
    //   // sessionStorage.setItem('admin_access_details', 'ok')
    // })
  }

  useEffect(() => {
    if (cookies.admin_access_token) {
      globalVariable.accessToken = cookies.admin_access_token
      if (sessionStorage.getItem('admin_access_details')) {
        setStatus('verified')
        dispatch(getRolesList())
      } else {
        veryfyCookie()
      }
    } else {
      setStatus(false)
      navigate('/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      {status === 'check' && (
        <div className="d-flex justify-content-center align-items-center authDiv">
          <CSpinner color="primary" />
        </div>
      )}
      {status === 'verified' && <DefaultLayout />}
    </div>
  )
}

export default AdminAuth
