const request = require("supertest");
var request1 = require("request");
const express = require("express");
import apis from "./src/services/ApiService/https/main/index.mjs";
const app = express();
// describe('test apis', () => {
// it('test', async () => {
console.log(apis);

const addr =
  "https://dev.apis.naver.com/now_web/nowapi-xhmac/nnow/v2/stream/livelist/";
const addr1 = request1.get(addr, function(req, res) {
  console.log(res.body);
});

var server = app.listen(8081, "localhost", function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
// request(server)
//   .get(addr)
//   .expect('Content-Type', /json/)
//   .expect('Content-Length', '15')
//   .expect(200)
//   .end(function (err, res) {
//     if (err) console.log(err)
//   })
// })
// })
