const axios = require('axios');
const cheerio = require('cheerio');

const dotenv = require("dotenv");
dotenv.config();
const Discord = require("discord.js");


var random;
const day = 86400000;
const space = "ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ";
var hadeeth;
var rawi;
var url = "https://dorar.net/hadith/sharh/1";


function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }


async function gettin(c){
   
            try{
            console.log(c);

            url = url.split('/');
            url[url.length-1] = c;
            url = url.join('/');
            console.log(url);
            
            
            let response =  await axios(url);
            let $ = cheerio.load(response.data);
            
            hadeeth = $('.h5-responsive');
            hadeeth = hadeeth.text()
            hadeeth =`**${hadeeth}**`;
            // console.log(hadeeth);
            
            rawi = $('.d-block');
            rawi = rawi.text();
            rawi = rawi.replace(/(\r\n|\n|\r)/gm, ""); //discard the newline and others
            rawi =`**${rawi}**`;
            // console.log(rawi);
            
        } catch(err) {
            
            console.log(err);
        }
    }
    
    const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
    
    
    client.once("ready", () =>{
        
    console.log("m6ow3 is online");
    const chanel = client.channels.cache.find(chanel => chanel.id === '889557121375543336');
        
        async function send(i){

                try{
                    await gettin(i);
                    console.log(hadeeth);
                    var msg = `\n\n ${hadeeth} \n\n ${space} \n ${rawi} \n\n `;
                    chanel.send(msg);
                    // chanel.send(' ــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــــ');
                    // chanel.send('\n'+rawi+'\n');
                } catch (err){
                    console.log(err);
                }
        }
        

        setInterval(() => {
            random = Math.floor(Math.random() * 7000*Math.random());

            if(random == 0 || random == 7 || random ==9 || random < 1){}

             else  send(random);
        }, 30000);
        
});

if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const token = process.env.TOKEN;
client.login(token);
