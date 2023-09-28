## Raccoon Hats
<div align="center">
  Built with ❤️ for Belvo's Technical Test
</div>

## Development Guide
This project was created as a [TurboRepo](https://turbo.build/), using [pnpm](https://pnpm.io/) as it's package manager (because it's amazingly fast and very easy to use). Both frontend and backend are inside apps/ folder.

### Front End
The frontend project was built using [Next.js 13](https://nextjs.org/blog/next-13). I'm styling my components using solely [TailwindCSS](https://tailwindcss.com/) and a few lines of regular CSS. There isn't much to the Tailwind configuration (tailwind.config.js) except for a few custom colors and shadows.

### Back End
The backend project was built using [NestJS](https://nestjs.com/), it's a very simple application with a basic CRUD, I took the freedom of adding a few custom validation rules. Images are being hosted on Cloudinary, so you do need  to have an API_KEY and API_SECRET which I'll provide within the .env file required to run the project. 

### How to start the project
* Open your terminal, change into the root directory and type out

```bash
pnpm i
```

* Run the development command

```bash
pnpm dev
```

This will start both frontend and backend applications for you, after ready, you can go and open up http://localhost:3000 on your favorite browser and check the website.

## API Docs
If you wanna check out the API documentation, it's built along with the other projects in development mode, you can just go to http://localhost:8000/docs to see all available endpoints.

<b>I hope you like my work 😊</b>