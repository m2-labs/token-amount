import BN from "bn.js"
import Decimal from "decimal.js"
import { TokenAmount } from "../lib/TokenAmount"

test("constructor() builds a new TokenAmount from full units using a number", () => {
  const amount = new TokenAmount(42, "ETH")

  expect(amount.amount.toString()).toBe("42")
  expect(amount.symbol).toBe("ETH")
  expect(amount.decimals).toBe(8)
})

test("constructor() builds a new TokenAmount from full units using a string", () => {
  const amount = new TokenAmount("42", "ETH")

  expect(amount.amount.toString()).toBe("42")
  expect(amount.symbol).toBe("ETH")
  expect(amount.decimals).toBe(8)
})

test("constructor() builds a new TokenAmount from full units using a Decimal", () => {
  const amount = new TokenAmount(new Decimal(42), "ETH")

  expect(amount.amount.toString()).toBe("42")
  expect(amount.symbol).toBe("ETH")
  expect(amount.decimals).toBe(8)
})

test("constructor() builds a new TokenAmount from full units using a BN", () => {
  const amount = new TokenAmount(new BN(42), "ETH")

  expect(amount.amount.toString()).toBe("42")
  expect(amount.symbol).toBe("ETH")
  expect(amount.decimals).toBe(8)
})

test("fromUnits() is a helper alias for the constructor", () => {
  const amount = TokenAmount.fromUnits(42, "ETH")

  expect(amount.amount.toString()).toBe("42")
  expect(amount.symbol).toBe("ETH")
  expect(amount.decimals).toBe(8)
})

test("fromSubunits() builds a new TokenAmont from subunits", () => {
  const amount = TokenAmount.fromSubunits(420000, "USDC")

  expect(amount.amount.toString()).toBe("0.42")
})

test("units is an alias for the amount", () => {
  const amount = new TokenAmount(42, "ETH")

  expect(amount.units.toString()).toBe("42")
})

test("subunits returns the amount as subunits for eth", () => {
  const amount = new TokenAmount(42, "ETH")

  expect(amount.subunits.toString()).toBe("4200000000")
})

test("subunits returns the amount as subunits for sol", () => {
  const amount = new TokenAmount(42, "SOL")

  expect(amount.subunits.toString()).toBe("42000000000")
})

test("toNumber() returns the number in units", () => {
  const amount = new TokenAmount(42, "ETH")

  expect(amount.toNumber()).toBe(42)
})

test("toString() outputs the units with the symbol", () => {
  const amount = new TokenAmount(42, "ETH")

  expect(amount.toString()).toBe("42 ETH")
})

test("toBN() returns the subunits as a BN", () => {
  const amount = new TokenAmount(42, "SOL")

  expect(amount.toBN().toNumber()).toBe(42_000_000_000)
})

test("toBN(false) returns the units as a BN", () => {
  const amount = new TokenAmount(42, "SOL")

  expect(amount.toBN(false).toNumber()).toBe(42)
})

test("clone() returns a new TokenAmount", () => {
  const amount = new TokenAmount(42, "SOL")
  const clone = amount.clone()

  expect(clone.amount.toNumber()).toBe(amount.amount.toNumber())
  expect(clone.symbol).toBe(amount.symbol)
})

test("clone() returns a new TokenAmount with a different amount", () => {
  const amount = new TokenAmount(42, "SOL")
  const clone = amount.clone(44)

  expect(clone.amount.toNumber()).toBe(44)
  expect(clone.symbol).toBe(amount.symbol)
})

test("clone() returns a new TokenAmount with a new symbol", () => {
  const amount = new TokenAmount(42, "SOL")
  const clone = amount.clone(null, "ETH")

  expect(clone.amount.toNumber()).toBe(amount.amount.toNumber())
  expect(clone.symbol).toBe("ETH")
})

test("minus() returns a new TokenAmount by subtracting one TokenAmount from another of the same type", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(24, "ETH")

  expect(amount.minus(other).toNumber()).toBe(18)
})

test("minus() returns a new TokenAmount by subtracting a number from a TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = 24

  expect(amount.minus(other).toNumber()).toBe(18)
})

test("minus() returns a new TokenAmount by subtracting a Decimal from a TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new Decimal(24)

  expect(amount.minus(other).toNumber()).toBe(18)
})

test("minus() returns a new TokenAmount by subtracting a valid string from a TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = "24"

  expect(amount.minus(other).toNumber()).toBe(18)
})

test("minus() throws if given two different token types", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(24, "SOL")

  expect(() => amount.minus(other)).toThrow()
})

