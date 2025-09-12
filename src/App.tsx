import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home.tsx'
/* import NotFound from './pages/NotFound.tsx' */

import ArtistForm from './pages/formArtist.tsx'


function App(){
  return(
    <Routes>
    <Route path='/' element={<Home />} />
{/*     <Route path='*' element={<NotFound />} /> */}

    <Route path='/artist-form' element={<ArtistForm />} />
    </Routes>
  )
}
export default App