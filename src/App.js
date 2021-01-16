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
      <div className="container">
        <div className="grid">
          {data.posts.items.map((post) => (
            <div className="aspect-ratio-box" key={post.id}>
              <img src={`${API_URL}${post.thumbnail}`} alt={post.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
