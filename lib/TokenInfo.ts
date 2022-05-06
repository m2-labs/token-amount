import { PublicKey } from "@solana/web3.js"
import Decimal from "decimal.js"
import { asDecimal, DecimalLike } from "./utils/decimal-fns"
import { asPublicKey, PublicKeyLike } from "./utils/public-key"

export type TokenInfoLike =
  | TokenInfo
  | string
  | {
      symbol: string
      decimals: DecimalLike
      mint?: PublicKeyLike
      name?: string
    }

type TokenInfoParams = {
  symbol: string
  decimals: DecimalLike
  mint: PublicKeyLike
  name: string
}

const KNOWN_TOKENS: TokenInfoParams[] = [
  {
    mint: "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So",
    symbol: "mSOL",
    name: "Marinade staked Solana",
    decimals: 9
  },
  {
    mint: "So11111111111111111111111111111111111111112",
    symbol: "SOL",
    name: "Solana",
    decimals: 9
  },
  {
    mint: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
    symbol: "USDC",
    name: "USD Coin",
    decimals: 6
  },
  {
    mint: "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i",
    symbol: "UST",
    name: "Wormhole UST",
    decimals: 6
  },
  {
    mint: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6
  },
  {
    mint: "9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E",
    symbol: "BTC",
    name: "Sollet Wrapped Bitcoin",
    decimals: 6
  },
  {
    mint: "7vfCXTUXx5WJV5JADk17DUJ4ksgau7utNKj4b963voxs",
    symbol: "ETH",
    name: "Wormhole Ethereum",
    decimals: 8
  },
  {
    mint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    symbol: "SAMO",
    name: "Samoyed Coin",
    decimals: 9
  },
  {
    mint: "2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk",
    symbol: "soETH",
    name: "Sollet Wrapped Ethereum",
    decimals: 6
  },
  {
    mint: "USDH1SM1ojwWUga67PGrgFWUHibbjqMvuMaDkRJTgkX",
    symbol: "USDH",
    name: "Hubble Stablecoin",
    decimals: 6
  }
]

export class TokenInfo {
  public readonly symbol: string
  public readonly decimals: Decimal
  public readonly name: string | undefined
  public readonly mint: PublicKey | undefined

  // TODO: Look up decimals, etc, automatically in the solana token registry, throw if we cant find?
  constructor(params: TokenInfoLike) {
    if (typeof params === "string") {
      const tokenInfo = KNOWN_TOKENS.find((t) => t.symbol === params)

      if (!tokenInfo) {
        throw new Error(
          `Unable to auto populate token information for token ${params}.`
        )
      }

      this.symbol = tokenInfo.symbol
      this.decimals = asDecimal(tokenInfo.decimals)
      this.mint = asPublicKey(tokenInfo.mint)
      this.name = tokenInfo.name
    } else {
      this.symbol = params.symbol
      this.decimals = asDecimal(params.decimals)
      this.mint = params.mint ? asPublicKey(params.mint) : undefined
      this.name = params.name
    }
  }

  static fromSymbol(symbol: string) {
    const info = KNOWN_TOKENS.find((t) => t.symbol === symbol)

    if (!info) {
      throw new Error(`Unable to find token information for symbol ${symbol}`)
    }

    return new TokenInfo(info)
  }

  static fromMint(mint: PublicKeyLike) {
    const info = KNOWN_TOKENS.find((t) =>
      asPublicKey(t.mint).equals(asPublicKey(mint))
    )

    if (!info) {
      throw new Error(`Unable to find token information for mint ${mint}`)
    }

    return new TokenInfo(info)
  }

  static get SOL(): TokenInfo {
    return TokenInfo.fromSymbol("SOL")
  }

  static get USDC(): TokenInfo {
    return TokenInfo.fromSymbol("USDC")
  }

  static get ETH(): TokenInfo {
    return TokenInfo.fromSymbol("ETH")
  }
}
