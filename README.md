# M3-FeelingCrypto - API

## How it looks

🔗 [Live Demo](https://feeling-crypto.herokuapp.com/)

<a href="https://raw.githubusercontent.com/Silinde87/repo-media/main/images/FeelingCrypto-screen3.png" target="_blank">
<img src="https://raw.githubusercontent.com/Silinde87/repo-media/main/images/FeelingCrypto-screen3.png" width="288px" height="153px">
</a>
<a href="https://raw.githubusercontent.com/Silinde87/repo-media/main/images/FeelingCrypto-screen1.png" target="_blank">
<img src="https://raw.githubusercontent.com/Silinde87/repo-media/main/images/FeelingCrypto-screen1.png" width="288px" height="153px">
</a>

## Description

This is a web application that shows crypto currency market in real time and relates each of them with the analized sentiments, through the social opinion extracted from Twitter feed. Suggesting the best moments to sell and buy.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anon I can sign up in the platform so that I can start adding cryptos as favorites and get notifications.
-  **Login:** As a user I can login to the platform so that I can check my profile, my favorites cryptos and manage my subscriptions.
-  **Logout:** As a user I can logout from the platform so no one else can use it.
-  **Market details Page** As a anon/user I can check any market and feeds related to that one. As well as, see investments suggestions. 
-  **Profile Market Page** As a user I can check one of my favorite markets detail.
-  **Profile Feed Page** As a user I can see the feed related to my favorites markets.
-  **Edit Profile Page** As a user I can edit my profile as well as manage my subscriptions and favorite cryptos.


## Backlog
- Add news as a feed
- Add dark theme
- Implement add favorites tweets
- Implement recover password
- Retrieve tweets directly from server and shows them in front through filters.



# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions                 | Behavior         |
| ------------------------- | -------------------- | --------------------------- | ---------------- |
| `/:market`| Home | public `<Route>`  | Shows markets list, details and feeds related to one market|
| `/markets/:market`| Home | public `<Route>`  | Shows markets list, details and feeds related to one market|
| `/signup` | Signup            | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`  | Login               | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/private`| Profile | user only  `<PrivateRoute>`| Shows favorites markets list, details related to first favorite market | 
| `/private/feed` | Profile      | user only `<PrivateRoute>`  | Shows feed related to users favorites markets|
| `/private/edit` | Profile    | user only `<PrivateRoute>`  | Edit users profile|
| `/private/:market`| Profile | user only  `<PrivateRoute>`| Shows favorites markets list, details related to selected market |
| `/*`| ErrorPage| public `<Route>`  | Shows 404 error page |



## Components

- Navbar
- AnonRoute
- PrivateRoute
- Credits

- Home
  - MarketsList
    - SearchBar
  - Chart
  - TweetFeed
    - Sentiment
      - SentimentRatio
    - SkeletonCard

- Signup
  - Form
    - FormButton

- Login
  - Form
    - FormButton

- Profile
  - ProfileFeed
    - SideBar
    - TweetFeed
      - Sentiment
        - SentimentRatio
      - SkeletonCard
  - ProfileEdit
    - SideBar
    - Form
      - FormButton
  - WebsocketBinance
    - SideBar
    - Chart
    - MarketListFavorites
      - SearchBar
  
- ErrorPage


## Services

- Auth Service
  - auth.signup(user)
  - auth.login(user)
  - auth.logout()
  - auth.loggedIn()
  - auth.edit(user)
  - auth.twitter()

- Private Service
  - profie.add(data)
  - profile.get()

- Twitter Service
  - twitter.getRecentTweets(params)
  



# Server / Backend

## Models

User model

```javascript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  photo: { type: string, default: "https://res.cloudinary.com/dkevcmz3i/image/upload/v1619125766/Service-Wall/user_avatar_xyyphc.png" },
  twitterId: { type: String },
  favorites_cryptos: [ String ],
  notifications: [ ],
  pinned_feed: [
    {
      id: { type: String, required: true },
      type: { type: String, enum: ['tweet', 'news'], required: true },      
    }
  ]
}
```


## API Endpoints (backend routes)

| HTTP Method |       URL      | Request Body           | Success status | Error Status | Description          |
| ----------- | -------------------- | ---------------------------- | -------------- | ------------ | ---------------- |
| POST        | `/api/auth/signup`   | {username, email, password}|       200       |     500      | Checks if fields not empty (400) and user not exists (400), then create user with encrypted password, and store user in session |
| POST        | `/api/auth/login`  | {email, password}  |       200       |     500     | Checks if fields not empty (400), if user exists (401), and if password matches (401), then stores user in session           |
| POST        | `/api/auth/logout`     | (empty)           | 200            |              | Logs out the user         |
| PUT         | `/api/auth/edit`    | {id, username, email, image}           | 200            | 500          | Edits a user   |
| GET         | `/api/auth/profile`| Saved session   | 200    | 307   | Check if user is logged in and return ProfileMarketPage |
| POST        | `/api/auth/delete`  | {id}           | 200            | 500          | Deletes a user   |
| GET        | `/api/auth/twitter`  |            |             |           | Logs in a user using Twitter Strategy   |
| GET        | `/api/auth/twitter/fail`  |            |             |    401       | Twitter Strategoy Authentication fail route   |
| GET        | `/api/auth/twitter/callback`  |            |             |    401       | Twitter Strategoy Authentication callback route. Redirects to home page if user logs in, redirects to login page if fails.   |
| POST        | `/api/twitter/recentTweets`    | {body} | 200            |              | Call twitter API for recent tweets with query params passed in body   |
| POST        | `/api/private/`  |  {id, favorites_cryptos}  |   200   |    500  | Updates user's favorites cryptos.   |
| GET        | `/api/private/favorites`  |  {id}  |   200   |      | Returns user's favorites cryptos.   |

## Links

### Trello/Kanban
[Link to your trello board](https://trello.com/b/Yi0KGJxy/m3-feelingcryptos) 

### Git
[Client repository Link](https://github.com/Silinde87/M3-FeelingCryptos-Client)

[Server repository Link](https://github.com/TaiaMakh/M3-FeelingCryptos-API)

[Deployed App Link](http://feeling-crypto.herokuapp.com/)

### Slides
[Slides Link](https://prezi.com/p/xpnseyduvuz4/?present=1)
