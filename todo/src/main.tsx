import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
// import App1 from './App-1.tsx'
// import AppWithRedux from './AppWithRedux.tsx'

import { Provider } from 'react-redux'
import store from './redux/store.ts'
import AppReduxByComponent from './AppReduxByComponent-v4.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store} >
    <AppReduxByComponent />
    </Provider>
)
