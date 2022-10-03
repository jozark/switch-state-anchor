import "./App.css"
import { useState } from "react"
import { Connection, PublicKey, Keypair } from "@solana/web3.js"
import { Program, Provider, web3 } from "@project-serum/anchor"
import idl from "./idl.json"
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets"
import {
  useWallet,
  WalletProvider,
  ConnectionProvider,
} from "@solana/wallet-adapter-react"
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui"
require("@solana/wallet-adapter-react-ui/styles.css")

const wallets = [
  // instantiate other wallet adapters if needed
  new PhantomWalletAdapter(),
]
const { Keypair, SystemProgram } = web3
const switchAccount = Keypair.generate()
const programId = new PublicKey(idl.metadata.address) // because it is a keypair
const opts = {
  preflightCommitment: "Processed", // wait for a processed confirmation
}

function App() {
  const [value, setValue] = useState(null)
  const wallet = useWallet()
  async function getProvider() {
    // collect all necessary information about the user
    const network = "http://127.0.0.1:8899"
    const connection = new Connection(network, opts.preflightCommitment)
    const provider = new Provider(connection, wallet, opts.preflightCommitment)
    return provider
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
