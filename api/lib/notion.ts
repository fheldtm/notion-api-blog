import { Client } from '@notionhq/client';
import dayjs from 'dayjs';

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

/**
 * 게시글 조회하기
 */
const mainArticleUid = '0e65d869b0f0441084e798aa9246e6c4'; // 블로그 게시판
export const getArticles = async () => {
  /**
   * notion의 블로그 글 데이터베이스에서 글 목록을 조회
   */
  const articles = await getDatabase(mainArticleUid);

  /**
   * 해당 목록을 생성일(created_at)을 기준으로 정렬
   */
  articles.results.sort((a: any, b: any) => {
    return (
      dayjs(b.properties.created_at.date.start).toDate().getTime() -
      dayjs(a.properties.created_at.date.start).toDate().getTime()
    );
  });

  /**
   * 필요한 정보(id, created_at, title)만 추출
   */
  const newArticles = articles.results
    .filter((article: any) => {
      /**
       * 올바른 properties가 전부 들어있는지 확인
       */
      return (
        article.properties?.category?.select?.name &&
        article.properties?.created_at?.date?.start &&
        article.properties?.title?.title?.[0]?.plain_text
      );
    })
    .filter((article: any) => {
      /**
       * 게시글 노출 여부 확인
       */
      return article.properties?.exposure?.select?.name === '노출';
    })
    .map((article: any) => {
      /**
       * 필요한 정보 가져오기
       */
      return {
        id: article.id,
        category: article.properties.category.select.name,
        created_at: article.properties.created_at.date.start,
        title: article.properties.title.title[0].plain_text,
      };
    });

  return newArticles;
};

export const getPages = async (id: string) => {
  return notion.pages.retrieve({
    page_id: id,
  });
};

export const getBlocks = async (id: string) => {
  return notion.blocks.retrieve({
    block_id: id,
  });
};

export const getChildren = async (id: string) => {
  return notion.blocks.children.list({
    block_id: id,
  });
};

export const getDatabase = async (id: string) => {
  return notion.databases.query({
    database_id: id,
  });
};
