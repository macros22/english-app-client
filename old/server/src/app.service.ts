import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  getHello(limit: number, page: number): string {

    let newArr= [];


    // Reading file with words.
    const data = fs.readFileSync(path.resolve(__dirname, '../', 'words.txt'));

    // Split strings to array
    let arr = data.toString().split('\r\n');
    const allWordsCount = arr.length;
    const symbol = '-';
    newArr = arr.map((str) => {
          // while(str.indexOf(symbol) > 0){
          //   str = str.replace(symbol, '=');
          // }
         return str.split(symbol);
      });

    const wordsList = [];
    const startIndex: number = limit*(page-1);
    const endIndex: number = startIndex + (+limit); ///??? +limit

    // Checking boundaries of request.
    if((endIndex > allWordsCount)) {
        return JSON.stringify({
            allWordsCount,
            words: newArr.slice(allWordsCount-limit, allWordsCount)
          })
    }else if(startIndex < 0) {
      return JSON.stringify({
        allWordsCount,
        words: newArr.slice(0, limit)
      })
    }

    //console.table(newArr[limit*page]);

    return JSON.stringify({
      allWordsCount,
      words: newArr.slice(startIndex, endIndex)
    })
  }
}
