import React from 'react'
import btcImg from "../../assests/btc.jpg" 
import ConnectButton from '../../components/ConnectButton'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import DepositButton from '../../components/DepositBtn'
export default function Home() {
  return (
    <div className='text-white pt-28 lg:pt-32 px-8 lg:px-20 '>

      <div className=' block lg:flex '>
         <main className='flex flex-col w-full lg:w-1/2 space-y-6'>
          <div className='flex justify-center'>
            <h5 className='text-3xl lg:text-7xl  font-light lg:font-light'> Mev Bot</h5> 
          </div>
            <p className='hidden lg:block px-6'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  <br></br> tempor incididunt ut labore et dolore magna aliqua</p>

           
              <ConnectButton />
            
            
         </main>
         <main className='w-1/2 hidden lg:flex justify-center '>
            <img src={btcImg} className="rounded-full w-96 h-96" alt=''/>
         </main>
      </div>
      <main>
        <Outlet />
      </main>
      
    </div>
  )
}
