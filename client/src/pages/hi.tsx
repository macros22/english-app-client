import type { NextPage } from 'next'
import React from 'react'

//@ts-ignore
import cookieCutter from 'cookie-cutter'

const Home: NextPage = () => {
  const loginData = {
  email: "j@j.com",
	password: "111",
}
  const login = async () => {
    let response = await fetch("http://localhost:3146/api/auth/login", {
      method: "POST",
      // credentials: 'same-origin',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"

      },
      body: JSON.stringify(loginData),
    });
    console.log((response));
    console.log( document.cookie )
    // console.log(cookieCutter.get('Authorization'))

  }

  React.useEffect(() => {
   login();
  }, []);
  
  return (
    <div >
  sdfsdf
    </div>
  )
}

export default Home
