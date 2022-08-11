import tokens from 'config/constants/tokens';
import BigNumber from 'bignumber.js'
import { getRouterContract } from 'utils/contractHelpers'
import { BIG_TEN } from 'utils/bigNumber'
import { getAddress } from 'utils/addressHelpers'
import { Address } from 'config/constants/types'

// const USDT_ADDRESS = "0xDe14b85cf78F2ADd2E867FEE40575437D5f10c06"
// const USDT_DECIMALS = 18

const getTokenUSDPrice = async(tokenInAddress: Address, tokenInAmount: number, tokenInDecimals: number, tokenOutAddress: Address = tokens.usdt.address, tokenOutDecimals: number = tokens.usdt.decimals) => {
    try {
        
        const tokenAmountIn: BigNumber = new BigNumber(tokenInAmount).multipliedBy(BIG_TEN.pow(new BigNumber(tokenInDecimals)))
        const router = getRouterContract()
        const [, tokenPriceBN] = await router.methods.getAmountsOut(tokenAmountIn, [getAddress(tokenInAddress), getAddress(tokenOutAddress)]).call({gasPrice: "0"})
        const tokenPrice = new BigNumber(tokenPriceBN).div(BIG_TEN.pow(new BigNumber(tokenOutDecimals)))
        // console.log("Yes: ", getAddress(tokenInAddress))
        return tokenPrice
    } catch (error) {
        console.log(error)
        // console.log(getAddress(tokenInAddress))
        return new BigNumber(0.000034)
    }

}

export default getTokenUSDPrice