import BN from "bn.js"
import Decimal from "decimal.js"
import { TokenAmount } from "../lib/TokenAmount"
import { TokenInfo } from "../lib/TokenInfo"

test("constructor() builds a new TokenAmount from full units using a number", () => {
  const amount = new TokenAmount(42, TokenInfo.ETH)

  expect(amount.amount.toString()).toBe("42")
  expect(amount.symbol).toBe("ETH")
  expect(amount.decimals.toNumber()).toBe(18)
})

test("constructor() builds a new TokenAmount from full units using a string", () => {
  const amount = new TokenAmount("42", "ETH")

  expect(amount.amount.toString()).toBe("42")
  expect(amount.symbol).toBe("ETH")
  expect(amount.decimals.toNumber()).toBe(18)
})

test("constructor() builds a new TokenAmount from full units using a Decimal", () => {
  const amount = new TokenAmount(new Decimal(42), TokenInfo.ETH)

  expect(amount.amount.toString()).toBe("42")
  expect(amount.symbol).toBe("ETH")
  expect(amount.decimals.toNumber()).toBe(18)
})

test("constructor() builds a new TokenAmount from full units using a BN", () => {
  const amount = new TokenAmount(new BN(42), TokenInfo.ETH)

  expect(amount.amount.toString()).toBe("42")
  expect(amount.symbol).toBe("ETH")
  expect(amount.decimals.toNumber()).toBe(18)
})

test("fromSubunits() builds a new TokenAmont from subunits", () => {
  const amount = TokenAmount.fromSubunits(42, { symbol: "USD", decimals: 2 })

  expect(amount.amount.toString()).toBe("0.42")
})

test("subunits returns the amount as subunits for eth", () => {
  const amount = new TokenAmount(42, TokenInfo.ETH)

  expect(amount.subunits.toString()).toBe("42000000000000000000")
})

test("subunits returns the amount as subunits for sol", () => {
  const amount = new TokenAmount(42, TokenInfo.SOL)

  expect(amount.subunits.toString()).toBe("42000000000")
})

test("toNumber() returns the number in units", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })

  expect(amount.toNumber()).toBe(42)
})

test("toString() outputs the units with the symbol", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })

  expect(amount.toString()).toBe("42 TOK")
})

test("sub() returns a new TokenAmount by subtracting one TokenAmount from another of the same type", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new TokenAmount(24, { symbol: "TOK", decimals: 18 })

  expect(amount.minus(other).toNumber()).toBe(18)
})

test("sub() returns a new TokenAmount by subtracting a number from a TokenAmount", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = 24

  expect(amount.minus(other).toNumber()).toBe(18)
})

test("sub() returns a new TokenAmount by subtracting a Decimal from a TokenAmount", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new Decimal(24)

  expect(amount.minus(other).toNumber()).toBe(18)
})

test("sub() returns a new TokenAmount by subtracting a valid string from a TokenAmount", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = "24"

  expect(amount.minus(other).toNumber()).toBe(18)
})

test("sub() throws if given two different token types", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new TokenAmount(24, TokenInfo.ETH)

  expect(() => amount.minus(other)).toThrow()
})

test("add() returns a new TokenAmount by add one TokenAmount from another of the same type", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new TokenAmount(24, { symbol: "TOK", decimals: 18 })

  expect(amount.plus(other).toNumber()).toBe(66)
})

test("add() returns a new TokenAmount by add a number from a TokenAmount", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = 24

  expect(amount.plus(other).toNumber()).toBe(66)
})

test("add() returns a new TokenAmount by add a Decimal from a TokenAmount", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new Decimal(24)

  expect(amount.plus(other).toNumber()).toBe(66)
})

test("add() returns a new TokenAmount by add a valid string from a TokenAmount", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = "24"

  expect(amount.plus(other).toNumber()).toBe(66)
})

test("add() throws if given two different token types", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new TokenAmount(24, TokenInfo.ETH)

  expect(() => amount.plus(other)).toThrow()
})

test("gt() returns true if this TokenAmount is greater than another TokenAmount", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new TokenAmount(24, { symbol: "TOK", decimals: 18 })

  expect(amount.gt(other)).toBe(true)
})

test("gt() returns true if this TokenAmount is greater than a number", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = 24

  expect(amount.gt(other)).toBe(true)
})

test("gt() returns true if this TokenAmount is greater than a decimal", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new Decimal(24)

  expect(amount.gt(other)).toBe(true)
})

test("gt() returns true if this TokenAmount is greater than a string", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = "24"

  expect(amount.gt(other)).toBe(true)
})

test("gt() returns false if this TokenAmount is the same as another TokenAmount", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new TokenAmount(42, { symbol: "TOK", decimals: 18 })

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is equal to a number", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = 42

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is equal to a decimal", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new Decimal(42)

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is equal to a string", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = "42"

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is less than another TokenAmount", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new TokenAmount(66, { symbol: "TOK", decimals: 18 })

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is less than a number", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = 66

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is less than a decimal", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = new Decimal(66)

  expect(amount.gt(other)).toBe(false)
})

test("gt() returns false if this TokenAmount is less than a string", () => {
  const amount = new TokenAmount(42, { symbol: "TOK", decimals: 18 })
  const other = "66"

  expect(amount.gt(other)).toBe(false)
})
