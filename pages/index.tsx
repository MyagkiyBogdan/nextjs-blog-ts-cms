import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import client from '../contentful/intex';

const Home = ({ title }: { title: string }) => {
  return (
    <div>
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{title}</h1>
      </main>
    </div>
  );
};

export default Home;

// для статической генерации html из js - выполняется на стадии билда, выполняется до генерации страницы, генерирует index.html в .next/server/pages/index.html
export const getStaticProps: GetStaticProps = async () => {
  const homepage = client.getEntries({});
  return {
    props: {
      title: 'My new Next.js title',
    },
    // указывает через сколько нужно обновить контент на странице
    revalidate: 3000,
  };
};

// Для сервер сайд рендеринга страницы - выполняется на каждый запрос(перезагрузки), выполняется до генерации страницы НЕ генерирует index.html в .next/server/pages/index.html
// export const getServerSideProps: GetServerSideProps = async () => {
//   return {
//     props: {
//       title: 'Server side render title',
//     },
//   };
// };
