import Decimal from "decimal.js"
import { number } from "../lib"

test("a decimal is exported", () => {
  expect(number.eq(new Decimal(42))).toBe(true)
})
