import { Query } from "./types";
export default function extractQueryParams(path: string): Query {
  const url = `https://fakedomain.com${path}`;
  const parsedUrl = new URL(url);
  const queryParams = parsedUrl.searchParams;
  const query: Query = {};

  queryParams.forEach((value, key) => {
    const paramValues = value.split(",");
    if (!query[key]) {
      query[key] = [];
    }
    query[key] = query[key].concat(paramValues);
  });
  return query;
}
