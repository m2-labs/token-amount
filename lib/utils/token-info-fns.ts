import type { TokenInfo, TokenList } from "@solana/spl-token-registry"
import tokenList from "@solana/spl-token-registry/dist/main/tokens/solana.tokenlist.json"
import { PublicKeyLike } from "./public-key"

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

  return (tokenList as TokenList).tokens.find(
    (token) => token.symbol === symbol
  )
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

  return (tokenList as TokenList).tokens.find(
    (token) => token.address === mint.toString()
  )
}

/**
 *
 * @param symbolOrMint
 * @returns
 */
export const findToken = (
  symbolOrMint?: PublicKeyLike
): TokenInfo | undefined => {
  if (!symbolOrMint) {
    return
  }

  return (tokenList as TokenList).tokens.find(
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
