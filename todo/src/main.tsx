import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import store from './redux/store.ts'
import AppReduxByComponent from './AppReduxByComponent-v4.tsx'

import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './redux/store.ts'


createRoot(document.getElementById('root')!).render(
    <Provider store={store} >
        <PersistGate loading={null} persistor={persistor} >            
            <AppReduxByComponent />
        </PersistGate>
    </Provider>
)
