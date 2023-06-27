import IChapter from "./chapter.type";

export default interface INovel {
  _id?: any | null,
  author_id?: any | null,
  datetime?: string,
  title?: string,
  slug?: string,
  description?: string,
  chapters?: IChapter[],
}