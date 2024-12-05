# CS 6750 Team Project

## Final Prototype

### Team Members

- [Chen, Ting-Yu](https://github.com/7ingyu)
- [Han, Wendy D](https://github.com/ChewyChewingston)
- [Lacy, Kalika](https://github.com/kqlacy)
- [Yee, Jennifer](https://github.com/chocolateleche)

### Prerequisites:
- [Node v.22.11.0](https://nodejs.org)
- [Postgres 14+](https://www.postgresql.org/download/)

### Instructions

**To setup the repo:**
- In the `server` folder:
  - Copy the `.env.example` and rename to `.env`
  - Replace any variable values in the new `.env` file with the values for your Postgres database
- Make sure your terminal is in the main project folder and NOT `server` or `client` then run the following commands:
  - If you don't already have yarn installed:`npm install yarn -g`
  - `yarn install`
  - `yarn run setup`
- To run in production mode: `yarn run build && yarn run start`
- For development, you will need two concurrent terminals, one for the server and one for the client

**To start the server for development:**
- Make a new database that matches the database name in your `.env` file.
- `cd server`
- `yarn install`
- `yarn run setup`
- `yarn run dev`

**To start the frontend for development:**
- `cd client`
- `yarn install`
- `yarn run dev`
- Open a browser window at the indicated url, usually [https://localhost:5432](https://localhost:5432)
- Frontend components are in the `src` folder. Try editing `App.tsx` to see changes reflected in the browser.
  - With hot module reloading, you should not need to refresh your browser window to see changes.

### Features
- Tag creation
- Tag deletion
- Tag name and description edits
- Adding multiple tags to a single book
- Removing multiple books from a single tag
- Adding multiple tags to multiple books
- Filtering of tags by type
- Sorting of tags by name, age, size, and recent activity
- Filtering of books within tags to only display books with selected multiple tags

### Future Implementations
- Subtags
- Mass adding/deleting of tags
- Nested tree-style tagging system
