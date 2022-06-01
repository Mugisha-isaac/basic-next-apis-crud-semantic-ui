import Head from "next/head";
import { Navbar } from "./Navbar";


export const Layout = ({children})=>{
    <>
      <Head>
          <title>Task app</title>
      </Head>
      <Navbar />
      {children}
    </>
}