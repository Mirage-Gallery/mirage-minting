import React from "react";
import { useEffect, useState } from "react";
import { connectWallet, getCurrentWalletConnected, claim, memberCheck} from "../utils/interact.js";

const SentientClaim = () => {

  let selection = document.querySelector('select');
  if (selection) {
    selection.addEventListener('change',() => {
      setStatus()
    });
  }
  let overallID

  const [walletAddress, setWallet] = useState("")
  const [status, setStatus] = useState("")
  const [status2, setStatus2] = useState("")

  function addWalletListener() {
    if (window.ethereum) {
      overallID = document.getElementById('project').value
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

  const onCheckPressed = async () => {
    let membershipID = document.getElementById('membershipCheck').value
    if (membershipID > 49 || membershipID == '') {
      setStatus2('Please enter a valid Sentient membershipID (0-49)')
      return
    } else {
      setStatus2('')
    }
    await memberCheck(membershipID)
  }

  const onClaimPressed = async () => {
    overallID = document.getElementById('project').value
    if (overallID == 0) {
      setStatus("Select an artist from the dropdown menu above")
      return
    }
    let numToMint = document.getElementById('quantity').value
    let membershipID = document.getElementById('membership').value
    let projectID = document.getElementById('project').value
    if (membershipID > 49) {
      setStatus('Please enter a valid Sentient membershipID (0-49)')
      return
    }
    if (numToMint == '') {
      numToMint = 1
    }
    const { status } = await claim(projectID, membershipID, numToMint)
    setStatus(status)
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
      </button><br></br><br></br><br></br><br></br>
      <br></br><input id='membershipCheck' type='text' placeholder='Membership ID (0-49)' style={{width: '175px'}}/>&nbsp;&nbsp;&nbsp;
          <button id = "check" onClick={onCheckPressed} className = 'btn walletButton'>Check</button><br></br>
      <p id="status2">
        {status2}
      </p>
      <p id="list"></p><br></br><br></br><br></br><br></br>
          <select name="project" id="project">
            <option value="0">Select Project</option>
            <option value="1">SOMNAI (Otherwhere)</option>
            <option value="2">Roope Rainisto (ANIMA)</option>
            <option value="3">Austiin (Remnants)</option>
            <option value="4">Revrart (Voyage)</option>
            <option value="5">Saucebook (Embracing Chaos)</option>
            <option value="6">Rikkar (Yūgen)</option>
            <option value="7">Huemin (Seek)</option>
            <option value="8">Inner_Sanctum & Pancakes (MOODs)</option>
            <option value="9">H01 & DeltaSauce (Nexus)</option>
            <option value="10">Claire Silver (Page)</option>
            <option value="11">MrHabMo (Esquisse)</option>
            <option value="12">KaptN (Noah's Ark)</option>
            <option value="13">Ren AI (Memory)</option>
            <option value="14">Thomas Intuitive Art (The World Outside)</option>
            <option value="15">Maneki Neko (Oneiroscapes)</option>
            <option value="1000">Dreamers</option>
          </select><br></br>
          <br></br><br></br><br></br>
          <input id='membership' type='text' placeholder='Membership ID (0-49)' style={{width: '175px'}}/> &nbsp;&nbsp;&nbsp;
          <input id='quantity' type='text' placeholder='1' style={{width: '25px'}}/>&nbsp;&nbsp;&nbsp;
          <button id = "claim" onClick={onClaimPressed} className = 'btn walletButton'>Claim</button><br></br><br></br>
          <p id="status">
            {status}
          </p>
          <br></br>
          <br></br>
          
      
    </div>
  );
};

export default SentientClaim;