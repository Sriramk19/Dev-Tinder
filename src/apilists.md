DEV Tinder APi's

## Autrouter:

- POST /signup
- POST /login
- POST /logout

## ProfileRouter:

- GET /profile/view
- PATCH /profile/edit
- PATCH / profile/password

## connctionRequestRouter:

- Post /request/send/:status/:userId
- Post /request/review/:status/:requestId

## userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets the profiles of other users of the paltform

Status: intrested,ignore, accepted, rejected
