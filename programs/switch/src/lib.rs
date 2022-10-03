use anchor_lang::prelude::*;

// CHANGE AFTER DEPLOYMENT
declare_id!("F74TQB1kWr1dyVLcyuSnx58w7rToynLTULX4V1wuyUoU");

#[program]
pub mod switch {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // get reference of account that holds the state of the switch 
        let switchAccount = &mut ctx.accounts.switchAccount;
        switchAccount.state = true;
        Ok(())
    }

    pub fn flip(ctx: Context<Flip>) -> Result<()> {
        let switchAccount = &mut ctx.accounts.switchAccount;
        if switchAccount.state {
            switchAccount.state = false;
        } else {
            switchAccount.state = true;
        }
        Ok(())
    }
}

// scaffold to turn into account
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = user, space = 16 + 16)]
    pub switchAccount: Account<'info, SwitchAccount>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>
}
#[derive(Accounts)]
pub struct Flip<'info> {
    #[account(mut)]
    pub switchAccount: Account<'info, SwitchAccount>,
}
#[account]
pub struct SwitchAccount {
    pub state: bool,
}
