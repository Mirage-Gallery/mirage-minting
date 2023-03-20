import React from "react";
import { useEffect, useState } from "react";
import { connectWallet, minterContractAddress, minterContractABI, getCurrentWalletConnected, publicMint, earlyIntelligentMint, earlySentientMint, earlyCuratedHolderMint, getTokenInfo, hasSecondPhaseStarted} from "../utils/interact.js";
import DelegateCashButton from 'delegatecash-button-react';

export const alchemyUrl = process.env.REACT_APP_ALCHEMY_URL;

export let selectedWallet
function setSelectedWallet(wallet) {
    selectedWallet = wallet
  }

const CuratedMinting = () => {

  let overallID
  const minterAddress = minterContractAddress
  const minterABI = minterContractABI

  const [walletAddress, setWallet] = useState("")
  const [status, setStatus] = useState("")
  const [remaining, setRemaining] = useState("")

  const showRemaining = async () => {
    overallID = document.getElementById('project').value
    let presalePhase = "1"
    if ((await hasSecondPhaseStarted(overallID))[0]) {
      presalePhase = "2"
    }
    if (overallID == 0) {
      setRemaining('')
      return
    }
    const projTokenInfo = await getTokenInfo(overallID)
    let remaining = 'Minting is either closed, or has not opened yet!'
    if (projTokenInfo[8]) {
      let remPre = projTokenInfo[4] - (projTokenInfo[2]-50)
      if (remPre == 0) {
        remaining = 'Presale is sold out!'
      } else {
        remaining = remPre + '/' + projTokenInfo[4] + ' remaining (for presale). Presale phase: ' + presalePhase
      }
    } else if (parseInt(projTokenInfo[2]) == parseInt(projTokenInfo[3])) {
      remaining = 'Sold out!'
    } else if (projTokenInfo[7]) {
      const remPub = projTokenInfo[3] - projTokenInfo[2];
      remaining = remPub + '/' + projTokenInfo[3] + ' remaining'
    }
    setRemaining(remaining)
  }

  let selection = document.querySelector('select');
  if (selection) {
    selection.addEventListener('change',() => {
      showRemaining()
      setStatus()
    });
  }

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  }

  function addWalletListener() {
    if (window.ethereum) {
      overallID = document.getElementById('project').value
      showRemaining(overallID)
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  }
  
  useEffect(async () => {
    const {address, status} = await getCurrentWalletConnected();
    setWallet(address)
    setSelectedWallet(address)
    setStatus(status)
    addWalletListener()
}, [])

  const onPublicMintPressed = async () => {
    overallID = document.getElementById('project').value
    if (overallID == 0) {
      setStatus("Select an artist from the dropdown menu above")
      return
    }
    let numToMint = document.getElementById('quantityPublic').value
    if (numToMint == '') {
      numToMint = 1
    }
    const { status } = await publicMint(minterAddress, minterABI, overallID, numToMint)
    setStatus(status)
  }

  const onEarlyMintPressed = async () => {
    overallID = document.getElementById('project').value
    if (overallID == 0) {
      setStatus("Select an artist from the dropdown menu above")
      return
    }
    let numToMint = 1
    let membershipID = document.getElementById('membership').value
    if (numToMint == '') {
      numToMint = 1
    }
    if (membershipID == '' && !(await hasSecondPhaseStarted(overallID))[0]) {
      setStatus("Phase 2 hasn't started! Please enter membership ID")
    } else if (membershipID == '' && (await hasSecondPhaseStarted(overallID))[0]) {
      const { status } = await earlyCuratedHolderMint(minterAddress, minterABI, overallID, numToMint, selectedWallet)
      setStatus(status)
    } else {
      if (membershipID < 50) {
        const { status } = await earlySentientMint(minterAddress, minterABI, overallID, membershipID, numToMint, selectedWallet)
        setStatus(status)
      } else {
        const { status } = await earlyIntelligentMint(minterAddress, minterABI, overallID, membershipID, numToMint, selectedWallet)
        setStatus(status)
      }
    }
  }

  return (
    <div className="Minter">
     <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <DelegateCashButton
        connectedWallet={walletAddress}
        rpcUrl={alchemyUrl}
        rounded={true}
        theme="dark"
        onButtonClick={() => connectWalletPressed()}
        onWalletSelect={event => setSelectedWallet(event.detail)}
      />
    </div>
      <br></br>
          <button id = "reload" onClick={showRemaining} className = 'btn walletButton'>Refresh</button><br></br><br></br><br></br>
          <select name="project" id="project">
            <option value="0">Select Artist</option>
            <option value="11">MrHabMo (Esquisse)</option>
          </select>
          <br></br><br></br><br></br>
          <p>Leave membership field blank for eligible curated holders during second presale phase.</p>
          <input id='membership' type='text' placeholder='Membership ID (0-50)' style={{width: '175px'}}/> &nbsp;&nbsp;&nbsp;
          <button id = "mintEarly" onClick={onEarlyMintPressed} className = 'btn walletButton'>Mint Presale</button><br></br><br></br><br></br>
          <br></br>
          <input id='quantityPublic' type='text' placeholder='Quantity' style={{width: '75px'}}/>&nbsp;&nbsp;&nbsp;
          <button id = "mintPublic" onClick={onPublicMintPressed} className = 'btn walletButton'>Mint Public Sale</button><br></br>
      <p id="remaining">
        {remaining}
      </p>
      <p id="status">
        {status}
      </p>
    </div>
  );
};

export default CuratedMinting;