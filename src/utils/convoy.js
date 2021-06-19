export default function convoy(url, { query, headers }) {
  return fetch(
    `https://instagram-data1.p.rapidapi.com/${url}` +
      new URLSearchParams(query),
    { headers }
  ).then((res) => res.json());
}
