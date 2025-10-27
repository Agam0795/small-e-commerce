# E-Commerce Application Architecture

## Application Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP Request
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS APP ROUTER                          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Homepage   │  │   Products   │  │  Product/:id │          │
│  │     (/)      │  │  (/products) │  │(/products/1) │          │
│  │              │  │              │  │              │          │
│  │   📄 SSG     │  │   🔄 SSR     │  │   ⚡ ISR     │          │
│  │ Build Time   │  │ Request Time │  │Build+Revalid│          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐                                                │
│  │     Cart     │                                                │
│  │   (/cart)    │                                                │
│  │              │                                                │
│  │   💻 CSR     │                                                │
│  │  Client-Side │                                                │
│  └──────────────┘                                                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ API Calls
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API ROUTES (Backend)                        │
│                                                                   │
│  GET  /api/products          → List all products                 │
│  GET  /api/products/[id]     → Get single product                │
│  GET  /api/orders            → List all orders                   │
│  POST /api/orders            → Create new order                  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ Database Query
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                  │
│                                                                   │
│  ┌──────────────────┐         ┌──────────────────┐              │
│  │    MongoDB       │   OR    │   Mock Data      │              │
│  │   (Optional)     │         │  (lib/mockData)  │              │
│  │                  │         │                  │              │
│  │  - products      │         │  - 12 products   │              │
│  │  - orders        │         │  - In-memory     │              │
│  └──────────────────┘         └──────────────────┘              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## Rendering Strategy Flow

### SSG (Static Site Generation) - Homepage
```
Build Time:
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Fetch   │ -> │  Render  │ -> │  Static  │
│   Data   │    │   HTML   │    │   File   │
└──────────┘    └──────────┘    └──────────┘

Runtime:
┌──────────┐    ┌──────────┐
│  Request │ -> │  Serve   │
│          │    │   HTML   │
└──────────┘    └──────────┘
              (Instant! No server processing)
```

### SSR (Server-Side Rendering) - Products Page
```
Every Request:
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│  Request │ -> │  Fetch   │ -> │  Render  │ -> │  Send    │
│  /products│    │   Data   │    │   HTML   │    │  HTML    │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
              (Fresh data on every request)
```

### ISR (Incremental Static Regeneration) - Product Details
```
Build Time:
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Generate│ -> │  Render  │ -> │  Static  │
│   All    │    │   HTML   │    │  Files   │
└──────────┘    └──────────┘    └──────────┘

After Revalidation (60s):
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Request │ -> │  Serve   │    │Background│
│          │    │   Old    │    │  Update  │
└──────────┘    └──────────┘    └──────────┘

Next Request:
┌──────────┐    ┌──────────┐
│  Request │ -> │  Serve   │
│          │    │  Updated │
└──────────┘    └──────────┘
```

### CSR (Client-Side Rendering) - Cart
```
Initial Load:
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Request │ -> │  Send    │ -> │  Load    │
│  /cart   │    │  Empty   │    │   JS     │
└──────────┘    │  HTML    │    └──────────┘
                └──────────┘

Client Side:
┌──────────┐    ┌──────────┐    ┌──────────┐
│  Execute │ -> │  Fetch   │ -> │  Render  │
│    JS    │    │localStorage│  │   Cart   │
└──────────┘    └──────────┘    └──────────┘
              (All in browser)
```

## Component Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      app/layout.tsx                          │
│                     (Root Layout)                            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │            components/Navbar.tsx                     │    │
│  │         (Navigation + Cart Counter)                  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  Page Content                        │    │
│  │                                                       │    │
│  │  • app/page.tsx (Homepage)                           │    │
│  │  • app/products/page.tsx (Products List)             │    │
│  │  • app/products/[id]/page.tsx (Product Detail)       │    │
│  │  • app/cart/page.tsx (Shopping Cart)                 │    │
│  │                                                       │    │
│  │  Uses:                                                │    │
│  │  - components/ProductCard.tsx                        │    │
│  │  - components/ProductDetailClient.tsx                │    │
│  └─────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow - Shopping Experience

