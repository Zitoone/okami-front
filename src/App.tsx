import {Routes, Route} from 'react-router-dom'
import Home from './publics-pages/home.tsx'
import Legal from './publics-pages/legal.tsx'
import NotFound from './publics-pages/notFound.tsx'
import Program from './publics-pages/program.tsx'
import Participate from './publics-pages/participate.tsx'
import Informations from './publics-pages/informations.tsx'
import Souvenirs from './publics-pages/souvenirs.tsx'
import Contact from './publics-pages/contact.tsx'
import MusicProgram from './publics-pages/programMusic.tsx'

//Pages privées/formulaires
import ArtistForm from './private-pages/formArtist.tsx'
import LoginForm from './private-pages/loginAdmin.tsx'
import Dashboard from './private-pages/admin/dashboard.tsx'
import ArtistPage from './private-pages/admin/artists.tsx'
import ArtistEdit from './private-pages/admin/artistEdit.jsx'
import ArtistNew from './private-pages/admin/artistNew.tsx'

function App(){
  return(
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/program' element={<Program />} />
      <Route path='/program/music' element={<MusicProgram />} />
    <Route path='/participate' element={<Participate />} />
    <Route path='/faq' element={<Informations />} />
    <Route path='/souvenir' element={<Souvenirs />} />
    <Route path='/contact' element={<Contact />} />    
    <Route path='/legal' element={<Legal />} />
    <Route path='*' element={<NotFound />} />

{/* Pages privées */}
    <Route path='/artist-form' element={<ArtistForm />} />

    <Route path='/login' element={<LoginForm />} />
    <Route path='/admin/dashboard' element={<Dashboard/>} />
    <Route path='/admin/artists' element={<ArtistPage />} />
    <Route path='/admin/artist-edit/:id' element={<ArtistEdit />} />
    <Route path='/admin/artists/new' element={<ArtistNew />} />
    
    </Routes>
  )
}
export default App