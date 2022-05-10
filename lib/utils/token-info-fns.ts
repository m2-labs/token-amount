import {
  StaticTokenListResolutionStrategy,
  TokenInfo,
  TokenListContainer
} from "@solana/spl-token-registry"
import { PublicKeyLike } from "./public-key"

/**
 * Token List from @solana/spl-token-registry
 */
const tokens = new TokenListContainer(
  new StaticTokenListResolutionStrategy().resolve()
)
const tokenList = tokens.filterByClusterSlug("mainnet-beta").getList()

/**
 *
 */
export type TokenInfoLike = TokenInfo | string

/**
 *
 * @param symbol
 * @returns
 */
export const findTokenBySymbol = (symbol?: string): TokenInfo | undefined => {
  if (!symbol) {
    return
  }

  return tokenList.find((token) => token.symbol === symbol)
}

/**
 *
 * @param mint
 * @returns
 */
export const findTokenByMint = (
  mint?: PublicKeyLike
): TokenInfo | undefined => {
  if (!mint) {
    return
  }

  return tokenList.find((token) => token.address === mint.toString())
}

/**
 *
 * @param symbolOrMint
 * @returns
 */
export const findToken = (
  symbolOrMint?: PublicKeyLike | string
): TokenInfo | undefined => {
  if (!symbolOrMint) {
    return
  }

  return tokenList.find(
    (token) =>
      token.address === symbolOrMint.toString() ||
      token.symbol === symbolOrMint.toString()
  )
}

/**
 *
 * @param tokenInfo
 * @returns
 */
export const buildTokenInfo = (tokenInfo?: TokenInfoLike) => {
  const info = typeof tokenInfo === "string" ? findToken(tokenInfo) : tokenInfo

  if (!info) {
    throw new Error(`Unknown token: ${tokenInfo}`)
  }

  return info as TokenInfo
}
