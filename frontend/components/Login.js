// import styles from "../styles/Login.module.css";
// import { useMoralis } from "react-moralis";
// function Login() {
//   const { authenticate, authError} = useMoralis();
//   return (
//     <div className={styles.login_container}>
//       <div className={styles.login_card}>
//         <div className={styles.sign_in_container}>
//           {authError && (
//             <p className={styles.error}>
//               {authError.name}
//               {authError.message}
//             </p>
//           )}
//           <button
//             onClick={authenticate}
//           >
//             Login with Moralis
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;