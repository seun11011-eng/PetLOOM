# PetLoom — premium pet boutique storefront

A responsive React + TypeScript + Vite storefront for PetLoom. Includes an intro welcome screen, category-led homepage, searchable/filterable catalogue, product details and variants, persistent local cart, checkout form, and pre-filled WhatsApp/email order messages.

> **Before launch:** all products, prices, descriptions and product images currently in `src/data/products.ts` are demo content for layout testing. Replace them with verified inventory. The photography currently uses remote Unsplash image URLs for convenience; replace them with licensed images you own or are allowed to use, ideally WebP files under `public/images/`.

## Requirements

- Node.js 20.19+ or 22.12+ recommended
- npm

## Run locally

```bash
npm install
npm run dev
```

Vite prints a local development URL (normally `http://localhost:5173`). To check a production build:

```bash
npm run build
npm run preview
```

## Edit the catalogue

Product data is centralized in **`src/data/products.ts`**. Components read from this file, so basic catalogue maintenance does not require editing page components. After changes, save, test, build, and redeploy.

Each product has these fields:

- `id`: unique stable identifier. Do not reuse an ID for another product.
- `slug`: human-readable product slug.
- `name`, `description`, `shortDescription`
- `price`: price in naira as a number (e.g. `25000`, not a formatted string)
- `originalPrice`: previous price or `null`. Only use real, substantiated former prices.
- `category`: must match a category name in `src/data/categories.ts`
- `image`: primary image URL or public asset path
- `gallery`: array of image URLs/paths
- `featured`, `bestseller`, `isNew`: booleans used by homepage sections and badges
- `stockStatus`: `in-stock` or `out-of-stock`
- `variants`: e.g. `[{ name: 'Size', options: ['Small', 'Medium', 'Large'] }]`
- `tags`: searchable lower-case keywords

### Add a product

1. Open `src/data/products.ts`.
2. Copy an existing product object and give it a unique `id` and `slug`.
3. Replace the name, descriptions, price, category, image/gallery, tags, flags and variants.
4. Ensure the category exists in `src/data/categories.ts` and set availability using `stockStatus`.
5. Save and run `npm run dev` to check the card, details, variant selectors, and cart/order message.

### Remove a product

Delete its object from the `products` array. Existing browser cart records are validated against the current catalogue and removed products are ignored on reload.

### Change a price or product text

Edit `price`, `name`, `description`, or `shortDescription` on the matching product object. Prices are formatted as Nigerian naira automatically. If changing price, test that the cart and order summary both show the new amount.

### Replace or add product images

1. Add an appropriately sized, compressed `.webp` or `.avif` image to `public/images/`, for example `public/images/sage-comfort-pet-bed.webp`.
2. In `src/data/products.ts`, set `image: '/images/sage-comfort-pet-bed.webp'` and update `gallery` with the desired image paths.
3. Use the **correct image for the actual product** and descriptive alt text is derived from the product name. Keep file names lower-case and hyphen-separated.
4. For GitHub Pages, root-relative `/images/...` paths may point to the domain root rather than the project folder. To be safe for a project site, either use remote URLs as currently shown or change asset paths to `import.meta.env.BASE_URL + 'images/file.webp'` via a small image helper. Alternatively use `./images/...` when the site's document base permits it. The Vite base is configured in `vite.config.ts` and the workflow.

The current sample uses remote Unsplash images to avoid bundling placeholder image files. Replace them with your own licensed image assets before launch. Category imagery is in `src/data/categories.ts`.

### Add a category

Edit `src/data/categories.ts` and add an entry with a unique `slug`, `name`, short description, image, and tags. Set product `category` values to that exact `name`. Categories in the homepage cards and sidebar are rendered from this file. Navigation shortcuts such as Dogs/Cats/Toys are intentionally curated in `src/App.tsx`.

### Variants and stock

Set `variants` to `[]` if no options are required. Otherwise provide one or more variant groups; selections are included in each cart line and in the WhatsApp/email order message. Set `stockStatus: 'out-of-stock'` to disable adding an unavailable product.

### Contact details, delivery, social links and copy

- Customer email and WhatsApp number: `src/utils/format.ts` (`CUSTOMER_EMAIL`, `WHATSAPP_NUMBER`). WhatsApp must be in international digits-only format, here `2349030236409`.
- Delivery fee: optional checkout field; if blank it is labelled **To be confirmed** and excluded from the estimated total. Configure a fee only if it is appropriate for the order.
- Announcement and homepage text: `src/App.tsx`.
- Social profile links: footer in `src/App.tsx` (replace the generic Instagram/Facebook URLs with official PetLoom profile URLs).
- Legal/policy pages are starter templates and should be reviewed and adapted to your real business processes before publishing.

## Cart, checkout and order flow

- Cart data is stored in browser `localStorage`; no customer account is needed.
- Prices are re-read from the current local product catalogue when calculating totals, rather than trusted from the saved cart.
- Checkout creates a local reference like `PL-20261011-AB12` for the order message. It is not recorded on a server and cannot be guaranteed globally unique.
- WhatsApp opens `https://wa.me/2349030236409?...` with a prefilled message. The customer must review and press **Send**.
- Email opens a `mailto:` draft to `seun11011@gmail.com`. The customer must review and send it.
- Opening either app does **not** mean the order was received or confirmed. Confirm orders manually with the customer.

This static frontend does not provide secure card payments, server-side inventory, an order database, transactional email, or real newsletter subscription. The newsletter form opens a contact email as a transparent starter alternative. For payment processing or centralised order handling, add a real backend/payment provider before representing those capabilities as available.

## Deploy to GitHub Pages

1. Create a new GitHub repository, for example `petloom`.
2. Upload/push the project root (the folder containing `package.json`) to the repository's `main` branch.
3. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build/deployment source.
4. The included `.github/workflows/deploy.yml` installs dependencies, builds the site with the repository path as Vite's base, and deploys `dist` on each push to `main`.
5. Open the Actions tab and wait for the Pages workflow to finish. GitHub displays the published URL in the deployment/environment.
6. To publish edits, update source files, commit, and push to `main`. The workflow rebuilds and redeploys automatically.

If you use a different default branch, edit the workflow trigger. For a custom domain or a user/organization site, review `VITE_BASE_PATH` in the workflow. This project uses a single-page app with view state rather than nested browser routes, so refreshing its internal pages does not depend on server rewrite rules.

## Accessibility and performance notes

The interface includes semantic landmarks, labelled controls, keyboard-visible focus, reduced-motion support, lazy-loaded non-critical catalogue images, and form validation. Google Fonts and remote Unsplash photos require network access; host licensed compressed images locally for more predictable performance and availability.

## Pre-launch checklist

- Replace demo product data and verify every product/image/price/stock status.
- Replace remote image URLs with correctly licensed assets, ideally locally hosted optimized images.
- Replace social URLs and review policy templates.
- Confirm delivery rules and customer support details.
- Run `npm run build`, test mobile layouts, cart persistence, variants, and order links.
- Remember: a WhatsApp/email draft is not an order confirmation or a payment system.
