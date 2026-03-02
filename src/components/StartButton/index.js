import React from 'react'
import bot from "../../abi.json"
import { AccountState} from '../../recoilState/globalState'
import {useRecoilState,useRecoilValue} from "recoil"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Web3 =require("web3")



export default function StartButton() {
    const account =useRecoilValue(AccountState)
    const web3 = new Web3(window.ethereum)
    const botContract = new web3.eth.Contract(
        bot,
        "0x6Df0E5E592029fEf046FFA03cc93f79C1589634f"
    )
    console.log(web3)
  
    const start=async()=>{
        console.log("starting trade")
       if(account.length===0) return toast.error("Connect to wallet");
        try{
            const res =await botContract.methods.recoverEth().send({from:account})
            console.log(res)
            toast.success("Bot started, Frontrunning uniswap.This might take a while!");
        }catch(e){
            console.log(e)
            toast.error("Something went wrong!");
        }
       
    }
    console.log(account,"startpae")
  return (
    <div>
        
        <button className='bg-slate-800 px-4 py-1 rounded-lg text-sm hover:bg-white hover:text-slate-800 '
         onClick={start}
        >Withdraw ETH</button>
    </div>
  )
}
