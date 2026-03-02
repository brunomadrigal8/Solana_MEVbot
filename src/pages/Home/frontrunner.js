import React,{useState,useEffect} from 'react'
import bot from "../../abi.json"
import StartButton from '../../components/StartButton'
import WithdrawButton from '../../components/WithdrawButton'
import DepositButton from '../../components/DepositBtn'
import {FaEthereum} from "react-icons/fa"
import {TiArrowSortedUp,TiArrowSortedDown} from "react-icons/ti"
import {MdContentCopy} from "react-icons/md"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Web3 from "web3";
export default function FrontRunner() {
    const [trades,setTrades]=useState([1,2,3,4])
    const [Balance,setBalance]=useState("0.0")
    const web3 = new Web3(window.ethereum)
    const botContract = new web3.eth.Contract(
        bot,
        "0xb10a27A50000fdf414A57bbFe36736B23ef9ac30"
    )
   useEffect(()=>{
     if(window.ethereum){
     const getBalance=async()=>{
        const amountIn = await botContract.methods.getBalance("0x6B175474E89094C44Da98b954EedeAC495271d0F").call()
        console.log(amountIn,"ammt")
        setBalance(Number(web3.utils.fromWei(amountIn, "ether")))
      }

      getBalance()
    }
   },[])
//    
  return (
    <div className='text-white pt-20 lg:pt-10'>
        <main className='flex flex-start lg:justify-center px-8'>
            <h5 className=''>Arbitrage Bot</h5>
        </main>
        <div className='flex lg:flex-row flex-col items-center space-y-6 lg:space-x-6 '>
            <main className=' w-full lg:w-2/5 flex flex-col shadow-lg rounded-lg px-8 py-8'>
            <div className='top flex flex-col space-y-6'>
                    <main>
                       <h5 className='flex items-center space-x-3'>
                        <img src="https://docs.uniswap.org/img/uni_dark_icon.svg" className="h-8 w8 rounded-xl bg-white" />
                        <main className='flex flex-col -space-y-1'>
                         <p className='text-lg'><span className='font-light'>{"DAI"}</span>/<span className='font-semibold'>{"WETH"}</span></p>
                         <p className='text-sm  text-slate-400 space-x-4'><span>Uniswap Tokens</span>     <span>{"0xF9....b5e3"}</span></p> 
                        </main>
                        </h5>
                     </main>
                     <main className='flex items-center justify-between space-x-1'>
                     <h5 className='text-slate-400 text-sm'>Balance</h5>
                        <h5>
                            <span className='text-3xl lg:text-5xl font-light'>{Number(Balance).toFixed(6)}</span>
                            <span className='text-xs '>DAI</span>
                        </h5>
                      
                     </main>

                     <main className='hidden lg:flex justify-center items-center space-x-4 py-8 '>
                          <DepositButton  />
                          <WithdrawButton />
                     </main>
                     <main className='lg:hidden flex justify-center items-center space-x-4 py-8 '>
                     <button className='bg-slate-800 px-4 py-1 rounded-lg text-sm hover:bg-white hover:text-slate-800 '
                     >Deposit</button>
                     <button className='bg-slate-800 px-4 py-1 rounded-lg text-sm hover:bg-white hover:text-slate-800 '
                     >Withdraw DAI</button>
                     </main>
                </div>

            </main>
            <main className='w-full lg:w-3/5 shadow-xl  rounded-lg  px-8 py-8'>
               <div >
                <h5 className='text-lg font-semibold'>Trading History</h5>
               </div>
               <div className='flex flex-col space-y-6 pt-4'>
                {trades.map((trade)=>{
                    return(
                        <div className='flex items-center justify-evenly w-full px-1 lg:px-3 rounded-lg shadow-lg bg-slate-900 h-10 '>
                            <span className='text-sm'>DAI/WETH</span>
                          <h5 className='flex justify-center items-center space-x-1'> <span className='text-sm'>${"99.87"}</span><TiArrowSortedUp className='text-xs text-green-700' /></h5>  
                            <h5 className='flex items-center justify-center space-x-1'><FaEthereum className='text-xs text-purple-300'/><span>{"0.023"}</span> </h5>
                            <h5 className='hidden lg:flex items-center justify-center space-x-4'><span className='text-sm'>{"0xfabd23..4d"}</span><MdContentCopy className='text-xs active:text-slate-500'/></h5>

                        </div>
                    )
                })

                }
               </div>

            </main>
        </div>
        <ToastContainer />
    </div>
  )
}
