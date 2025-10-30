import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import "./locales/i18n"

//CSS
import 'normalize.css'
import "./styles/global.scss"

import "./styles/header-footer.scss"
import "./styles/form.scss"
import "./styles/artists.scss"
import "./styles/home.scss"
import "./styles/program.scss"
import "./styles/participate.scss"
import "./styles/info.scss"
import "./styles/admin.scss"
import "./styles/albums.scss"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>  
  </React.StrictMode>
)
