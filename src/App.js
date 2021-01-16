import { useQuery, gql } from "@apollo/client";
import "./App.css";

const API_URL = "https://uwatch.live";
const input = { type: "post", locale: "en", projectId: "1" };

const GET_POST_LIST = gql`
  query getPostList($input: PostSearchType) {
    posts(input: $input, paging: { limit: 12 }) {
      items {
        id
        type
        locale
        shortDescription
        fullUrl
        thumbnail
        tags
        title
        publishedAt
        __typename
      }
      __typename
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GET_POST_LIST, {
    variables: { input },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="App">
      {data.posts.items.map((item) => (
        <div key={item.id}>
          <img src={`${API_URL}${item.thumbnail}`} alt={item.title} />
        </div>
      ))}
    </div>
  );
}

export default App;
