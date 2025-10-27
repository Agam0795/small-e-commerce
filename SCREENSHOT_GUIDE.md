# 📸 Screenshot Guide for Assignment Report

## Screenshots to Take for Your Report

### 1. Homepage (SSG) - `/`

**What to capture:**
- Full page showing hero section
- Featured products grid (12 products)
- Category showcase section
- Features section at bottom
- Navbar with cart icon

**How to demonstrate SSG:**
- Right-click → "View Page Source"
- Screenshot showing fully rendered HTML in source
- Note: Show that products are in the HTML before JavaScript runs

**Key points to highlight:**
- ⚡ Instant page load
- 🔍 Full HTML pre-rendered
- 📊 Featured products loaded at build time

---

### 2. Products Page (SSR) - `/products`

**What to capture:**
- Full product grid (100 products visible with scroll)
- Category filter buttons in navbar
- Different screenshots for different categories:
  - `/products` (all products)
  - `/products?category=Electronics`
  - `/products?category=Clothing`

**How to demonstrate SSR:**
- Screenshot showing URL with category parameter
- Show different products for different categories
- Open DevTools → Network tab → Show HTML response includes filtered products

**Key points to highlight:**
- 🔄 Fresh data on every request
- 🎯 Category filtering works server-side
- 📱 URL changes with filters

---

### 3. Product Detail Page (ISR) - `/products/1` (or any product)

**What to capture:**
- Full product detail view showing:
  - Large product image
  - Product name and price
  - Description
  - Rating (stars)
  - Stock availability
  - "Add to Cart" button
  - Category badge

**How to demonstrate ISR:**
- Screenshot of build output showing 100 product pages generated:
  ```bash
  npm run build
  # Screenshot the terminal output showing:
  # ✓ /products/1
  # ✓ /products/2
  # ... (98 more)
  ```
- Screenshot of the page loading instantly (Network tab showing cached)

**Key points to highlight:**
- ⚡ Pre-rendered at build time
- 🔄 Revalidates every 60 seconds
- 📈 Scales to 100 pages efficiently

---

### 4. Shopping Cart Page (CSR) - `/cart`

**What to capture:**
- Cart with multiple items showing:
  - Product images
  - Product names and prices
  - Quantity controls (- and + buttons)
  - Remove button
  - Total price at bottom
  - "Proceed to Checkout" button

**How to demonstrate CSR:**
1. Screenshot of empty cart
2. Add items from product pages
3. Screenshot of populated cart
4. Screenshot of DevTools → Application → localStorage showing cart data
5. Close browser completely
6. Reopen and show cart still has items (localStorage persistence)

**Key points to highlight:**
- 💾 Persists in localStorage
- ⚡ Instant updates (no server calls)
- 🎯 User-specific data

---

### 5. Checkout Page (CSR) - `/checkout`

**What to capture:**
- Full checkout form showing:
  - Personal information fields (Name, Email, Phone)
  - Shipping address form
  - Payment details section
  - Order summary on the right
  - Total amount
  - "Place Order" button

**How to demonstrate CSR:**
- Screenshot showing form validation errors (empty fields)
- Screenshot showing filled form
- Screenshot of DevTools → Network tab showing API call to POST /api/orders

**Key points to highlight:**
- 📝 Client-side form validation
- 🔒 Interactive form fields
- 📞 API integration for order creation

---

### 6. About Page (SSG) - `/about`

**What to capture:**
- Full page showing:
  - Company mission section
  - Values cards
  - Statistics section
  - Story section

**How to demonstrate SSG:**
- View page source to show pre-rendered HTML

**Key points to highlight:**
- ⚡ Instant load (pre-rendered)
- 📄 Static content
- 🔍 Perfect for SEO

---

### 7. Contact Page (CSR) - `/contact`

**What to capture:**
- Contact form
- Contact information cards
- FAQ section

**Key points to highlight:**
- 📝 Client-side form validation
- 🎯 Interactive UI

---

### 8. Build Output Screenshot

**What to capture:**
```bash
npm run build
```

**Screenshot showing:**
```
✓ Generating static pages (111/111)
  ✓ / (Homepage - SSG)
  ✓ /about (About - SSG)
  ✓ /products/1 (ISR)
  ✓ /products/2 (ISR)
  ... (98 more)
  ○ /products (SSR - not static)
  ○ /cart (CSR - not static)
  ○ /checkout (CSR - not static)
```

