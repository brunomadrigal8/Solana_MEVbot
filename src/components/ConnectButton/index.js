import React,{useState,useCallback,useEffect } from 'react'
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider"
import {useRecoilState} from "recoil"
import detectEthereumProvider from "@metamask/detect-provider"
import { AccountState,InstanceState } from '../../recoilState/globalState';
export default function ConnectButton() {
    const infura_Id =process.env.REACT_APP_INFURA_ID
    console.log(infura_Id)
    const [account,setAccount]=useRecoilState( AccountState)
    const [currentAccount, setCurrentAccount] = useState("")
    
   
   const web3loader = useCallback(
      async() => {
  
       const webProvider = await detectEthereumProvider();
  
      // console.log(webProvider)
          if(webProvider){
            const chainId = await window.ethereum?.request({ method: 'eth_chainId' });
         console.log(chainId)
       
  
      const accounts = await window.ethereum?.request({ method: 'eth_accounts' })
          handleAccountsChanged(accounts)
        }
    }
    , [])
    useEffect(()=>{
        window.addEventListener('load', web3loader)
        window.ethereum?.on('accountsChanged', handleAccountsChanged);
    
        return () => {
          web3loader()
        }
        },[web3loader])

    function handleAccountsChanged(accounts) {
            //window.location.reload();
           }
    const connectWallet =async()=>{
        try{
    
            const accounts = await window.ethereum?.request({method: 'eth_requestAccounts'  })
              // console.log(accounts[0])
              setAccount(accounts[0])
            
            }catch(error){
              if(error.code === 4001) {
                 // EIP-1193 userRejectedRequest error
                 // If this happens, the user rejected the connection request.
                //  console.log('metamask did not connect');
               } else {
                 console.error(error);
              }
          }
      }

  return (
    <div className='flex justify-center'>
         { account.length===0 &&(
        <button className='border active:bg-black  hover:bg-white hover:text-slate-700 border-slate-700 text-white text-center px-4 w-3/4 lg:w-1/2 py-1 rounded-md '
         onClick={connectWallet }
        >Connect Wallet</button>
         )}
          { account.length>1 &&(
        <button className='border border-slate-700 text-slate-700 text-center px-4 w-3/4 lg:w-1/2 py-1  rounded-md 
  
        '>{account.slice(0,9)+"..."}</button>
         )}
   </div>
  )
}
