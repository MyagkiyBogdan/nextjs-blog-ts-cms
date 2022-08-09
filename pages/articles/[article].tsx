import React from 'react';
import { Container } from 'reactstrap';
import { IArticle, IArticleFields } from '../../@types/contentful';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';
import client from '../../contentful/intex';

export default function Article({ article }: { article: IArticle }) {
  return (
    <>
      <Head>
        <title>{article.fields.title}</title>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_FAVICON}/favicon.ico`} />
      </Head>
      <Container>
        <h1 className="py-3">{article.fields.title}</h1>
        <div className="py-2">{documentToReactComponents(article.fields.content)}</div>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: 'article',
    // Что бы не отображать не нужные поля на главной странице, выбираем какие поля нам нужны
    select: 'fields.slug',
  });
  // Возвращаем path/params/динамическаяId - в нашем случае article
  // Но так как у нас path может быть несколько разных элементов делаем через map
  return {
    paths: articleEntries.items.map(item => {
      return {
        params: {
          article: item.fields.slug,
        },
      };
    }),
    fallback: false,
  };
};
// Функция получает аргументом наш article
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params!.article!;
  // Делаем запрос за этой статьей
  const articleEntries = await client.getEntries<IArticleFields>({
    content_type: 'article',
    limit: 1,
    'fields.slug': slug,
  });
  // Тут приходит наша статья
  const [article] = articleEntries.items;
  // Возвращаем её как пропс
  return {
    props: {
      article,
    },
  };
};
