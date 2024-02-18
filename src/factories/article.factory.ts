import { AddArticleModel } from '../models/article.model';
import { faker } from '@faker-js/faker/locale/pl';

export default function randomNewArticle(): AddArticleModel {
  const title = faker.lorem.sentence({ min: 3, max: 5 });
  const body = faker.lorem.paragraphs(5);

  const newArticle: AddArticleModel = { title: title, body: body };

  return newArticle;
}