test("plus() returns a new TokenAmount by adding one TokenAmount to another of the same type", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(24, "ETH")

  expect(amount.plus(other).toNumber()).toBe(66)
})

test("plus() returns a new TokenAmount by adding a number to a TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = 24

  expect(amount.plus(other).toNumber()).toBe(66)
})

test("plus() returns a new TokenAmount by adding a Decimal to a TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new Decimal(24)

  expect(amount.plus(other).toNumber()).toBe(66)
})

test("plus() returns a new TokenAmount by adding a valid string to a TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = "24"

  expect(amount.plus(other).toNumber()).toBe(66)
})

test("plus() throws if given two different token types", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(24, "SOL")

  expect(() => amount.plus(other)).toThrow()
})

test("times() returns a new TokenAmount by multiplying one TokenAmount with another of the same type", () => {
  const amount = new TokenAmount(2, "ETH")
  const other = new TokenAmount(4, "ETH")

  expect(amount.times(other).toNumber()).toBe(8)
})

test("times() returns a new TokenAmount by multiplying a number with a TokenAmount", () => {
  const amount = new TokenAmount(2, "ETH")
  const other = 4

  expect(amount.times(other).toNumber()).toBe(8)
})

test("times() returns a new TokenAmount by multiplying a Decimal with a TokenAmount", () => {
  const amount = new TokenAmount(2, "ETH")
  const other = new Decimal(4)

  expect(amount.times(other).toNumber()).toBe(8)
})

test("times() returns a new TokenAmount by multiplying a valid string with a TokenAmount", () => {
  const amount = new TokenAmount(2, "ETH")
  const other = "4"

  expect(amount.times(other).toNumber()).toBe(8)
})

test("times() allows multiplying different types", () => {
  const amount = new TokenAmount(2, "SOL")
  const other = new TokenAmount(4, "ETH")
  const result = amount.times(other)

  expect(result.toNumber()).toBe(8)
  expect(result.symbol).toEqual("SOL")
})

test("div() returns a new TokenAmount by dividing one TokenAmount by another of the same type", () => {
  const amount = new TokenAmount(32, "ETH")
  const other = new TokenAmount(4, "ETH")

  expect(amount.div(other).toNumber()).toBe(8)
})

test("div() returns a new TokenAmount by dividing a number by a TokenAmount", () => {
  const amount = new TokenAmount(32, "ETH")
  const other = 4

  expect(amount.div(other).toNumber()).toBe(8)
})

test("div() returns a new TokenAmount by dividing a Decimal by a TokenAmount", () => {
  const amount = new TokenAmount(32, "ETH")
  const other = new Decimal(4)

  expect(amount.div(other).toNumber()).toBe(8)
})

test("div() returns a new TokenAmount by dividing a valid string by a TokenAmount", () => {
  const amount = new TokenAmount(32, "ETH")
  const other = "4"

  expect(amount.div(other).toNumber()).toBe(8)
})

test("div() allows dividing different types", () => {
  const amount = new TokenAmount(32, "SOL")
  const other = new TokenAmount(4, "ETH")
  const result = amount.div(other)

  expect(result.toNumber()).toBe(8)
  expect(result.symbol).toEqual("SOL")
})

test("pow() returns a new TokenAmount raised to a power", () => {
  const amount = new TokenAmount(3, "SOL")

  expect(amount.pow(2).toNumber()).toBe(9)
})

test("gt() returns true if this TokenAmount is greater than another TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(24, "ETH")

  expect(amount.gt(other)).toBe(true)
})

test("gt() returns true if this TokenAmount is greater than a number", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = 24

  expect(amount.gt(other)).toBe(true)
})

test("gt() returns true if this TokenAmount is greater than a decimal", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new Decimal(24)

  expect(amount.gt(other)).toBe(true)
})

test("gt() returns true if this TokenAmount is greater than a string", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = "24"

  expect(amount.gt(other)).toBe(true)
})

test("gt() returns false if this TokenAmount is the same as another TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(42, "ETH")

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is equal to a number", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = 42

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is equal to a decimal", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new Decimal(42)

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is equal to a string", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = "42"

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is less than another TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(66, "ETH")

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is less than a number", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = 66

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is less than a decimal", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new Decimal(66)

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is less than a string", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = "66"

  expect(amount.gt(other)).toBe(false)
})

test("eq() returns true if this TokenAmount is equal to another TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(42, "ETH")

  expect(amount.eq(other)).toBe(true)
})

test("eq() returns true if this TokenAmount is equal to a number", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = 42

  expect(amount.eq(other)).toBe(true)
})

