import BN from "bn.js"
import Decimal from "decimal.js"

export type DecimalLike = Decimal | string | number | BN

export const asDecimal = (
  number?: DecimalLike | null,
  fallback?: DecimalLike
): Decimal => {
  if (number === null || number === undefined) {
    return asDecimal(fallback)
  }

  try {
    const decimal = new Decimal(BN.isBN(number) ? number.toString() : number)
    return decimal
  } catch (e) {
    if (fallback !== undefined && fallback !== null) {
      return asDecimal(fallback)
    }

    throw e
  }
}
