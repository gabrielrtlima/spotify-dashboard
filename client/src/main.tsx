import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './routes/PrivateRoute.tsx'
import { Home } from './pages/home/index.tsx'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route element={<PrivateRoute />} >
        <Route path="/dashboard" element={<Home />} />
      </Route>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
)
