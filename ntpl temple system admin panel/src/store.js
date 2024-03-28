import { configureStore } from '@reduxjs/toolkit'
import roothReducer from './redux/roothReducer'
import CreateSagaModdleWare from 'redux-saga'
import SagaData from './redux/saga'

const sagaMiddleware = CreateSagaModdleWare()

const store = configureStore({
  reducer: roothReducer,
  middleware: () => [sagaMiddleware],
})

sagaMiddleware.run(SagaData)
export default store
