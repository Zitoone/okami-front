import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import {HelmetProvider} from "react-helmet-async"
import "./locales/i18n"
import Header from "./components/Header"
import Footer from "./components/Footer"
//CSS
import 'normalize.css'
import "./styles/global.scss"
import "./styles/header-footer.scss"
import "./styles/form.scss"
import "./styles/artists.scss"
import "./styles/home.scss"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
    <BrowserRouter>
      <Header />
      <App />
      <Footer />
    </BrowserRouter>  
    </HelmetProvider>
  </React.StrictMode>
)
