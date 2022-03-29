import Head from 'next/head';
import { FC } from 'react';
import { Navbar } from '../ui';

interface Props {
  title: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name='author' content='Pokemon App' />
        <meta name='description' content='lorem ipsum' />
        <meta name='keywords' content='Pokemon, App' />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
