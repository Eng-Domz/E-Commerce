import NavBar from './NavBar'
import Footer from './Footer'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div>
        <NavBar/>
        <div className='mt-20'>
        <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}