test("eq() returns true if this TokenAmount is equal to a decimal", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new Decimal(42)

  expect(amount.eq(other)).toBe(true)
})

test("eq() returns true if this TokenAmount is equal to a string", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = "42"

  expect(amount.eq(other)).toBe(true)
})

test("eq() returns false if this TokenAmount is the greater than another TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(2, "ETH")

  expect(amount.eq(other)).toBe(false)
})

test("eq() returns false if this TokenAmount is greater than to a number", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = 2

  expect(amount.eq(other)).toBe(false)
})

test("eq() returns false if this TokenAmount is greater than to a decimal", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new Decimal(2)

  expect(amount.eq(other)).toBe(false)
})

test("eq() returns false if this TokenAmount is greater than to a string", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = "2"

  expect(amount.eq(other)).toBe(false)
})

test("eq() returns false if this TokenAmount is less than another TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(66, "ETH")

  expect(amount.eq(other)).toBe(false)
})

test("eq() returns false if this TokenAmount is less than a number", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = 66

  expect(amount.eq(other)).toBe(false)
})

test("eq() returns false if this TokenAmount is less than a decimal", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new Decimal(66)

  expect(amount.eq(other)).toBe(false)
})

test("eq() returns false if this TokenAmount is less than a string", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = "66"

  expect(amount.eq(other)).toBe(false)
})

test("lt() returns true if this TokenAmount is less than another TokenAmount", () => {
  const amount = new TokenAmount(2, "ETH")
  const other = new TokenAmount(24, "ETH")

  expect(amount.lt(other)).toBe(true)
})

test("lt() returns true if this TokenAmount is less than a number", () => {
  const amount = new TokenAmount(2, "ETH")
  const other = 24

  expect(amount.lt(other)).toBe(true)
})

test("lt() returns true if this TokenAmount is less than a decimal", () => {
  const amount = new TokenAmount(2, "ETH")
  const other = new Decimal(24)

  expect(amount.lt(other)).toBe(true)
})

test("lt() returns true if this TokenAmount is less than a string", () => {
  const amount = new TokenAmount(2, "ETH")
  const other = "24"

  expect(amount.lt(other)).toBe(true)
})

test("lt() returns false if this TokenAmount is the same as another TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(42, "ETH")

  expect(amount.lt(other)).toBe(false)
})

test("lt() returns false if this TokenAmount is equal to a number", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = 42

  expect(amount.lt(other)).toBe(false)
})

test("lt() returns false if this TokenAmount is equal to a decimal", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new Decimal(42)

  expect(amount.lt(other)).toBe(false)
})

test("lt() returns false if this TokenAmount is equal to a string", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = "42"

  expect(amount.lt(other)).toBe(false)
})

test("lt() returns false if this TokenAmount is greater than another TokenAmount", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new TokenAmount(6, "ETH")

  expect(amount.lt(other)).toBe(false)
})

test("lt() returns false if this TokenAmount is greater than a number", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = 6

  expect(amount.lt(other)).toBe(false)
})

test("lt() returns false if this TokenAmount is greater than a decimal", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = new Decimal(6)

  expect(amount.lt(other)).toBe(false)
})

test("lt() returns false if this TokenAmount is greater than a string", () => {
  const amount = new TokenAmount(42, "ETH")
  const other = "6"

  expect(amount.lt(other)).toBe(false)
})

test("gte() returns true if the TokenAmount is greater than the other", () => {
  const amount = new TokenAmount(42, "SOL")
  const other = "6"

  expect(amount.gte(other)).toBe(true)
})

test("gte() returns true if the TokenAmount is equal to the other", () => {
  const amount = new TokenAmount(42, "SOL")
  const other = "42"

  expect(amount.gte(other)).toBe(true)
})

test("gte() returns false if the TokenAmount is less than the other amount", () => {
  const amount = new TokenAmount(6, "SOL")
  const other = 42

  expect(amount.gte(other)).toBe(false)
})

test("lte() returns true if the TokenAmount is less than the other", () => {
  const amount = new TokenAmount(42, "SOL")
  const other = "66"

  expect(amount.lte(other)).toBe(true)
})

test("lte() returns true if the TokenAmount is equal to the other", () => {
  const amount = new TokenAmount(42, "SOL")
  const other = "42"

  expect(amount.lte(other)).toBe(true)
})

test("lte() returns false if the TokenAmount is greater than the other amount", () => {
  const amount = new TokenAmount(66, "SOL")
  const other = 42

  expect(amount.lte(other)).toBe(false)
})
