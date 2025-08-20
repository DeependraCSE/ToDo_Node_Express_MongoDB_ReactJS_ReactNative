// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import App from './App.tsx'
import AppMainRoute from './navigation/route'
// import App from './screens/varifyOtp'
import './index.css'
import './locales/i18n'
import { MessageProvider } from './globalmessage/messageContext'


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <div>
      <MessageProvider>
        <AppMainRoute />
      </MessageProvider>
    </div>
  // </StrictMode>,
)
