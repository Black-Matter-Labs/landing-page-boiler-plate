import { useEffect } from 'react'
import '../styles/globals.css'
import { hotjar } from 'react-hotjar'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // TODO: add hotjar IDs
    hotjar.initialize(2208646, 6)
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
