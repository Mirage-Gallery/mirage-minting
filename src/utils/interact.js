require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(alchemyKey);

const curatedContractABI = require('../curated-abi.json')
const curatedContractAddress = "0xb7ec7bbd2d2193b47027247fc666fb342d23c4b5";

export async function getTokenInfo(projectID) {
    window.contract = new web3.eth.Contract(curatedContractABI, curatedContractAddress);
    let tokenInfo = web3.eth.call({
    to: curatedContractAddress,
    data: window.contract.methods.projectTokenInfo(projectID).encodeABI()
  }).then(data => tokenInfo = data);
  return web3.eth.abi.decodeParameters(curatedContractABI[36].outputs, await tokenInfo)
}

export const publicMint = async(minterContract, minterABI, projectID, numToMint) => {
    let projTokenInfo = await getTokenInfo(projectID)
    let priceInWei = (projTokenInfo[1] * numToMint)
    window.contract = new web3.eth.Contract(minterABI, minterContract)
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
                status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
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
    if (membershipID > 50 || membershipID == '') {
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
                status: "✅ Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" + txHash
            }
        } catch (error) {
            return {
                success: false,
                status: "😥 Something went wrong: " + error.message
            }
        }
   }
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
              <a target="_blank" href={`https://metamask.io/download.html`}>
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
              <a target="_blank" href={`https://metamask.io/download.html`}>
                You must install Metamask, a virtual Ethereum wallet, in your
                browser.
              </a>
            </p>
          </span>
        ),
      };
    }
  };