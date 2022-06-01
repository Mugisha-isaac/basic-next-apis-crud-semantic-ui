import 'semantic-ui-css/semantic.min.css'
import  Layout  from '../components/Layout'


function MyApp({ Component, pageProps }) {
  return(
    // <Component {...pageProps} />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
