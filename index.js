const http = require("https");

var AWS = require("aws-sdk");

exports.handler = function (event, context) {
  const accnum = context.invokedFunctionArn.split(":")[4];
  let options = {
    method: "GET",
    hostname: "api.direct.playstation.com",
    port: null,
    path:
      "/commercewebservices/ps-direct-us/users/anonymous/products/productList?fields=BASIC&productCodes=3005817",
    headers: {
      authority: "api.direct.playstation.com",
      "sec-ch-ua":
        '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
      accept: "*/*",
      "sec-ch-ua-mobile": "?0",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
      "content-type": "application/json",
      origin: "https://direct.playstation.com",
      "sec-fetch-site": "same-site",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      referer: "https://direct.playstation.com/",
      "accept-language": "en-US,en;q=0.9",
      "sec-gpc": "1",
      "if-none-match": '"0b31e6f17dac0dfe919dd72fb2bd5b7cd-gzip"',
      "Content-Length": "0",
    },
  };

  let req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      let jbody = JSON.parse(body);
      if (
        jbody.products[0].stock.stockLevelStatus.toLowerCase() !== "outofstock"
      ) {
        console.log("heyyo!");
        var sns = new AWS.SNS();
        var dt = new Date();
        var params = {
          Message: "https://bit.ly/3dNr55p " + dt,
          Subject: "PS Is here",
          TopicArn:
            "arn:aws:sns:us-east-1:" + accnum + ":ps5hunter_stock_availability",
        };
        sns.publish(params, context.done);
      } else {
        console.log("sonybah");
      }
    });
  });

  req.end();

  options = {
    method: "GET",
    hostname: "www.gamestop.com",
    port: null,
    path:
      "/on/demandware.store/Sites-gamestop-us-Site/default/Product-Variation?dwvar_11108141_condition=New&pid=11108141&quantity=1",
    headers: {
      authority: "www.gamestop.com",
      "sec-ch-ua":
        '"Google Chrome";v="89", "Chromium";v="89", ";Not A Brand";v="99"',
      accept: "*/*",
      "x-requested-with": "XMLHttpRequest",
      "sec-ch-ua-mobile": "?0",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_2_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
      "sec-fetch-site": "same-origin",
      "sec-fetch-mode": "cors",
      "sec-fetch-dest": "empty",
      referer:
        "https://www.gamestop.com/video-games/playstation-5/consoles/products/playstation-5-digital-edition/11108141.html",
      "accept-language": "en-US,en;q=0.9",
      "sec-gpc": "1",
      "Content-Length": "0",
    },
  };

  req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      let jbody = JSON.parse(body);
      if (jbody.gtmData.productInfo.availability !== "Not Available") {
        console.log("GAMESTOP!");
        var sns = new AWS.SNS();
        var dt = new Date();
        var params = {
          Message:
            "https://www.gamestop.com/video-games/playstation-5/consoles/products/playstation-5-digital-edition/11108141.html " +
            dt,
          Subject: "GME! PS Is here",
          TopicArn:
            "arn:aws:sns:us-east-1:" + accnum + ":ps5hunter_stock_availability",
        };
        sns.publish(params, context.done);
      } else {
        console.log("gamestopoop");
      }
    });
  });

  req.end();
};
