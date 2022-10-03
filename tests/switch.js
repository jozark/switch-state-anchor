const anchor = require("@project-serum/anchor")
const assert = require("assert")
const { isGeneratorFunction } = require("util/types")
const { SystemProgram } = anchor.web3

describe("switch", async () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const program = anchor.workspace.Switch

  it("should create a switch account", async () => {
    const switchAccount = anchor.web3.Keypair.generate()
    await program.methods
      .initialize()
      .accounts({
        switchAccount: switchAccount.publicKey,
        user: provider.wallet.publicKey, // takes the wallet from phantom eg
        system_program: SystemProgram.programId,
      })
      .signers([switchAccount])
      .rpc()

    // test by checking
    const baseAccount = await program.account.switchAccount.fetch(
      switchAccount.publicKey
    )
    assert.ok(baseAccount.state)
    _baseAccount = switchAccount // pass down the reference to check the state
  })

  it("should switch the state", async () => {
    baseAccount = _baseAccount
    await program.methods
      .flip()
      .accounts({
        switchAccount: baseAccount.publicKey,
      })
      .rpc()
  })
  const account = await program.account.switchAccount.fetch(
    baseAccount.publicKey
  )
  assert.ok(baseAccount.state == false)
})
