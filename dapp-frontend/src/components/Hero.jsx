import React, { useState } from 'react'
import { ethers } from 'ethers'

const Hero = () => {
  const [value, setValue] = useState('')
  const [stored, setStored] = useState(null)
  const [account, setAccount] = useState('')

  const ABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "set",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "get",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]

  const CONTRACT_ADDRESS = '0xTuNuevaDireccion'

  const connectWallet = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      setAccount(accounts[0])
    } else {
      alert("Instala MetaMask para continuar")
    }
  }

  const saveValue = async () => {
    if (!window.ethereum || !value) return
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
    const tx = await contract.set(value)
    await tx.wait()
    setValue('')
    getStoredValue()
  }

  const getStoredValue = async () => {
    if (!window.ethereum) return
    const provider = new ethers.BrowserProvider(window.ethereum)
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)
    const result = await contract.get()
    setStored(result.toString())
  }

  return (
    <div className="container">
      <h1>DApp Interactiva</h1>

      <button className="connect-btn" onClick={connectWallet}>
        {account ? `✅ ${account.slice(0, 6)}...` : '🔌 Conectar Wallet'}
      </button>

      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="Introduce un número"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <div>
        <button className="save-btn" onClick={saveValue}>💾 Guardar</button>
        <button className="get-btn" onClick={getStoredValue}>🔍 Consultar</button>
      </div>

      {stored && <p style={{ marginTop: '15px' }}>📦 Valor almacenado: <strong>{stored}</strong></p>}
    </div>
  )
}

export default Hero