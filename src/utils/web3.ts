import Web3 from 'web3'
import { HttpProviderOptions } from 'web3-core-helpers'
import { ARCHIVED_NODE } from 'config/constants/endpoints'
import getRpcUrl from 'utils/getRpcUrl'

const RPC_URL = getRpcUrl()
const httpProvider = new Web3.providers.HttpProvider(RPC_URL, { timeout: 10000 } as HttpProviderOptions)
// wss://nc-ws-node.brisescan.com:443
// new Web3.providers.WebsocketProvider('ws://remotenode.com:8546'));
// const httpProvider = new Web3.providers.WebsocketProvider('wss://nc-ws-node.brisescan.com:443')
const web3NoAccount = new Web3(httpProvider)

const getWeb3NoAccount = () => {
  return web3NoAccount
}

const getWeb3WithArchivedNodeProvider = () => {
  const archivedHttpProvider = new Web3.providers.HttpProvider(ARCHIVED_NODE, { timeout: 10000 } as HttpProviderOptions)
  // const archivedHttpProvider = new Web3.providers.WebsocketProvider('wss://nc-ws-node.brisescan.com:443')
  return new Web3(archivedHttpProvider)
}

export { getWeb3NoAccount, getWeb3WithArchivedNodeProvider }
export default web3NoAccount
