import {Routes, Route} from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop.tsx'
import ScrollToTopButton from './components/ScrollToTopButton.tsx'
import { ProtectedRoute } from './components/ProtectedRoutes.tsx'

import Home from './publics-pages/home.tsx'
import Legal from './publics-pages/legal.tsx'
import NotFound from './publics-pages/404.tsx'
import Program from './publics-pages/program.tsx'
import Participate from './publics-pages/participate.tsx'
import Informations from './publics-pages/informations.tsx'
import Souvenir from './publics-pages/albums.tsx'
import Album2022 from './publics-pages/album2022.tsx'
import Album2023 from './publics-pages/album2023.tsx'
import Album2024 from './publics-pages/album2024.tsx'
import Album2025 from './publics-pages/album2025.tsx'
import Contact from './publics-pages/contact.tsx'
import MusicProgram from './publics-pages/programMusic.tsx'

//Pages privées/formulaires
import ArtistForm from './private-pages/formArtist.tsx'
import LoginForm from './private-pages/loginAdmin.tsx'
import Dashboard from './private-pages/admin/dashboard.tsx'
import ArtistPage from './private-pages/admin/artists.tsx'
import ArtistEdit from './private-pages/admin/artistEdit.tsx'
import ArtistNew from './private-pages/admin/artistNew.tsx'

function App(){
  return(
    <>
    <ScrollToTop />
    <ScrollToTopButton />
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/program' element={<Program />} />
      <Route path='/program/music' element={<MusicProgram />} />
    <Route path='/participate' element={<Participate />} />
    <Route path='/faq' element={<Informations />} />
    <Route path='/souvenir' element={<Souvenir />} />
      <Route path='/souvenir/2022' element={<Album2022 />} />
      <Route path='/souvenir/2023' element={<Album2023 />} />
      <Route path='/souvenir/2024' element={<Album2024 />} />
      <Route path='/souvenir/2025' element={<Album2025 />} />
    <Route path='/contact' element={<Contact />} />    
    <Route path='/legal' element={<Legal />} />
    <Route path='*' element={<NotFound />} />

{/* Pages privées */}
    <Route path='/artist-form' element={<ArtistForm />} />

    <Route path='/login' element={<LoginForm />} />
    <Route path='/admin/dashboard' element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>} />
    <Route path='/admin/artists' element={
      <ProtectedRoute>
        <ArtistPage />
      </ProtectedRoute>}/> 
    <Route path='/admin/artist-edit/:id' element={
      <ProtectedRoute>
        <ArtistEdit />
      </ProtectedRoute>}/>
    <Route path='/admin/artists/new' element={
      <ProtectedRoute>
        <ArtistNew />
      </ProtectedRoute>} />
    
    </Routes>
    </>
  )
}
export default App