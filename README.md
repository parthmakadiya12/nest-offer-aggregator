Notes:
- keeping the comments as it is.
- external api. I am not creating types for it considering the time limit
- I have not used env variables . it would be nice to have.
- created a docker file that will create mysql db. (can use anything. there is not any design decision made on selecting this db)
- haven't created stories. Usually i do create story and do commits story by story.

Features:
- we have post api that will trigger api call from various providers.
- ideally i would choose cron job that will run and update the new offers from 3rd party provider
- I have used Rest Post api because we can play with it.
- have client factory and clients for better scalablity of the app.
- i can still feel the code quality can be improved at some places.
- added unit test coverage as much as possible . (still can add more considering time I have not added more coverage)
```
curl --location --request POST 'http://localhost:3000/offers/process-offers'
```