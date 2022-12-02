require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

export const curatedContractABI = require('../curated-abi.json')
export const curatedContractAddress = "0xb7ec7bbd2d2193b47027247fc666fb342d23c4b5";
export const dreamersABI = require('../dreamers-abi.json')
export const dreamersContract = "0xfd29cdc7868cacece537571bd0c879df55f2bc51";

export async function getTokenInfo(projectID) {
    window.contract = new web3.eth.Contract(curatedContractABI, curatedContractAddress);
    let tokenInfo = web3.eth.call({
    to: curatedContractAddress,
    data: window.contract.methods.projectTokenInfo(projectID).encodeABI()
  }).then(data => tokenInfo = data);
  return web3.eth.abi.decodeParameters(curatedContractABI[36].outputs, await tokenInfo)
}

export async function getProjectDetails(projectID) {
  window.contract = new web3.eth.Contract(curatedContractABI, curatedContractAddress);
  let projectDetails = web3.eth.call({
  to: curatedContractAddress,
  data: window.contract.methods.projectDetails(projectID).encodeABI()
}).then(data => projectDetails = data);
return web3.eth.abi.decodeParameters(curatedContractABI[37].outputs, await projectDetails)
}

export async function showProjectTokens(projectID) {
  window.contract = new web3.eth.Contract(curatedContractABI, curatedContractAddress);
  let projectTokens = web3.eth.call({
  to: curatedContractAddress,
  data: window.contract.methods.projectShowAllTokens(projectID).encodeABI()
}).then(data => projectTokens = data);
return web3.eth.abi.decodeParameters(curatedContractABI[51].outputs, await projectTokens)
}

export async function getNextProjectID() {
  window.contract = new web3.eth.Contract(curatedContractABI, curatedContractAddress);
  let nextProjectId = web3.eth.call({
  to: curatedContractAddress,
  data: window.contract.methods.nextProjectId().encodeABI()
}).then(data => nextProjectId = data);
return web3.eth.abi.decodeParameters(curatedContractABI[60].outputs, await nextProjectId)[0]
}

export const publicMint = async(minterContract, minterABI, projectID, numToMint) => {
    let projTokenInfo = await getTokenInfo(projectID)
    let priceInWei = (projTokenInfo[1] * numToMint)
    window.contract = new web3.eth.Contract(minterABI, minterContract)
    if (projTokenInfo[8]) {
      return { status: "😥 Not in public phase. Use presale minting option instead!" }
    }
    if (numToMint > 10) {
        return { status: "😥 Can't mint more than 10 at a time!" }
    } else {
        const transactionParameters = {
            to: minterContract,
            from: window.ethereum.selectedAddress,
            value: priceInWei.toString(16),
            data: window.contract.methods.purchase(projectID, numToMint).encodeABI()
        };

        try {
            const txHash = await window.ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });
            return {
                success: true,
                status: "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" + txHash
            }
        } catch (error) {
            return {
                success: false,
                status: "😥 Something went wrong: " + error.message
            }
        }
   }
}

export const earlyMint = async(minterContract, minterABI, projectID, membershipID, numToMint) => {
    let projTokenInfo = await getTokenInfo(projectID)
    let priceInWei = (projTokenInfo[1] * numToMint)
    window.contract = new web3.eth.Contract(minterABI, minterContract)
    if (!projTokenInfo[8]) {
      return { status: "😥 Not in presale phase. Use public minting option instead!" }
    }
    if (membershipID > 50 || membershipID === '') {
        return { status: "😥 Enter a valid membership ID (0-50)" }
    }
    if (numToMint > 3) {
        return { status: "😥 Can't mint more than 3 at a time during the presale!" }
    } else {
        const transactionParameters = {
            to: minterContract,
            from: window.ethereum.selectedAddress,
            value: priceInWei.toString(16),
            data: window.contract.methods.earlyPurchase(projectID, membershipID, numToMint).encodeABI()
        };

        try {
            const txHash = await window.ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });
            return {
                success: true,
                status: "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" + txHash
            }
        } catch (error) {
            return {
                success: false,
                status: "😥 Something went wrong: " + error.message
            }
        }
   }
}
const checkDreamersClaimed = async(membershipID) => {
  window.contract = new web3.eth.Contract(dreamersABI, dreamersContract)
  let dreamersClaimed = web3.eth.call({
  to: dreamersContract,
  data: window.contract.methods.sentientClaimed(membershipID).encodeABI()
  }).then(data => dreamersClaimed = data).catch((err) => {})
  if (typeof(await dreamersClaimed) == 'undefined') {
    return 0
  } else {
    return web3.eth.abi.decodeParameters(dreamersABI[47].outputs, await dreamersClaimed)[0]
    }
  }

