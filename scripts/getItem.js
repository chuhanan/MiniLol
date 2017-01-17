var fs = require('fs')
var path = require('path')
var request = require('request')

// 从 http://lol.qq.com/biz/hero/champion.js 获取到英雄数据

function fetchItems() {
	return new Promise((resolve, reject) => {
		request('http://lol.qq.com/biz/hero/item.js', (err, res, body) => {
			if(err) {
				reject(err)
			}
			// console.log(text)
			// 执行该 js 代码
			eval(body) // LOLitemjs.data 保存所有物品的数据
			// 图片地址 http://ossweb-img.qq.com/images/lol/img/item/1001.png
			// 再生成本地图片
			var ary = []
			for(var id in LOLitemjs.data) {
				// var championName = LOLitemjs.data[id]
				ary.push(id)
			}
			resolve(ary)
		})
	})
}

function createItemImg(url, path, count) {
	// return new Promise((resolve, reject) => {
		// 从地址下载图片到本地
		request.head(url, (err, res, body) => {
			// if(err) reject(err)
			if(err) {
				console.log(err)
				return
			}
			request(url)
				.pipe(fs.createWriteStream(path))
				.on('close', () => {
					// resolve(path + '下载成功')
					console.log(path + ' 下载成功')
					count -= 1
					if(count === 0) {
						console.log('\n 全部下载完成')
					}
				})
		})
	// })
}


fetchItems()
	.then(ary => {
		// console.log(ary)
		var count = ary.length
		for(var i = 0, len = ary.length; i < len; i++) {
			var img = ary[i].split('.')[0] + '.png'
			createItemImg('http://ossweb-img.qq.com/images/lol/img/item/' + img, path.join(__dirname, '../images/item', img), count)	
		}
	})
	.catch(err => {
		console.log(err)
	})

