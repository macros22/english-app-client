import React from 'react';


//https://documentationnerds.com/blog/tech/setup-nextjs-and-materialui-typescript


type fetchObj = {
  allWordsCount: number,
  words: Array<Array<string>>
}

export default function Home() {

  React.useEffect(() => {

    const baseUrl = 'http://localhost:5000/';
    let url = new URL(baseUrl);
    url.searchParams.set('limit', '10');
    url.searchParams.set('page', '30');
// 'http://localhost:5000/?limit=10&page=50'

    // (async function () {
    //     const response = await fetch('http://localhost:5000/?limit=10&page=8');
    //     const data: fetchObj = await response.json();
    //     console.log(data.words);
    // })();
  }, [])

  return (
  <div>
    
  </div>
  )
}
