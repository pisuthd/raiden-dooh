# Raidenooh 

Raidenooh is a decentralized digital signage platform that going to tackle a problem in tradition advertisement industry which is a long and complex process. The new blockchain based system will be a breakthough to the industry, advertiser can post an ad directly to the publisher reduce a time-to-publish from 30 days to 3 minutes where the payment is instant and don't require any intermediary.

* Powered by Ethereum + Raiden

![System Overview](https://s3-ap-southeast-1.amazonaws.com/ferrock-scg/diagram.png)

## Installation

The application will need Raiden for micro-payment functionality, please ensure Raiden node is up and running and a channel is still open between parties.

```javascript
configuration : [
    {
      name: 'starbuck',
      raiden_host : 'http://159.89.203.92:5001',
      address : '0xBdCC4678904D728A7394aabC7eeC76A3578eA4B2'
    },
    {
      name: 'thebridge',
      raiden_host : 'http://167.99.66.17:5001',
      address : '0x6ff879Fc4a3799C428B98bfD1Aec053C08EddF63'
    }
  ]
```

You may need to deploy solidity smart contracts and then amend in 'eth.service.ts' then run

```javascript
npm install
npm start
```

### Getting started
It will be no form to input the data in web application since we think it is unnecessary and need to take a lot of time to pursue. The only way to input the data into the system is by using Remix IDE, the example data is following

```javascript
// example data for publisher
// 0x6ff879Fc4a3799C428B98bfD1Aec053C08EddF63,"the bridge SG"

// example data for screen
// 1,"Office Lobby","secret",10000000000000000,10
// 1,"Lift to Car Park","secret",10000000000000000,10
// 1,"Retail Drop-Off","secret",10000000000000000,10

// example data for ad
// "0xBdCC4678904D728A7394aabC7eeC76A3578eA4B2","cupcake promotion","https://s3-ap-southeast-1.amazonaws.com/gamedex-static/test/20181208_213315.jpg"
// "0xBdCC4678904D728A7394aabC7eeC76A3578eA4B2","avenger x","https://s3-ap-southeast-1.amazonaws.com/gamedex-static/test/20181208_213901.jpg"
// "0xBdCC4678904D728A7394aabC7eeC76A3578eA4B2","iphone xx","https://s3-ap-southeast-1.amazonaws.com/gamedex-static/test/20181208_214412.jpg"


```
