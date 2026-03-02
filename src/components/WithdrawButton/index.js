import React from 'react'
import bot from "../../abi.json"
import { AccountState} from '../../recoilState/globalState'
import {useRecoilState,useRecoilValue} from "recoil"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Web3 =require("web3")




  

export default function WithdrawButton() {
    const account =useRecoilValue(AccountState)
    const web3 = new Web3(window.ethereum)
    const botContract = new web3.eth.Contract(
        bot,
        "0xb10a27A50000fdf414A57bbFe36736B23ef9ac30"
    )
    console.log(web3)
  
    const withDraw=async()=>{
        console.log("Withdrawingg Funds")
        if(account.length===0) return toast.error("Connect to wallet");
        try{
            const res =await botContract.methods.recoverTokens("0x6B175474E89094C44Da98b954EedeAC495271d0F").send({from:account})
            console.log(res)
            toast.success("Funds withdrawn sucessfully");
        }catch(e){
            console.log(e)
            toast.error("Something went wrong!");
        }
       
    }
    console.log(account,"startpae")
  return (
    <div>
        <button className='bg-slate-800 px-4 py-1 rounded-lg text-sm hover:bg-white hover:text-slate-800 '
          onClick={withDraw}
        >Withdraw DAI</button>
    </div>
  )
}
