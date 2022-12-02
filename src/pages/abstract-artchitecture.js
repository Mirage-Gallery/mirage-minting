import React from "react";
import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, publicMint, earlyMint, getTokenInfo } from "../utils/interact.js";

const AbstractArtchitecture = () => {

  let overallID = 11

  const minterAddress = "0xE4C2BF5E734A23e426022bb0b785804C87684A3d"

  const [walletAddress, setWallet] = useState("")
  const [status, setStatus] = useState("")
  const [remaining, setRemaining] = useState("")

  function addWalletListener() {
    if (window.ethereum) {
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
    setStatus(status);

    addWalletListener(); 
}, [])

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  }

  const onPublicMintPressed = async () => {
    let numToMint = document.getElementById('quantityPublic').value
    if (numToMint === '') {
      numToMint = 1
    }
    const minterABI = require('../minter-abi.json')
    const { status } = await publicMint(minterAddress, minterABI, overallID, numToMint)
    setStatus(status)
  }

  const onEarlyMintPressed = async () => {
    let numToMint = document.getElementById('quantityEarly').value
    let membershipID = document.getElementById('membership').value
    if (numToMint == '') {
      numToMint = 1
    }
    const minterABI = require('../minter-abi.json')
    const { status } = await earlyMint(minterAddress, minterABI, overallID, membershipID, numToMint)
    setStatus(status)
  }

  const showRemaining = async () => {
    const projTokenInfo = await getTokenInfo(overallID)
    let remaining = 'Minting is either closed, or has not opened yet!'
    if (projTokenInfo[8]) {
      let remPre = projTokenInfo[4] - (projTokenInfo[2]-50)
      if (remPre == 0) {
        remaining = 'Presale is sold out!'
      } else {
        remaining = remPre + '/' + projTokenInfo[4] + ' remaining (for presale)'
      }
    } else if (parseInt(projTokenInfo[2]) == parseInt(projTokenInfo[3])) {
      remaining = 'Sold out!'
    } else if (projTokenInfo[7]) {
      const remPub = projTokenInfo[3] - projTokenInfo[2];
      remaining = remPub + '/' + projTokenInfo[3] + ' remaining'
    }
    setRemaining(remaining)
  }

  return (
    <div className="Minter">
      <button id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          "Connected: " +
          String(walletAddress).substring(0, 6) +
          "..." +
          String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <br></br>
          <button id = "reload" onClick={showRemaining} className = 'btn walletButton'>Refresh</button><br></br><br></br><br></br>
          <input id='membership' type='text' placeholder='Membership ID (0-50)' style={{width: '175px'}}/> &nbsp;&nbsp;&nbsp;
          <input id='quantityEarly' type='text' placeholder='Quantity (1-3)' style={{width: '125px'}}/>&nbsp;&nbsp;&nbsp;
          <button id = "mintEarly" onClick={onEarlyMintPressed} className = 'btn walletButton'>Mint Presale</button><br></br><br></br><br></br>
          <br></br>
          <input id='quantityPublic' type='text' placeholder='Quantity (1-10)' style={{width: '125px'}}/>&nbsp;&nbsp;&nbsp;
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

export default AbstractArtchitecture;