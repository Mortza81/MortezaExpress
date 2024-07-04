import { Query } from "./types";
export default function extractQueryParams(path: string): Query {
  const parsedUrl = new URL(path);
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

console.log(
  extractQueryParams(
    "https://example.com/path/to/resource?param1=value1,value2&param2=value2&param1=value3"
  )
);
