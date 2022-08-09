import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Head from 'next/head';
import Link from 'next/link';
import { IArticle, IArticleFields, IHomepage, IHomepageFields } from '../@types/contentful';
import client from '../contentful/intex';
import { Container, Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';

const Home = ({ homepage, articles }: { homepage: IHomepage; articles: IArticle[] }) => {
  console.log(homepage);
  return (
    <div>
      <Head>
        <title>Next Blog</title>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_FAVICON}/favicon.ico`} />
      </Head>

      <main>
        <div
          className="text-left p-5 text-white"
          style={{
            background: `url("http:${homepage.fields.background?.fields.file.url}") no-repeat center / cover`,
            minHeight: 300,
          }}
        >
          {/* Тайтл берется из CMS */}
          <h1 className="mt-5">{homepage.fields.title}</h1>
          {/* Для рендера рич текста из контентфул(он имеет специальный тип Document) используется отдельный npm пакет */}
          {/* ! - что бы TS не жаловался на undefind */}
          <div className="mb-5">{documentToReactComponents(homepage.fields.description!)}</div>
        </div>
        <Container className="pt-5">
          <Row>
            {articles.map(arcticle => {
              return (
                <Col sm={4} key={arcticle.fields.slug}>
                  <Card body>
                    <CardTitle tag="h3" className="text-center">
                      {arcticle.fields.title}
                    </CardTitle>
                    <CardText className="text-left">{arcticle.fields.description}</CardText>
                    <Link href={`/articles/${arcticle.fields.slug}`} passHref>
                      <Button>{arcticle.fields.action}</Button>
                    </Link>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </main>
    </div>
  );
};

export default Home;

// для статической генерации html из js - выполняется на стадии билда, выполняется до генерации страницы, генерирует index.html в .next/server/pages/index.html
export const getStaticProps: GetStaticProps = async () => {
  // Позволяет передать query - объект определенного типа, у которого указать набор параметров, по которому запрашивать контент-тайпы
  const homepage = await client.getEntries<IHomepageFields>({
    // берется в разделе инфо homepage в contentfull limit, items можно получить через console.log(homepage); и посмотрев что там внутри
    content_type: 'homepage',
    limit: 1,
  });
  // Первый элемент массива items в массиве homePage
  const [homePage] = homepage.items;

  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: 'article',
    // Что бы не отображать не нужные поля на главной странице, выбираем какие поля нам нужны
    select: 'fields.title,fields.slug,fields.description,fields.action',
  });
  return {
    props: {
      homepage: homePage,
      articles: articleEntries.items,
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
