var fs = require('fs')
var path = require('path')
var request = require('request')

function fetchRunes() {
	return new Promise((resolve, reject) => {
		request('http://lol.178.com/rune/data.new.js', (err, res, body) => {
			if(err) {
				reject(err)
			}
			// console.log(text)
			// 执行该 js 代码
			eval(body) // runeData 保存所有技能的数据
			// 图片地址 http://cimg.178.com/lol/images/content/rune/r_1_3.png
			// 再生成本地图片
			var ary = []
			for(var color in runeData) {
				for(var id in runeData[color]) {
					var result = path.parse(runeData[color][id].img)
					// var dir = path.join(result.dir, result.base)
					var filename = result.base
					ary.push({
						id,
						dir: result.dir,
						base: result.base
					})
				}
			}
			resolve(ary)
		})
	})
}

function createImg(url, path) {
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

var count = 0
fetchRunes()
	.then(ary => {
		// console.log(ary)
		count = ary.length
		for(var i = 0, len = ary.length; i < len; i++) {
			var result = ary[i]
			var img = result.dir + '/' + result.base
			var filename = result.id + '.png'
			// console.log('http://cimg.178.com/lol/images/' + img)
			createImg('http://cimg.178.com/lol/images/' + img, path.join(__dirname, '../images/rune', filename))	
		}
	})
	.catch(err => {
		console.log(err)
	})

