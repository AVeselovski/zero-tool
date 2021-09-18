This is project management tool (simplified trello clone), built with [Next.js](https://nextjs.org/).

## Developing

### Setting up:

Get the connection string of your MongoDB server. In the case of MongoDB Atlas, it should be a string like this:

```
mongodb+srv://<username>:<password>@my-project-abc123.mongodb.net/zero-tool?retryWrites=true&w=majority
```

Then copy the .env.local.example file in project root to .env.local and assign the correct connection string.

### Running development server:

```bash
yarn install
yarn dev

# or

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Deployment

This repo master branch is connected to Vercel and deploys automatically on push. Visit [Vercel](https://vercel.com) for more information and instructions.
