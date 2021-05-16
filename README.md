# M3-FeelingCryptos-API

## Description

This is a web application that shows crypto currency market in real time and relates each of them with the analized sentiments, through the social opinion extracted from Twitter and news feeds. Suggesting the best moments to sell and buy.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.
-  **Signup:** As an anon I can sign up in the platform so that I can start adding cryptos as favorites and get notifications.
-  **Login:** As a user I can login to the platform so that I can check my profile, my favorites cryptos and manage my subscriptions.
-  **Logout:** As a user I can logout from the platform so no one else can use it.
- **Recover:** As a user I can recover the password of my account.
-  **Market details Page** As a anon/user I can check any market and feeds related to that one. As well as, see investments suggestions. 
-  **Profile Market Page** As a user I can check one of my favorite markets detail.
-  **Profile Feed Page** As a user I can see the feed related to my favorites markets.
-  **Edit Profile Page** As a user I can edit my profile as well as manage my subscriptions and favorite cryptos.


## Backlog
- Add news as a feed
- Add dark theme



# Client / Frontend

## React Router Routes (React App)
| Path                      | Component            | Permissions                 | Behavior         |
| ------------------------- | -------------------- | --------------------------- | ---------------- |
| `/:market`| MarketDetailPage (home) | public `<Route>`  | Shows markets list, details and feeds related to one market|
| `/signup` | SignupPage              | anon only  `<AnonRoute>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`  | LoginPage               | anon only `<AnonRoute>`     | Login form, link to signup, navigate to homepage after login |
| `/recover`| RecoverPassPage| anon only  `<AnonRoute>`  | Recover Password form, link to login, navigate to homepage after recover |
| `/private/feed` | ProfileFeedPage      | user only `<PrivateRoute>`  | Shows feed related to users favorites markets|
| `/private/:market`| ProfileMarketPage | user only  `<PrivateRoute>`| Shows favorites markets list, details related to selected market |
| `/private/edit` | EditProfilePage    | user only `<PrivateRoute>`  | Edit users profile|



## Components

- Navbar

- MarketDetailPage
  - MarketList
  - MarketChart
  - MarketFeed

- SignupPage
  - Form

- LoginPage
  - Form

- RecoverPassPage
  - Form

- ProfileFeedPage
  - Sidebar
  - Feed
  
- ProfileMarketPage
  - Sidebar
  - MarketList
  - MarketChart

- EditProfilePage
  - Form
  - FavMarketList


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.getUser()
  - auth.recover(user)

- Profile Service
  - profie.edit(user_email)
  - profile.delete(user_email)

- Binance Service
  - binance.getMarketDetails(market)

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
  image: { type: string, default: "https://res.cloudinary.com/dkevcmz3i/image/upload/v1619125766/Service-Wall/user_avatar_xyyphc.png" },
  google_id: { type: String },
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
| POST        | `/api/auth/login`  | {username, password}  |       200       |     500     | Checks if fields not empty (400), if user exists (401), and if password matches (401), then stores user in session           |
| POST        | `/api/auth/logout`     | (empty)           | 200            |              | Logs out the user         |
| PUT         | `/api/auth/edit`    | {email}           | 200            | 500          | Edits an user   |
| GET         | `/api/auth/profile`| Saved session   | 200    | 403   | Check if user is logged in and return ProfileMarketPage |
| POST        | `/api/auth/delete`  | {email}           | 200            | 500          | Deletes an user   |
| POST        | `/api/auth/recover`    | {email, password} | 200            |              | Recovers users password   |
| POST        | `/api/twitter/recentTweets`    | {body} | 200            |              | Call twitter API for recent tweets with query params passed in body   |


## Links

### Trello/Kanban
[Link to your trello board](https://trello.com/b/Yi0KGJxy/m3-feelingcryptos) 

### Git
[Client repository Link](https://github.com/Silinde87/M3-FeelingCryptos-Client)

[Server repository Link](https://github.com/TaiaMakh/M3-FeelingCryptos-API)

[Deployed App Link]()

### Slides
[Slides Link]()
