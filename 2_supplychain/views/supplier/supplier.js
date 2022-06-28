const detectEthereumProvider =  require('@metamask/detect-provider');
//const web3= require('web3')
// if (window.ethereum) {
// //   try {
// //     const accounts =  await window.ethereum.request({ method: 'eth_requestAccounts' });
// //     setAccounts(accounts);
// //   } catch (error) {
// //     if (error.code === 4001) {
// //       // User rejected request
// //     }

// //     setError(error);
// //   }
// }
const a = async ()=>{
    const c = await Web3.eth.requestAccounts();
}
a();




