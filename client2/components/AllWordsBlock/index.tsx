import React from 'react';
import WordsTable from './WordsTable';

 type fetchObj = {
  allWordsCount: number,
   words: Array<Array<string>>,

 }

function AllWordsBlock(){
  React.useEffect(() => {

    let url = new URL('http://localhost:5000/');
    url.searchParams.set('limit', '10');
    url.searchParams.set('page', '30');
// 'http://localhost:3000/?limit=10&page=50'

    (async function () {
      const response = await fetch(url.href);
      const data: fetchObj = await response.json();
      console.log(data);
    })();
  }, [])

  return (
    <>
      <WordsTable/>
      </>
  );
}

export default AllWordsBlock;
