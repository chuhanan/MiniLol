var express = require('express');

var app = express();
var lol = require('lol-js');
var apiKey = 'RGAPI-99bc7695-5daa-49aa-a21f-961875351772';
var lolClient = lol.client({
    apiKey: apiKey,
});
// lolClient.getChampionById('na', 53, {champData: ['all']}, function(err, data) {
//     console.log("Found ", data);
//     lolClient.destroy();
// });

// var arr = ["biubiupiu"]
// lolClient.getSummonersByName('kr', arr, function(err, data) {
//     console.log("Found ", data);
//     lolClient.destroy();
// });

var arr = ["50890124"];
const id = '50890124';
// console.log(getRecentGamesForSummoner(id))

// async function getRecentGamesForSummoner(id){
//     try {
//         return await lolClient.getRecentGamesForSummoner('kr', id);
//     } catch (error) {
//         throw error;
//     }
// }

// app.get('/',function(req,res,next){
//     res.send("sad")
//     next
// })

// app.listen(8080,'localhost',function(){
//     console.log('server has running')
// })