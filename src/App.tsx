import {Routes, Route} from 'react-router-dom'
import Home from './publics-pages/Home.tsx'
import Legal from './publics-pages/legal.tsx'
/* import NotFound from './pages/NotFound.tsx' */

import ArtistForm from './private-pages/formArtist.tsx'
import LoginForm from './private-pages/loginAdmin.tsx'
import Dashboard from './private-pages/admin/dashboard.tsx'
import ArtistPage from './private-pages/admin/artists.tsx'


function App(){
  return(
    <Routes>
    <Route path='/' element={<Home />} />
{/*     <Route path='*' element={<NotFound />} /> */}
    <Route path='/legal' element={<Legal />} />

{/* Pages privées */}
    <Route path='/artist-form' element={<ArtistForm />} />

    <Route path='/login' element={<LoginForm />} />
    <Route path='/admin/dashboard' element={<Dashboard/>} />
    <Route path='/admin/artists' element={<ArtistPage />} />
    
    </Routes>
  )
}
export default App