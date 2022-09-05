const { Hop,  } = require('@onehop/js')
const myToken = process.env.HOP_TOKEN;
const hop = new Hop(myToken);

module.exports = {hop}