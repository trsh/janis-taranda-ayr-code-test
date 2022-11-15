# Gettings started

1) `cd api`
2) `npm i`
3) `npm run start:dev`
4) Close with ctr+c
5) `npm run migrate:up`
6) Again `npm run start:dev`
7) Open 2nd shell
8) `cd client`
9) `npm i`
10) `npm run start`
11) Browser should open and enjoy :)

# Some comments

This is not meant to reflect a real end product. I did as far as I could with limited (unpaid) hometaks time frame. 

Its missing on backend:

1) Deploy strategy (test, pre-prod, prod)
2) Logging strategy
3) Stronger structure
4) More comments
5) Proper DB creation with migrations
6) Real database
7) Lots of error handling
9) Refractoring for namings
10) Tests (unit and beyond)
11) Specialized eslint
12) Proper instruction in Readme
13) Some things I quoted with "NOTE" in code comments
14) Cealing up of unused stuff
15) Improve the parser with real data as example
16) Optimizations and many more

Its missing on fronend:

1) Typescript
2) Strong project structure
3) Sass instead of pure css
4) Deploy strategy (test, pre-prod, prod)
5) More comments
6) Better error handling
7) Refractoring for namings
8) Proper instruction in Readme
9) Some things I quoted with "NOTE" in code comments
10) Cealing up of unused stuff
11) Redux for state managment?
12) Optimizations and many more

I did not use original backed boilerplate as it was allowed per description. I hope it's ok. Raw JS with express on backend is a bit dangerous.
I developed the parser relaying that the injest has very strong structure. So it was for most part Regex. As I saw one misspeled Terpene 'carophyllene', I wanted to have something more advanced for that part and added a tiny NLP library and common terpene names in database, and used that to extract the information. 

I did not give much effort to make the frontend look good, because its time consuming and mostly a job for a UIX artist.