//import * as request from 'request' เป็นของ typescrip
//import * as readline from 'readline' เป็นของ typescrip

const request = require('request') //เป็นของ javascrip //impoet request
const readline = require('readline') //เป็นของ javascrip //impoet readline
const rl = readline.createInterface({input: process.stdin, output: process.stdout})

function showExchange(rates) {
  rl.question('กรอกจำนวนเงิน (บาท) ', (answer) => {
    const money = parseFloat(answer)
    console.log(`ผู้ใช้มีเงิน ${money} บาท`)
    for (let k in rates) {
      console.log(`\t: ${k} ${(money*rates[k]/rates['THB']).toFixed(2)}`)
    }
    rl.close()
  })
}  //การสร้างฟังก์ชั่น showExchange

const url = `https://api.exchangeratesapi.io/latest`

let result = '';
request.get(url)
        .on('response', res => {
            console.log(`response statusCode : ${res.statusCode}`)
            // console.log(res.headers)
        })
    .on('data', data => {
      result += data
        })
    .on('end', () => {
      const exchange = JSON.parse(result) //convert to json object
      showExchange(exchange.rates)
        })
