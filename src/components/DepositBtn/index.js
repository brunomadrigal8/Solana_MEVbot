import React,{useState} from 'react'
import IERC20 from "../../IERC20ABI.json"
import { AccountState} from '../../recoilState/globalState'
import {useRecoilState,useRecoilValue} from "recoil"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '../Modal';
import {AiOutlineCloseCircle } from "react-icons/ai"
const Web3 =require("web3")



export default function DepositButton() {
    const account =useRecoilValue(AccountState)
    const web3 = new Web3(window.ethereum)
    const [trigger,setTrigger] =useState(false)
    const [deposit,setDeposit] =useState("")
    const TokenContract = new web3.eth.Contract(
        IERC20,
        "0x6B175474E89094C44Da98b954EedeAC495271d0F"
    )
    console.log(web3)
  
    const Deposit=async()=>{
        console.log("starting trade")

       if(account.length===0) return toast.error("Connect to wallet");
       const _amount=web3.utils.toWei(deposit,'ether')
        try{
            const res =await TokenContract.methods.transfer("0xb10a27A50000fdf414A57bbFe36736B23ef9ac30",_amount).send({from:account})
            console.log(res)
            toast.success("Transfer successful!");
        }catch(e){
            console.log(e)
            toast.error("Something went wrong!");
        }

        setTrigger(false)
       
      }
    console.log(account,"startpae")
  return (
    <>
    <div>
        
        <button className='bg-slate-800 px-4 py-1 rounded-lg text-sm hover:bg-white hover:text-slate-800 '
         onClick={()=>setTrigger(true)}
        >Deposit</button>
    </div>

    <Modal trigger={trigger} cname="h-44 w-1/4 shadow rounded-lg py-4 px-4 flex flex-col ">
             <main className='flex justify-end'>
                 <button onClick={()=>setTrigger(false)}><AiOutlineCloseCircle className="text-md" /></button>
                </main>
            <div  className='flex flex-col items-center justify-center space-y-8'>
                    <input className='w-1/2 bg-black border border-slate-900 text-white rounded-md h-8 px-2 text-xs'
                    placeholder='Amount'
                    onChange={(e)=>setDeposit(e.target.value)}
                />
                <button className='border border-slate-700 w-1/2 px-4 py-1 rounded-lg text-sm hover:bg-white hover:text-slate-800 '
                onClick={ Deposit}
                >Continue</button>
            </div>
          
 
     </Modal>

    </>
  )
}
