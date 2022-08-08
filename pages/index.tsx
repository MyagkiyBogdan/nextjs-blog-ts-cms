import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import client from '../contentful/intex';

const Home = ({ homepage }: { homepage: any }) => {
  console.log(homepage);
  return (
    <div>
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Тайтл берется из CMS */}
        <h1>{homepage.fields.title}</h1>
      </main>
    </div>
  );
};

export default Home;

// для статической генерации html из js - выполняется на стадии билда, выполняется до генерации страницы, генерирует index.html в .next/server/pages/index.html
export const getStaticProps: GetStaticProps = async () => {
  // Позволяет передать query - объект определенного типа, у которого указать набор параметров, по которому запрашивать контент-тайпы
  const homepage = await client.getEntries({
    // берется в разделе инфо homepage в contentfull limit, items можно получить через console.log(homepage); и посмотрев что там внутри
    content_type: 'homepage',
    limit: 1,
  });
  // Первый элемент массива items в массиве homePage
  const [homePage] = homepage.items;
  return {
    props: {
      homepage: homePage,
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
