import React from 'react'
import "./modal.css"
export default function Modal({children ,cname,trigger,onClose}) {
  return (
    <div>
          { trigger?
            <div className="overlay-style">
                <div className={`modal-upload ${cname}`}>
                   {children}
                </div> 
                
            </div>
         : <div></div>
            
            }

    </div>
  )
}