const checkIfClaimed = async(projectID, membershipID) => {
  if (projectID == 1000) {
    let numClaimed = await checkDreamersClaimed(membershipID)
    if (numClaimed == 3) {
      return { success: true }
    } else {
      return { success: false }
    }
  } else {
    const _id = parseInt(projectID * 10000) + parseInt(membershipID)
      window.contract = new web3.eth.Contract(curatedContractABI, curatedContractAddress)
      let ownerOf = web3.eth.call({
        to: curatedContractAddress,
        data: window.contract.methods.ownerOf(_id).encodeABI()})
        .then(data => ownerOf = data).catch((err) => {})
      if (typeof(await ownerOf) == 'undefined') {
        return { success: false }
      } else {
        return { success: true }
      }
  }
}

export const claim = async(projectID, membershipID, numToMint) => {
  if ((await checkIfClaimed(projectID, membershipID)).success) {
    return { status: "😥 Already claimed" }
  }
  if (projectID == 1000) {
    window.contract = new web3.eth.Contract(dreamersABI, dreamersContract)
    const transactionParameters = {
      to: dreamersContract,
      from: window.ethereum.selectedAddress,
      data: window.contract.methods.claimSentient(membershipID, numToMint).encodeABI()
    };
    try {
        const txHash = await window.ethereum
            .request({
                method: 'eth_sendTransaction',
                params: [transactionParameters],
            });
        return {
            success: true,
            status: "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" + txHash
        }
    } catch (error) {
        return {
            success: false,
            status: "😥 Something went wrong: " + error.message
        }
    } 
  } else {
      if (numToMint > 1) {
        return {
          success: false,
          status: "Can only claim 1 curated artwork per project, per Sentient membership"
        }
      } else {
        window.contract = new web3.eth.Contract(curatedContractABI, curatedContractAddress)
        const transactionParameters = {
          to: curatedContractAddress,
          from: window.ethereum.selectedAddress,
          data: window.contract.methods.claimSentient(projectID, membershipID).encodeABI()
        };
        try {
            const txHash = await window.ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [transactionParameters],
                });
            return {
                success: true,
                status: "✅ Check out your transaction on Etherscan: https://etherscan.io/tx/" + txHash
            }
        } catch (error) {
            return {
                success: false,
                status: "😥 Something went wrong: " + error.message
            }
        } 
      }
  }
}

export const memberCheck = async(membershipID) => {
  document.getElementById('list').innerHTML = ''
  let projectID = parseInt(await getNextProjectID())
  for (let x = 1; x < projectID; x++) {
    let count = 0;
    let projectName = (await getProjectDetails(x))[0]
    let myval = await showProjectTokens(x)
    let tokenID_check = parseInt(membershipID) + (x * 10000)
  for (let i = 0; i < myval[0].length; i++) {
      if ((tokenID_check) == myval[0][i]) {
          document.getElementById('list').innerHTML += projectName + ' ' + membershipID + ' has already been claimed <br>';
          count = 1;
      }
    }
    if (count == 0) {
        document.getElementById('list').innerHTML += projectName + ' ' + membershipID + ' has NOT been claimed <br>';
    }
  }
  let dreamersClaimed = await checkDreamersClaimed(membershipID);
  document.getElementById('list').innerHTML += dreamersClaimed + '/3 Dreamers have been claimed <br>';
}

export const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const obj = {
          status: "",
          address: addressArray[0],
        };
        return obj;
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };

  export const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const addressArray = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (addressArray.length > 0) {
          return {
            address: addressArray[0],
            status: "",
          };
        } else {
          return {
            address: "",
            status: "🦊 Connect to Metamask using the top right button.",
          };
        }
      } catch (err) {
        return {
          address: "",
          status: "😥 " + err.message,
        };
      }
    } else {
      return {
        address: "",
        status: (
          <span>
            <p>
              {" "}
              🦊{" "}
              <a target="_blank" rel="noreferrer" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };