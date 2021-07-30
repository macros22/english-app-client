import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React from "react";

export default function Home() {

  React.useEffect(() => {

    let url = new URL('http://localhost:5000/');
    url.searchParams.set('limit', '10');
    url.searchParams.set('page', '50');
// 'http://localhost:3000/?limit=10&page=50'

    (async function () {
        const response = await fetch(url.href);
        const data = await response.json();
        console.log(data.length);
    })();
  }, [])

  return (
  <div>
    
  </div>
  )
}
