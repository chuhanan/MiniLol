var fs = require('fs')
var path = require('path')
var request = require('request')

// 从 http://lol.qq.com/biz/hero/champion.js 获取到英雄数据

function fetchChampions() {
	return new Promise((resolve, reject) => {
		request('http://lol.qq.com/biz/hero/champion.js', (err, res, body) => {
			if(err) {
				reject(err)
			}
			// console.log(text)
			// 执行该 js 代码
			eval(body) // LOLherojs.champion 保存所有英雄的数据
			// 图片地址 http://ossweb-img.qq.com/images/lol/img/champion/Aatrox.png
			// 再生成本地图片
			var ary = []
			for(var id in LOLherojs.champion.keys) {
				var championName = LOLherojs.champion.keys[id]
				ary.push(id + '.' + championName)
			}
			resolve(ary)
		})
	})
}

function createChampionImg(url, path, bar) {
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
					console.log(path + '下载成功')
				})
		})
	// })
}


fetchChampions()
	.then(ary => {
		// console.log(ary)
		for(var i = 0, len = ary.length; i < len; i++) {
			var img = ary[i].split('.')[1] + '.png'
			var file = ary[i].split('.')[0] + '.png'
			createChampionImg('http://ossweb-img.qq.com/images/lol/img/champion/' + img, path.join(__dirname, '../images/champion', file))	
		}
		console.log('\n 全部下载完成 \n')
	})
	.catch(err => {
		console.log(err)
	})

