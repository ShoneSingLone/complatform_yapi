const https = require("http");

// https.get('http://66.187.4.252:7003/cloudsearch?keywords=%E7%8E%8B%E5%85%AB%E8%9B%8B&offset=0&type=1&cookie=', (res) => {
//     let data = '';

//     // 监听 data 事件，接收数据块
//     res.on('data', (chunk) => {
//         data += chunk;
//     });

//     // 监听 end 事件，数据接收完成
//     res.on('end', () => {
//         try {
//             console.log(data);
//         } catch (error) {
//             console.error('解析 JSON 数据时出错:', error);
//         }
//     });

// }).on('error', (error) => {
//     console.error('请求出错:', error);
// });

let axios = require("axios");
(async () => {
	const res = await axios({
		method: "post",
		url: `http://66.187.4.252:7003/cloudsearch?keywords=%E7%8E%8B%E5%85%AB%E8%9B%8B&offset=0&type=1&cookie=`,
		data: {}
	});
	console.log("🚀 ~ res:", res);
})();
