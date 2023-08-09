import { createContext, useState } from "react";

export const UserContext = createContext();

export const useUserAuth = () => {
  const [users, setUsers] = useState([
    {
      id: "7850123",
      avatar:
        "https://img.freepik.com/free-photo/portrait-dark-skinned-cheerful-woman-with-curly-hair-touches-chin-gently-laughs-happily-enjoys-day-off-feels-happy-enthusiastic-hears-something-positive-wears-casual-blue-turtleneck_273609-43443.jpg",
      login: "Lisa Silkwood",
      email: "keksik450@keksik450.com",
      password: "keksik450@keksik450.com",
      posts: [
        {
          id: "13213123",
          photo:
            "https://images.adsttc.com/media/images/5d44/14fa/284d/d1fd/3a00/003d/large_jpg/eiffel-tower-in-paris-151-medium.jpg?1564742900",
          name: "Eiffel Tower",
          location: "Frarnce",
          likes: 101,
          comments: [
            {
              author: "Anna",
              comment: "Cool!",
            },
            {
              author: "Jhon",
              comment: "Awesome!",
            },
          ],
        },
        {
          id: "13213121",
          photo:
            "https://voiceamplified.org/wp-content/uploads/2022/03/AdobeStock_476820399-scaled.jpeg",
          name: "Stand with Ukraine",
          location: "Ukraine",
          likes: 123,
          comments: [
            {
              author: "Anna",
              comment: "Cool!",
            },
            {
              author: "Jhon",
              comment: "Awesome!",
            },
          ],
        },
        {
          id: "13213122",
          photo:
            "https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg",
          name: "Big Ban",
          location: "England",
          likes: 23,
          comments: [
            {
              author: "Anna",
              comment: "Cool!",
            },
            {
              author: "Jhon",
              comment: "Awesome!",
            },
          ],
        },
        {
          id: "13213124",
          photo:
            "https://im.indiatimes.in/content/2022/Feb/Tunnel-Of-Love_62176d7881461.jpg?w=820&h=540&cc=1",
          name: "Tunel of love",
          location: "Ukraine",
          likes: 450,
          comments: [
            {
              author: "Anna",
              comment: "Cool!",
            },
            {
              author: "Jhon",
              comment: "Awesome!",
            },
          ],
        },
        {
          id: "13213125",
          photo:
            "https://image.arrivalguides.com/500x500/09/1dd23cc06c31c31ba7df72f2c74db5bc.jpg",
          name: "Red bus",
          location: "England",
          likes: 120,
          comments: [
            {
              author: "Anna",
              comment: "Cool!",
            },
            {
              author: "Jhon",
              comment: "Awesome!",
            },
          ],
        },

        {
          id: "13213126",
          photo:
            "https://theculturetrip.com/wp-content/uploads/2017/10/_-_-2.jpg",
          name: "Natural wonder",
          location: "Ukraine",
          likes: 333,
          comments: [
            {
              author: "Anna",
              comment: "Cool!",
            },
            {
              author: "Jhon",
              comment: "Awesome!",
            },
          ],
        },
      ],
    },
  ]);
  const [userId, setUserId] = useState(null);

  return {
    users,
    setUsers,
    userId,
    setUserId,
  };
};
