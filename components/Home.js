// import { useMoralis, useNewMoralisObject, useMoralisQuery, useMoralisCloudFunction } from "react-moralis";
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Login from "../components/Login"
// import { Moralis } from "moralis";
// import { useWeb3React } from "@web3-react/core";
// import axios from "axios"
// const XLSX = require('xlsx')

// export default function Home() {

//   const {
//     connector,
//     library,
//     account,
//     chainId,
//     activate,
//     deactivate,
//     active,
//     errorWeb3Modal,
//     active: networkActive, error: networkError, activate: activateNetwork
//   } = useWeb3React();

//   const exportExcel = async () => {
//     try{
//       if(active){
//         const data = await axios.get("http://localhost:5000/api/admin/addr")
//         let address = data.data.message
//         let count = 0
//         let add = []
//         address.map((i) => {
//           // console.log("id", count)
//           // console.log("address", i.address)
//           count++
//           add.push({id:count,address:i.address})
//         })
//         let binaryWS = XLSX.utils.json_to_sheet(add);
//           var wb = XLSX.utils.book_new()
//           XLSX.utils.book_append_sheet(wb, binaryWS, 'Binary values')
//           XLSX.writeFile(wb, 'AllRaffleAddress.xlsx');
//       }
//       else{
//         return null
//       }
//     }
//     catch(e){
//       console.log("error", e)
//     }
    
//   }
  

//   return (
//     <div>
//       {active  ? (
//         <div>
//         {console.log("account", account)}
//           <h3>{account}</h3>
//            <button onClick={exportExcel} >Get Address</button>
        
//         </div>
//       ) : (
//         null
//       )}
//     </div>
//   );
// }