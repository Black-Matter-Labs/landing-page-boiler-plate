This is a Black Matter Labs boiler plate template that has form validation, analytics, and firebase baked in,

## Getting Started

Step 1: Clone the landing page boiler plate repo and run `npm install`
Step 2: Add your firebase config to `/firebase/index.js`  
Step 3: Add your new hotjar IDs to `/pages/app.js`

## Creating the landing page

Step 4: Go to the [Ant Design Editor](https://landing.ant.design/) and design a landing page.  
Step 5: Optimize all design images using this [site](https://imagecompressor.com/) and save them to the firebase bucket. Add the URLs to the ant design editor  
Step 6: Download the components from ant landing editor and dump the files into `/components` in the boilerplate
Step 7: Put the generated `index.js` in the `/pages` folder

## Last Steps

Step 7: Add Email Submit CTA component from `/components/EmailSubmit.js` (This component is meant to house all the firebase and email validation in one place)  
Step 8: Change email subscribe questions in `/components/EmailSubmit.js`  
Step 9: Change the favicon.ico

## Run the project

```bash
npm run dev
```

## Deploy

Add the project as a repo to the [Black Matter Labs Org](https://github.com/Black-Matter-Labs)

Deploy the new org repo into the [Black Matter Labs Vercel Account](https://vercel.com/dashboard)
