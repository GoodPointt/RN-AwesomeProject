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
          location: {
            name: "Frarnce",
            coord: {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
          },
          likes: 101,
          comments: [
            {
              id: "1",
              date: "09 june, 2020 | 08:40",
              author: {
                name: "Anna",
                avatar:
                  "https://assets.bizjournals.com/static/img/potm/marketing/team-success-img.jpg",
              },
              comment:
                "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
            },
            {
              id: "2",
              date: "09 june, 2020 | 09:14",
              author: {
                name: "Jhon",
                avatar:
                  "https://www.shoppingcentreawards.com/wp-content/uploads/2015/06/people-img7.jpg",
              },
              comment:
                "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.!",
            },
            {
              id: "3",
              date: "09 june, 2020 | 11:40",
              author: {
                name: "Tony",
                avatar:
                  "https://st4.depositphotos.com/1729220/26823/i/450/depositphotos_268235000-stock-photo-tobey-maguire-inside-for-kids.jpg",
              },
              comment: "Thank you! That was very helpful!",
            },
          ],
        },
        {
          id: "13213121",
          photo:
            "https://voiceamplified.org/wp-content/uploads/2022/03/AdobeStock_476820399-scaled.jpeg",
          name: "Stand with Ukraine",
          location: {
            name: "Ukraine",
            coord: {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
          },
          likes: 123,
          comments: [
            {
              id: "1",
              date: "09 june, 2020 | 08:40",
              author: {
                name: "Anna",
                avatar:
                  "https://assets.bizjournals.com/static/img/potm/marketing/team-success-img.jpg",
              },
              comment:
                "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
            },
            {
              id: "2",
              date: "09 june, 2020 | 09:14",
              author: {
                name: "Jhon",
                avatar:
                  "https://www.shoppingcentreawards.com/wp-content/uploads/2015/06/people-img7.jpg",
              },
              comment:
                "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.!",
            },
            {
              id: "3",
              date: "09 june, 2020 | 11:40",
              author: {
                name: "Tony",
                avatar:
                  "https://st4.depositphotos.com/1729220/26823/i/450/depositphotos_268235000-stock-photo-tobey-maguire-inside-for-kids.jpg",
              },
              comment: "Thank you! That was very helpful!",
            },
          ],
        },
        {
          id: "13213122",
          photo:
            "https://assets.editorial.aetnd.com/uploads/2019/03/topic-london-gettyimages-760251843-feature.jpg",
          name: "Big Ban",
          location: {
            name: "England",
            coord: {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
          },
          likes: 23,
          comments: [
            {
              id: "1",
              date: "09 june, 2020 | 08:40",
              author: {
                name: "Anna",
                avatar:
                  "https://assets.bizjournals.com/static/img/potm/marketing/team-success-img.jpg",
              },
              comment:
                "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
            },
            {
              id: "2",
              date: "09 june, 2020 | 09:14",
              author: {
                name: "Jhon",
                avatar:
                  "https://www.shoppingcentreawards.com/wp-content/uploads/2015/06/people-img7.jpg",
              },
              comment:
                "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.!",
            },
            {
              id: "3",
              date: "09 june, 2020 | 11:40",
              author: {
                name: "Tony",
                avatar:
                  "https://st4.depositphotos.com/1729220/26823/i/450/depositphotos_268235000-stock-photo-tobey-maguire-inside-for-kids.jpg",
              },
              comment: "Thank you! That was very helpful!",
            },
          ],
        },
        {
          id: "13213124",
          photo:
            "https://im.indiatimes.in/content/2022/Feb/Tunnel-Of-Love_62176d7881461.jpg?w=820&h=540&cc=1",
          name: "Tunel of love",
          location: {
            name: "Ukraine",
            coord: {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
          },
          likes: 450,
          comments: [
            {
              id: "1",
              date: "09 june, 2020 | 08:40",
              author: {
                name: "Anna",
                avatar:
                  "https://assets.bizjournals.com/static/img/potm/marketing/team-success-img.jpg",
              },
              comment:
                "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
            },
            {
              id: "2",
              date: "09 june, 2020 | 09:14",
              author: {
                name: "Jhon",
                avatar:
                  "https://www.shoppingcentreawards.com/wp-content/uploads/2015/06/people-img7.jpg",
              },
              comment:
                "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.!",
            },
            {
              id: "3",
              date: "09 june, 2020 | 11:40",
              author: {
                name: "Tony",
                avatar:
                  "https://st4.depositphotos.com/1729220/26823/i/450/depositphotos_268235000-stock-photo-tobey-maguire-inside-for-kids.jpg",
              },
              comment: "Thank you! That was very helpful!",
            },
          ],
        },
        {
          id: "13213125",
          photo:
            "https://image.arrivalguides.com/500x500/09/1dd23cc06c31c31ba7df72f2c74db5bc.jpg",
          name: "Red bus",
          location: {
            name: "England",
            coord: {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
          },
          likes: 120,
          comments: [
            {
              id: "1",
              date: "09 june, 2020 | 08:40",
              author: {
                name: "Anna",
                avatar:
                  "https://assets.bizjournals.com/static/img/potm/marketing/team-success-img.jpg",
              },
              comment:
                "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
            },
            {
              id: "2",
              date: "09 june, 2020 | 09:14",
              author: {
                name: "Jhon",
                avatar:
                  "https://www.shoppingcentreawards.com/wp-content/uploads/2015/06/people-img7.jpg",
              },
              comment:
                "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.!",
            },
            {
              id: "3",
              date: "09 june, 2020 | 11:40",
              author: {
                name: "Tony",
                avatar:
                  "https://st4.depositphotos.com/1729220/26823/i/450/depositphotos_268235000-stock-photo-tobey-maguire-inside-for-kids.jpg",
              },
              comment: "Thank you! That was very helpful!",
            },
          ],
        },
        {
          id: "13213126",
          photo:
            "https://theculturetrip.com/wp-content/uploads/2017/10/_-_-2.jpg",
          name: "Natural wonder",
          location: {
            name: "Ukraine",
            coord: {
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
          },
          likes: 333,
          comments: [
            {
              id: "1",
              date: "09 june, 2020 | 08:40",
              author: {
                name: "Anna",
                avatar:
                  "https://assets.bizjournals.com/static/img/potm/marketing/team-success-img.jpg",
              },
              comment:
                "Really love your most recent photo. I’ve been trying to capture the same thing for a few months and would love some tips!",
            },
            {
              id: "2",
              date: "09 june, 2020 | 09:14",
              author: {
                name: "Jhon",
                avatar:
                  "https://www.shoppingcentreawards.com/wp-content/uploads/2015/06/people-img7.jpg",
              },
              comment:
                "A fast 50mm like f1.8 would help with the bokeh. I’ve been using primes as they tend to get a bit sharper images.!",
            },
            {
              id: "3",
              date: "09 june, 2020 | 11:40",
              author: {
                name: "Tony",
                avatar:
                  "https://st4.depositphotos.com/1729220/26823/i/450/depositphotos_268235000-stock-photo-tobey-maguire-inside-for-kids.jpg",
              },
              comment: "Thank you! That was very helpful!",
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
