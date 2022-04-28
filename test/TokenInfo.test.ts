import { TokenInfo } from "../lib/TokenInfo"

test("constructor accepts a TokenInfo", () => {
  const existing = new TokenInfo({ symbol: "SOL", decimals: 9 })
  const info = new TokenInfo(existing)

  expect(info.symbol).toBe("SOL")
  expect(info.decimals.toNumber()).toBe(9)
})

test("constructor accepts a string", () => {
  const info = new TokenInfo("SOL")

  expect(info.symbol).toBe("SOL")
  expect(info.decimals.toNumber()).toBe(9)
})

test("constructor accepts TokenInfo-like object", () => {
  const info = new TokenInfo({ symbol: "SOL", decimals: 9 })

  expect(info.symbol).toBe("SOL")
  expect(info.decimals.toNumber()).toBe(9)
})

test("constructor throws if given an unknown string symbol", () => {
  expect(() => {
    new TokenInfo("UNKNOWN")
  }).toThrow()
})

test("SOL helper method exists", () => {
  const info = TokenInfo.SOL

  expect(info.symbol).toBe("SOL")
  expect(info.decimals.toNumber()).toBe(9)
})

test("USDC helper method exists", () => {
  const info = TokenInfo.USDC

  expect(info.symbol).toBe("USDC")
  expect(info.decimals.toNumber()).toBe(6)
})

test("ETH helper method exists", () => {
  const info = TokenInfo.ETH

  expect(info.symbol).toBe("ETH")
  expect(info.decimals.toNumber()).toBe(18)
})
