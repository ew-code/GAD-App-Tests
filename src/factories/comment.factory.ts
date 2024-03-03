import { AddCommentModel } from '../models/comment.model';
import { faker } from '@faker-js/faker/locale/pl';

export default function prepareRandomComment(
  bodySentences = 5,
): AddCommentModel {
  const body = faker.lorem.sentences(bodySentences);
  const newComment: AddCommentModel = { body: body };
  return newComment;
}