```
1. Browse Products
   User -> Homepage (/) 
        -> Sees Featured Products (SSG)
        -> Clicks "Shop Now"

2. View All Products
   User -> Products Page (/products)
        -> Server fetches data (SSR)
        -> User filters by category
        -> URL updates (?category=Electronics)
        -> Page re-renders with filtered products

3. View Product Details
   User -> Clicks Product Card
        -> Product Detail Page (/products/1)
        -> Pre-rendered page loads instantly (ISR)
        -> User adjusts quantity
        -> Clicks "Add to Cart"
        -> localStorage updated
        -> Cart count updates in Navbar

4. Manage Cart
   User -> Clicks Cart in Navbar
        -> Cart Page (/cart)
        -> Loads from localStorage (CSR)
        -> User updates quantities
        -> Clicks "Proceed to Checkout"
        -> Fills form
        -> Submits order

5. Complete Order
   Client -> POST /api/orders
          -> API validates data
          -> Saves to MongoDB (or mock)
          -> Returns success
          -> Cart cleared
          -> Success message shown
```

## File Dependency Map

```
app/page.tsx (Homepage)
├── components/ProductCard.tsx
├── lib/mockData.ts
└── components/Navbar.tsx (via layout)

app/products/page.tsx (Products)
├── components/ProductCard.tsx
├── lib/mockData.ts
└── components/Navbar.tsx (via layout)

app/products/[id]/page.tsx (Product Detail)
├── components/ProductDetailClient.tsx
│   └── lib/types.ts
├── lib/mockData.ts
└── components/Navbar.tsx (via layout)

app/cart/page.tsx (Cart)
├── lib/types.ts
└── components/Navbar.tsx (via layout)

app/api/products/route.ts
├── lib/mockData.ts
├── lib/mongodb.ts
└── lib/types.ts

app/api/products/[id]/route.ts
├── lib/mockData.ts
├── lib/mongodb.ts
└── lib/types.ts

app/api/orders/route.ts
├── lib/mongodb.ts
└── lib/types.ts
```

## Technology Stack Layers

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│         Tailwind CSS + Next.js Image + TypeScript       │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                    Component Layer                       │
│      Navbar, ProductCard, ProductDetailClient           │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                     Page Layer                           │
│       SSG, SSR, ISR, CSR Pages (App Router)             │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                      API Layer                           │
│        Next.js API Routes (RESTful endpoints)            │
└─────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────┐
│                     Data Layer                           │
│            MongoDB or Mock Data (Fallback)               │
└─────────────────────────────────────────────────────────┘
```

## State Management Flow

```
Product Detail Page:
┌──────────────┐
│ User clicks  │
│ "Add to Cart"│
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ localStorage │ ---> window.dispatchEvent('cart-updated')
│   updated    │
└──────────────┘
       │
       ├─────────────────────┐
       │                     │
       ▼                     ▼
┌──────────────┐      ┌──────────────┐
│   Navbar     │      │  Cart Page   │
│ cart count   │      │   re-renders │
│   updates    │      │              │
└──────────────┘      └──────────────┘
```

## Build Output Explained

```
npm run build

Route (app)             Revalidate  Expire
┌ ○ /                   [Static]    Pre-rendered at build
├ ƒ /products           [Dynamic]   Rendered per request
└ ● /products/[id]      60s         Pre-rendered + revalidate

Legend:
○  (Static)   = SSG - Generated once at build time
ƒ  (Dynamic)  = SSR - Generated on each request  
●  (SSG)      = ISR - Generated + periodic updates
```

## Request Lifecycle Examples

### Example 1: User visits homepage
```
1. Browser requests http://localhost:3000/
2. Next.js serves pre-rendered HTML (from build)
3. Page displays instantly
4. React hydrates (makes interactive)
5. Total time: ~50ms ⚡
```

### Example 2: User filters products
```
1. User clicks "Electronics" filter
2. Browser navigates to /products?category=Electronics
3. Next.js server renders page with filtered data
4. HTML sent to browser
5. Page displays with filtered products
6. Total time: ~200ms 🚀
```

### Example 3: User adds to cart
```
1. User clicks "Add to Cart" on product detail page
2. JavaScript updates localStorage
3. Custom event fired
4. Navbar listens to event
5. Cart count updates
6. Total time: ~10ms ⚡⚡⚡
```

---

*This architecture demonstrates modern web development best practices using Next.js 14*
