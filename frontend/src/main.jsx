
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'

createRoot(document.getElementById('root')).render(

<BrowserRouter>
 {/* Provide the Redux store to the whole app */}
<Provider store={store}>        
    <App />
</Provider>
</BrowserRouter>
);