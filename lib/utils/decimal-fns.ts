import BN from "bn.js"
import { asDecimal as asDecimalOrig } from "decimal-fns"
import type { DecimalLike as DecimalLikeOrig } from "decimal-fns"

export type DecimalLike = DecimalLikeOrig | BN

/**
 * A wrapper for `asDecimal` from decimal-fns which accepts a BN as well
 */
export const asDecimal = (
  value?: DecimalLike | null,
  fallback?: DecimalLike
) => {
  const safeValue = BN.isBN(value) ? value.toString() : value
  const safeFallback = BN.isBN(fallback) ? fallback.toString() : fallback

  return asDecimalOrig(safeValue, safeFallback)
}
