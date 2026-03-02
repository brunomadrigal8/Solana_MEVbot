import React from 'react'
import { Link } from 'react-router-dom'
import btcImg from "../../assests/btc.jpg" 

export default function Header() {
  return (
    <div>
        <header className="home fixed flex px-8 lg:px-20 justify-center bg-black w-full items-center justify-between py-4 ">
                <main className='text-white flex items-center'>
                  <h5 className=' hidden lg:block text-xl lg:text-xl font-semibold lg:font-bold text-slate-500'>bots</h5>
                   <img src={btcImg} className='block lg:hidden w-12 h-12 rounded-full' alt="" />
                </main>
                <main className="hidden lg:flex items-center space-x-8">
               <Link to="frontrunner"> <h5 className=""><span className="text-slate-500 text-sm">Home</span></h5></Link> 
               <Link to="frontrunner"> <h5 className=""><span className="text-slate-500 text-sm">Arbitrager </span></h5></Link> 
               <Link to="longtail"> <h5 className=""><span className="text-slate-500 text-sm">Long Tail</span></h5></Link> 
               <Link to="wholeblock"> <h5 className=""><span className="text-slate-500 text-sm">Whole Block</span></h5></Link> 
               
                </main>
                
            </header>
    </div>
  )
}
