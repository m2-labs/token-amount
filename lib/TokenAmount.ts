import BN from "bn.js"
import Decimal from "decimal.js"
import { TokenInfo, TokenInfoLike } from "./TokenInfo"
import { asDecimal, DecimalLike } from "./utils/decimal-fns"

/**
 *
 */
export type TokenAmountLike = TokenAmount | DecimalLike

/**
 *
 */
export class TokenAmount {
  public readonly amount: Decimal
  public readonly tokenInfo: TokenInfo

  /**
   *
   * @param amount
   * @param tokenInfo
   */
  constructor(amount: DecimalLike, tokenInfo: TokenInfoLike) {
    this.amount = asDecimal(amount)
    this.tokenInfo = new TokenInfo(tokenInfo)
  }

  /**
   *
   * @param amount
   * @param tokenInfo
   * @returns
   */
  static fromUnits(amount: DecimalLike, tokenInfo: TokenInfoLike): TokenAmount {
    return new TokenAmount(amount, tokenInfo)
  }

  /**
   *
   * @param subunits
   * @param tokenInfo
   * @returns
   */
  static fromSubunits(
    subunits: DecimalLike,
    tokenInfo: TokenInfoLike
  ): TokenAmount {
    const info = new TokenInfo(tokenInfo)
    const exponent = new Decimal(10).pow(asDecimal(info.decimals))
    const amount = asDecimal(subunits).div(exponent)

    return new TokenAmount(amount, info)
  }

  /**
   *
   */
  get symbol(): string {
    return this.tokenInfo.symbol
  }

  /**
   *
   */
  get decimals(): Decimal {
    return this.tokenInfo.decimals
  }

  get units(): Decimal {
    return this.amount
  }

  /**
   *
   */
  get subunits(): Decimal {
    return this.amount.times(new Decimal(10).pow(this.decimals))
  }

  /**
   *
   * @returns
   */
  toNumber(): number {
    return this.amount.toNumber()
  }

  /**
   *
   * @returns
   */
  toBN(asSubunits = true): BN {
    return new BN(asSubunits ? this.subunits.toString() : this.units.toString())
  }

  /**
   *
   * @returns
   */
  toString(): string {
    return `${this.amount.toString()} ${this.symbol}`
  }

  /**
   *
   * @param param0
   * @returns
   */
  clone(amount?: DecimalLike | null, tokenInfo?: TokenInfoLike): TokenAmount {
    return new TokenAmount(amount || this.amount, tokenInfo || this.tokenInfo)
  }

  /** Arithmetic functions */

  /**
   *
   * @param other
   * @returns
   */
  minus(other: TokenAmountLike): TokenAmount {
    assertSameToken(this, other)

    if (other instanceof TokenAmount) {
      return this.clone(this.amount.minus(other.amount))
    }

    return this.clone(this.amount.minus(asDecimal(other)))
  }

  /**
   *
   * @param other
   * @returns
   */
  plus(other: TokenAmountLike): TokenAmount {
    assertSameToken(this, other)

    if (other instanceof TokenAmount) {
      return this.clone(this.amount.plus(other.amount))
    }

    return this.clone(this.amount.plus(asDecimal(other)))
  }

  /**
   *
   * @param other
   * @returns
   */
  times(other: TokenAmountLike): TokenAmount {
    if (other instanceof TokenAmount) {
      return this.clone(this.amount.times(other.amount))
    }

    return this.clone(this.amount.times(asDecimal(other)))
  }

  /**
   *
   * @param other
   * @returns
   */
  div(other: TokenAmountLike): TokenAmount {
    if (other instanceof TokenAmount) {
      return this.clone(this.amount.div(other.amount))
    }

    return this.clone(this.amount.div(asDecimal(other)))
  }

  /**
   *
   * @param other
   * @returns
   */
  pow(other: DecimalLike): TokenAmount {
    return this.clone(this.amount.pow(asDecimal(other)))
  }

  /**
   * Compare functions
   */

  /**
   *
   * @param other
   * @returns
   */
  gt(other: TokenAmountLike): boolean {
    assertSameToken(this, other)

    if (other instanceof TokenAmount) {
      return this.amount.gt(other.amount)
    }

    return this.amount.gt(asDecimal(other))
  }

  /**
   *
   * @param other
   * @returns
   */
  eq(other: TokenAmountLike): boolean {
    assertSameToken(this, other)

    if (other instanceof TokenAmount) {
      return this.amount.eq(other.amount)
    }

    return this.amount.eq(asDecimal(other))
  }

  /**
   *
   * @param other
   * @returns
   */
  lt(other: TokenAmountLike): boolean {
    assertSameToken(this, other)

    if (other instanceof TokenAmount) {
      return this.amount.lt(other.amount)
    }

    return this.amount.lt(asDecimal(other))
  }

  /**
   *
   * @param other
   * @returns
   */
  gte(other: TokenAmountLike): boolean {
    return this.gt(other) || this.eq(other)
  }

  /**
   *
   * @param other
   * @returns
   */
  lte(other: TokenAmountLike): boolean {
    return this.lt(other) || this.eq(other)
  }
}

/**
 *
 * @param token
 * @param other
 */
function assertSameToken(token: TokenAmountLike, other: TokenAmountLike) {
  if (
    token instanceof TokenAmount &&
    other instanceof TokenAmount &&
    token.symbol !== other.symbol
  ) {
    throw new Error(
      `Cannot perform this action on different token types. Received ${token.symbol} and ${other.symbol}`
    )
  }
}
