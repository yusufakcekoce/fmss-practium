const axios = require("axios");

async function getData() {
  let id = 1;
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    const userData = response.data;

    const responsePosts = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?id=${id}`
    );
    const postData = responsePosts.data;

    let newData = Object.assign(userData, { posts: postData });
    console.log(newData);
  } catch (error) {
    console.error(error);
  }
}
getData();
