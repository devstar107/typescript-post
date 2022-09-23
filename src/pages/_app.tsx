import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/globals.css';

const TestTaskApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Next.js - Form Validation Example</title>

        {/* eslint-disable-next-line @next/next/no-css-tags */}
        
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default TestTaskApp;
