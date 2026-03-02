import {atom} from "recoil"

export const AccountState = atom({
    key: 'AccountState',
    default: "",
  });



export const InstanceState =atom({
  key:"instance",
  default:{}
})