**Key points to highlight:**
- ✅ Successful build
- 📊 111 static pages generated
- 🎯 Shows which pages use which rendering strategy

---

### 9. API Endpoint Screenshots

**Using browser or Postman:**

**GET /api/products**
```
http://localhost:3000/api/products
```
Screenshot showing JSON array of all products

**GET /api/products?category=Electronics**
```
http://localhost:3000/api/products?category=Electronics
```
Screenshot showing filtered products

**GET /api/products/1**
```
http://localhost:3000/api/products/1
```
Screenshot showing single product JSON

**POST /api/orders** (using Postman or curl)
Screenshot showing:
- Request body
- Response with orderId

---

### 10. Database Screenshot (if using MongoDB)

**MongoDB Compass or Atlas:**
- Screenshot of products collection
- Screenshot showing 100 documents

**Or show mock data file:**
- Screenshot of `lib/mockData.ts` showing product array

---

### 11. TypeScript Screenshot

**What to capture:**
- Screenshot of `lib/types.ts` showing:
  - Product interface
  - Order interface
  - CartItem interface

**Key points to highlight:**
- ✅ Full type safety
- 📝 Clean type definitions
- 🎯 IntelliSense support

---

### 12. Component Architecture Screenshot

**What to capture:**
- Screenshot of VS Code file explorer showing:
  ```
  components/
  ├── Navbar.tsx
  ├── Footer.tsx
  ├── ProductCard.tsx
  ├── ProductList.tsx
  ├── ProductDetailClient.tsx
  ├── CartItem.tsx
  ├── Button.tsx
  └── Loader.tsx
  ```

**Key points to highlight:**
- 🧩 Reusable components
- 📁 Clean organization
- ♻️ DRY principle

---

### 13. Mobile Responsive Screenshots

**What to capture:**
- Open DevTools → Toggle device toolbar
- Screenshots of:
  - Homepage on mobile (375px width)
  - Products page on mobile
  - Product detail on mobile
  - Cart on mobile

**Key points to highlight:**
- 📱 Mobile-first design
- 🎯 Responsive grid (1-2-3-4 columns)
- 📐 Tailwind CSS responsive utilities

---

### 14. Performance Screenshots

**Chrome DevTools → Lighthouse:**
- Run Lighthouse audit on homepage
- Screenshot showing:
  - Performance score
  - SEO score
  - Best Practices score
  - Accessibility score

**Network Tab:**
- Screenshot showing page load time
- Screenshot showing image optimization

---

### 15. State Management Screenshot

**What to capture:**
- Screenshot of `context/CartContext.tsx` showing:
  - CartProvider component
  - addToCart function
  - removeFromCart function
  - localStorage integration

**DevTools - React Developer Tools:**
- Screenshot showing Context value
- Screenshot showing component tree

---

## 📋 Screenshot Checklist

Create a folder: `screenshots/` in your project

Save screenshots with descriptive names:

- [ ] `01-homepage-ssg.png` - Full homepage
- [ ] `02-homepage-source.png` - View source showing pre-rendered HTML
- [ ] `03-products-ssr-all.png` - All products page
- [ ] `04-products-ssr-electronics.png` - Filtered by Electronics
- [ ] `05-products-ssr-url.png` - URL showing category parameter
- [ ] `06-product-detail-isr.png` - Single product page
- [ ] `07-build-output.png` - Terminal showing 111 static pages
- [ ] `08-cart-empty.png` - Empty cart state
- [ ] `09-cart-filled.png` - Cart with items
- [ ] `10-cart-localstorage.png` - DevTools showing localStorage
- [ ] `11-checkout-form.png` - Checkout page
- [ ] `12-checkout-summary.png` - Order summary
- [ ] `13-about-page.png` - About page
- [ ] `14-contact-page.png` - Contact page
- [ ] `15-api-products.png` - API response for all products
- [ ] `16-api-product-detail.png` - API response for single product
- [ ] `17-api-order-post.png` - Creating order via API
- [ ] `18-types-typescript.png` - Type definitions
- [ ] `19-components-structure.png` - File structure
- [ ] `20-mobile-homepage.png` - Mobile responsive view
- [ ] `21-lighthouse-score.png` - Performance audit
- [ ] `22-network-performance.png` - Load time metrics

