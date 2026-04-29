# React Harjoituksia

A collection of React learning projects ranging from basics to full-stack applications.

---

## Projects Overview

| Project | Description | Stack |
|---|---|---|
| [alkeet](#alkeet) | React basics demos | React + Vite |
| [leffainfo](#leffainfo) | Movie browser & reviews | React + Node/Express + MySQL (Docker) |
| [notesdemo](#notesdemo) | Notes app with JSON server | React + JSON Server |
| [notesdemo2](#notesdemo2) | Notes app with auth & database | React + Node/Express + MySQL (Docker) |
| [shop](#shop) | E-commerce shop with cart & admin | React + Node/Express + MySQL (Docker) |

---

## Requirements

- [Node.js](https://nodejs.org/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for leffainfo, notesdemo2, shop)
- npm

---

## alkeet

React basics demo showcasing core concepts: components, props, state, lists, forms, and hooks.

**Features:**
- Course info display (toggle show/hide)
- Courses table with data
- Image gallery
- Students list
- Skills list with add functionality
- Friends component
- Link manager with likes

**How to run:**

```bash
cd alkeet
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

**How to use:**
- Click **Piilota/Näytä Tehtävä 1** to toggle course info
- Click **Piilota/Näytä Tehtävä 2** to toggle the courses table
- Click **Piilota/Näytä Ystävät** to toggle the friends section
- Under **Lisää taitoja** type a skill name and click Add
- Under **Lisää Linkki** fill in a URL and description, then click Add — links appear below with a Like button

---

## leffainfo

Full-stack movie browsing and review application.

**Features:**
- Browse a list of movies with cover images
- Filter movies by release year range and genre
- Click a movie to view its reviews
- Add reviews with star ratings
- User registration and login (JWT auth)

**How to run:**

1. **Start the database (Docker):**
   ```bash
   cd leffainfo/database
   docker-compose up -d
   npm install
   npx knex migrate:latest
   npx knex seed:run
   ```

2. **Start the backend:**
   ```bash
   cd leffainfo/backend
   npm install
   npm start
   ```
   Backend runs on [http://localhost:3001](http://localhost:3001)

3. **Start the frontend:**
   ```bash
   cd leffainfo/frontend
   npm install
   npm run dev
   ```
   Frontend runs on [http://localhost:5173](http://localhost:5173)

**How to use:**
- The home page shows all movies
- Use the **Start Year** / **End Year** number inputs to filter by release year
- Type in the **Genre** field to filter by genre (e.g. `horror`, `comedy`)
- Click on a movie poster or title to open its review page
- On the review page you can read and add reviews

---

## notesdemo

Simple notes application backed by a JSON file server.

**Features:**
- View all notes
- Add new notes (with importance flag)
- Delete notes
- Toggle importance of a note

**How to run:**

1. **Start the JSON server:**
   ```bash
   cd notesdemo/json
   npm install
   npm start
   ```
   Server runs on [http://localhost:3001](http://localhost:3001)

2. **Start the frontend:**
   ```bash
   cd notesdemo/notesfront
   npm install
   npm run dev
   ```
   Frontend runs on [http://localhost:5173](http://localhost:5173)

**How to use:**
- All existing notes are listed on the page
- Important notes are highlighted
- Click **Poista** (Delete) next to a note to remove it
- Click **Vaihda tärkeys** (Toggle importance) to change the importance
- Use the form at the bottom to add a new note — check the **Tärkeä** checkbox to mark it as important

---

## notesdemo2

Enhanced notes app with a real database and user authentication.

**Features:**
- User registration and login (JWT auth)
- Personal notes per user
- Add, delete, and toggle importance of notes
- Notes persisted in MySQL via Knex

**How to run:**

1. **Start the database (Docker):**
   ```bash
   cd notesdemo2/database
   docker-compose up -d
   npm install
   npx knex migrate:latest
   npx knex seed:run
   ```

2. **Start the backend:**
   ```bash
   cd notesdemo2/backend
   npm install
   npm start
   ```
   Backend runs on [http://localhost:3001](http://localhost:3001)

3. **Start the frontend:**
   ```bash
   cd notesdemo2/notesfront
   npm install
   npm run dev
   ```
   Frontend runs on [http://localhost:5173](http://localhost:5173)

**How to use:**
- Register a new account or log in
- After login your notes are loaded automatically
- Add a note using the form, optionally marking it as important
- Delete or toggle importance with the buttons next to each note

---

## shop

Full-stack e-commerce application with product management, shopping cart, checkout, and admin features.

**Features:**
- Browse product catalog
- View product details
- Add products to cart
- Checkout flow
- User registration and login (JWT auth)
- Admin: add and edit products (protected routes)

**How to run:**

1. **Start the database (Docker):**
   ```bash
   cd shop/database
   docker-compose up -d
   npm install
   npx knex migrate:latest
   npx knex seed:run
   ```

2. **Start the backend:**
   ```bash
   cd shop/backend
   npm install
   npm start
   ```
   Backend runs on [http://localhost:3001](http://localhost:3001)

3. **Start the frontend:**
   ```bash
   cd shop/frontend
   npm install
   npm run dev
   ```
   Frontend runs on [http://localhost:5173](http://localhost:5173)

**How to use:**
- The home page (`/`) shows the product list
- Click a product to go to its detail page
- Use the **Add to Cart** button to add items to your cart
- Navigate to `/cart` to view your cart
- Proceed to `/checkout` to complete a purchase
- Go to `/register` to create an account or `/login` to sign in
- **Admin users** can add new products at `/add-product` and edit existing ones at `/edit-product/:id`
