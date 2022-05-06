# Token Amount

A safe and easy way to deal with amounts of Solana Tokens.

## Installation

```sh
npm i @m2-labs/token-amount
```

## Usage

```ts
import { TokenAmount } from '@m2-labs/token-amount';

const oneDollar = new TokenAmount(1, 'USDC');
const anotherDollar = TokenAmount.fromSubunits(1000000, 'USDC')

const twoDollars = oneDollar.plus(anotherDollar)
```

## Brought to you by M2 Labs

<img src="https://m2.xyz/github.png" alt="M2 Labs" width="427" height="94" />

This project is maintained and funded by [M2 Labs](https://m2.xyz), a Web3
product development studio.