---

## 🎨 Screenshot Tips

### Best Practices:
1. **Clean Your Screen**
   - Close unnecessary tabs
   - Hide bookmarks bar
   - Use clean browser profile

2. **High Quality**
   - Use full resolution (at least 1920x1080)
   - Don't resize images (keep original size)
   - Use PNG format (not JPG)

3. **Annotations (Optional)**
   - Use arrows to highlight key features
   - Add text labels for clarity
   - Circle important elements

4. **Consistency**
   - Use same browser for all screenshots
   - Same zoom level (100%)
   - Same window size when possible

5. **Context**
   - Include URL bar in browser screenshots
   - Show relevant DevTools tabs
   - Capture enough context

---

## 📝 Adding Screenshots to Report

### In REPORT.md:

```markdown
## Screenshots

### 1. Homepage (SSG)
![Homepage](screenshots/01-homepage-ssg.png)
*Figure 1: Homepage pre-rendered at build time with featured products*

**Key Features:**
- Hero section with call-to-action
- 12 featured products displayed in grid
- Category showcase
- Pre-rendered HTML (see source view below)

![Homepage Source](screenshots/02-homepage-source.png)
*Figure 2: View source showing fully rendered HTML (SSG)*

---

### 2. Products Page (SSR)
![Products All](screenshots/03-products-ssr-all.png)
*Figure 3: Products listing page showing all 100 products*

![Products Filtered](screenshots/04-products-ssr-electronics.png)
*Figure 4: Products filtered by Electronics category (SSR)*

Notice the URL parameter: `?category=Electronics`

---

### 3. Product Detail Page (ISR)
![Product Detail](screenshots/06-product-detail-isr.png)
*Figure 5: Individual product page with full details*

![Build Output](screenshots/07-build-output.png)
*Figure 6: Build output showing 100 product pages pre-generated*

---

### 4. Shopping Cart (CSR)
![Cart Filled](screenshots/09-cart-filled.png)
*Figure 7: Shopping cart with items from multiple products*

![Cart localStorage](screenshots/10-cart-localstorage.png)
*Figure 8: Cart data persisted in browser localStorage*

---

### 5. Checkout Page (CSR)
![Checkout](screenshots/11-checkout-form.png)
*Figure 9: Checkout form with validation*

---

### 6. Build Statistics
![Build](screenshots/07-build-output.png)
*Figure 10: Production build generating 111 static pages*

---

### 7. Performance
![Lighthouse](screenshots/21-lighthouse-score.png)
*Figure 11: Lighthouse performance audit scores*
```

---

## ✅ Final Screenshot Checklist

Before submitting:

- [ ] All screenshots are clear and readable
- [ ] URLs are visible in browser screenshots
- [ ] No sensitive information visible
- [ ] All screenshots are labeled
- [ ] Screenshots are referenced in report
- [ ] Screenshots demonstrate each rendering strategy
- [ ] Build output screenshot included
- [ ] API endpoint screenshots included
- [ ] Mobile responsive screenshots included
- [ ] Performance metrics included

---

## 🎯 Key Screenshots for Grading

**Must-have screenshots:**

1. **Homepage** - Demonstrates SSG
2. **Build Output** - Shows 111 static pages
3. **Products with Filter** - Demonstrates SSR
4. **Product Detail** - Demonstrates ISR
5. **Cart with localStorage** - Demonstrates CSR
6. **API Response** - Shows backend working

These 6 screenshots prove all requirements are met!

---

## 📞 Tools for Screenshots

### Windows:
- **Snipping Tool** - Built-in (Win + Shift + S)
- **ShareX** - Advanced tool (free)
- **Lightshot** - Quick screenshots (free)

### Browser:
- **Chrome DevTools** - Built-in screenshot tool
- **Full Page Screenshot** extension
- **Awesome Screenshot** extension

### Annotation:
- **Greenshot** - Free annotation tool
- **ShareX** - Has built-in editor
- **Paint.NET** - Free image editor

---

**Pro Tip:** Take screenshots as you test each feature. Don't wait until the end!

Good luck with your screenshots! 📸
