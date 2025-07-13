import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import UserContextProvider from './context/userContext'
import CartContextProvider from './context/cartContext'
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div>
        <UserContextProvider>
          <CartContextProvider>
          <Component {...pageProps} />
          </CartContextProvider>
        </UserContextProvider>
      </div>
    )
  }
}
export default MyApp