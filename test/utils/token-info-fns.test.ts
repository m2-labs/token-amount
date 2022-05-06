import {
  buildTokenInfo,
  findToken,
  findTokenByMint,
  findTokenBySymbol
} from "../../lib/utils/token-info-fns"

test("findTokenBySymbol() returns a TokenInfo with the same symbol", () => {
  const token = findTokenBySymbol("USDC")

  expect(token?.address).toEqual("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
  expect(token?.name).toEqual("USD Coin")
  expect(token?.symbol).toEqual("USDC")
  expect(token?.decimals).toEqual(6)
})

test("findTokenBySymbol() returns undefined if no token is found", () => {
  expect(findTokenBySymbol("invalid")).toBeUndefined()
})

test("findTokenBySymbol() returns undefined if no symbol is provided", () => {
  expect(findTokenBySymbol()).toBeUndefined()
})

test("findTokenByMint() returns a TokenInfo with the same mint", () => {
  const token = findTokenByMint("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")

  expect(token?.address).toEqual("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
  expect(token?.name).toEqual("USD Coin")
  expect(token?.symbol).toEqual("USDC")
  expect(token?.decimals).toEqual(6)
})

test("findTokenBySymbol() returns undefined if no token is found", () => {
  expect(findTokenByMint("invalid")).toBeUndefined()
})

test("findTokenBySymbol() returns undefined if no symbol is provided", () => {
  expect(findTokenBySymbol()).toBeUndefined()
})

test("findToken() returns a TokenInfo with the same symbol", () => {
  const token = findToken("USDC")

  expect(token?.address).toEqual("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
  expect(token?.name).toEqual("USD Coin")
  expect(token?.symbol).toEqual("USDC")
  expect(token?.decimals).toEqual(6)
})

test("findToken() returns a TokenInfo with the same mint", () => {
  const token = findToken("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")

  expect(token?.address).toEqual("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
  expect(token?.name).toEqual("USD Coin")
  expect(token?.symbol).toEqual("USDC")
  expect(token?.decimals).toEqual(6)
})

test("findToken() returns undefined if no token is found", () => {
  expect(findToken("invalid")).toBeUndefined()
})

test("findToken() returns undefined if no symbol is provided", () => {
  expect(findToken()).toBeUndefined()
})

test("buildTokenInfo() returns a TokenInfo with the same symbol", () => {
  const token = buildTokenInfo("USDC")

  expect(token?.address).toEqual("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
  expect(token?.name).toEqual("USD Coin")
  expect(token?.symbol).toEqual("USDC")
  expect(token?.decimals).toEqual(6)
})

test("buildTokenInfo() returns a TokenInfo with the same mint", () => {
  const token = buildTokenInfo("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")

  expect(token?.address).toEqual("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v")
  expect(token?.name).toEqual("USD Coin")
  expect(token?.symbol).toEqual("USDC")
  expect(token?.decimals).toEqual(6)
})

test("buildTokenInfo() throws if no token is found", () => {
  expect(() => {
    buildTokenInfo("invalid")
  }).toThrow()
})

test("buildTokenInfo() throws if no symbol or mint is provided", () => {
  expect(() => {
    buildTokenInfo()
  }).toThrow()
})
