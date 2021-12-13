# Discover Twitter Spaces

[Discover Twitter Spaces](discover-twitter-spaces.vercel.app/) is a tool that helps you find the Twitter Spaces. We use data from Twitter to find the Twitter Spaces.

The api endpoint for [Discover Twitter Spaces](discover-twitter-spaces.vercel.app/) is [Spaces](https://discover-twitter-spaces.vercel.app/api/spaces.json), pass Query param to the endpoint for data of different spaces.

`https://discover-twitter-spaces.vercel.app/api/spaces.json?search=bitcoin`

This application is built using [Sveltekit](https://kit.svelte.dev/docs) and [Svelte](https://svelte.dev/).

The total size of the application is way less when you build the application with [Sveltekit](https://kit.svelte.dev/docs) compared to other frameworks like [React](https://reactjs.org/) / [NextJS](https://nextjs.org/) or [Vue](https://vuejs.org/).

This project is inspired by the similar project [find twitter spaces](https://github.com/Rakhisharma/find-twitter-space) made by [@abtrakhi](https://twitter.com/atbrakhi). That project is built using [React](https://reactjs.org/).

## :paperclip: Menu

- :bulb: [Tech Stack](#bulb-tech-stack)
- :hammer: [Project Setup](#hammer-project-setup)
- :bug: [Known Bugs](https://github.com/navneetsharmaui/discover-twitter-spaces/issues)

## :100: :fire: Project LightHouse Report

***This web application has 100% lighthouse score.***

![Screenshot from 2021-12-13 11-24-29](https://user-images.githubusercontent.com/11630812/145759828-5ba3b7ea-acc7-4f37-a998-03db69a7bba5.png)

## :bulb: Tech Stack

- Svelte and Sveltekit.
- TypeScript.
- Tailwindcss.
- Postcss.
- Twitter API.

## :hammer: Project Setup

1. `git clone https://github.com/navneetsharmaui/discover-twitter-spaces.git`.
2. `yarn install`.
3. `Setup the environment variables in the *.env* file and take reference of *.env.example* file for the fields to be used`.
4. `yarn run dev`.
5. `yarn run build:vercel`.
6. `yarn run preview`.
7. The twitter API code is in the `src/routes/api/spaces/index.json.ts` file.
8. The Sveltekit project is built using `sveltekit vercel adapter` as the application us deployed on the Vercel.

## 💫 License

- Code and Contributions have **MIT License**

*Copyright (c) 2021 [Navneet Sharma](http://github.com/navneetsharmaui) ([@asnavneetsharma](https://twitter.com/asnavneetsharma))*
