const MAX = 128;
var command = [MAX];
var num = 0;
var curl = 0;


// ユーザからのキーボード入力を取得するPromiseを生成する
function readUserInput(question) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
  
    return new Promise((resolve, reject) => {
        readline.question(question, (answer) => {
        resolve(answer);
        readline.close();
        });
    });
}

// メイン処理
(async function main() {

    // 入力されたコマンドを分割する
    var tagetString = await readUserInput('curl ');
    var separatorString = /\s+/;
    var arrayStrig = tagetString.split(separatorString);
        
    // 何分割されたか計算する
    while(num < MAX){
        if(arrayStrig[num] == undefined){
            break;
        }
        num++;
    }


    // 入力されたコマンドを判別する
    for(var i=0; i < num; i++ ){
        if(arrayStrig[i].startsWith('http') == true){
            command[0] = arrayStrig[i];
        }
        if(arrayStrig[i] == '-X'){
            command[1] = arrayStrig[i];
        }
        if(arrayStrig[i] == 'POST'){
            command[2] = arrayStrig[i];
        }
        if(arrayStrig[i] == '-d'){
            command[3] = arrayStrig[i];
        }
        if(arrayStrig[i].startsWith('"') == true && arrayStrig[i].endsWith('"') == true ){
            command[4] = arrayStrig[i];
        }
        if(arrayStrig[i] == '-v'){
            command[5] = arrayStrig[i];
        }
        if(arrayStrig[i] =='-o'){
            command[6] = arrayStrig[i];
        }
        if(command[6] == '-o' && arrayStrig[i] != undefined){
            command[7] = arrayStrig[i];    
        }
    }


    if(command[0].startsWith('http') == true && command[5] == undefined){
        
        if(command[6] == undefined && command[2] == undefined){
            
            curl = 1;
        }
    }
    if(command[0].startsWith('http') == true && command[7] != undefined){
        
        curl = 2;
    }
    if(command[0].startsWith('http') == true && command[5] == '-v'){
       
        curl = 3;
    }
    if(command[0].startsWith('http') == true && command[1] == '-X'){            
        if(command[2] == 'POST' && command[3] == undefined){
            
            curl = 4;
        }
        else if(command[2] == 'POST' && command[4].startsWith('"') == true){
            
            curl = 5;
        }
    }
    
    // curlの種類別に処理を行う
    switch(curl) {
        case 1 :
            // curl http の処理
            break;
        case 2 :
            // curl -o http file　の処理
            break;
        case 3 :
             // curl -v http の処理
            break;
        case 4 :
            //curl http -X POSTの処理
            break;
        case 5 :
            // curl -X POST -d "" の処理
            break;

    }
    
})(); 