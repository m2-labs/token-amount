import Decimal from "decimal.js"
import { asDecimal, DecimalLike } from "./utils/decimal-fns"

type TokenInfoParams = {
  symbol: string
  decimals: DecimalLike
}

export type TokenInfoLike =
  | TokenInfo
  | string
  | {
      symbol: string
      decimals: DecimalLike
    }

const KNOWN_TOKENS: Record<string, TokenInfoParams> = {
  ETH: {
    symbol: "ETH",
    decimals: 18
  },
  SOL: {
    symbol: "SOL",
    decimals: 9
  },
  USDC: {
    symbol: "USDC",
    decimals: 6
  }
}

export class TokenInfo {
  public readonly symbol: string
  public readonly decimals: Decimal

  // TODO: Look up decimals, etc, automatically in the solana token registry, throw if we cant find?
  constructor(params: TokenInfoLike) {
    if (typeof params === "string") {
      const tokenInfo = KNOWN_TOKENS[params]

      if (!tokenInfo) {
        throw new Error(
          `Unable to auto populate token information for token ${params}.`
        )
      }

      this.symbol = tokenInfo.symbol
      this.decimals = asDecimal(tokenInfo.decimals)
    } else {
      this.symbol = params.symbol
      this.decimals = asDecimal(params.decimals)
    }
  }

  static get SOL(): TokenInfo {
    return new TokenInfo(KNOWN_TOKENS.SOL)
  }

  static get USDC(): TokenInfo {
    return new TokenInfo(KNOWN_TOKENS.USDC)
  }

  static get ETH(): TokenInfo {
    return new TokenInfo(KNOWN_TOKENS.ETH)
  }
}
