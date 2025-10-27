# Project Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Edit `.env.local` if you want to use MongoDB:
```env
MONGODB_URI=mongodb://localhost:27017/ecommerce
# OR
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

**Note**: The app works perfectly without MongoDB using mock data.

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 4. Build for Production
```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Application Flow

### 1. Homepage (`/`)
- Pre-rendered at build time (SSG)
- Shows featured products
- Hero section with call-to-action
- Features showcase

### 2. Products Page (`/products`)
- Server-rendered on each request (SSR)
- Category filter in URL: `/products?category=Electronics`
- Click categories to filter products
- All products displayed by default

### 3. Product Detail (`/products/[id]`)
- Pre-rendered with ISR (revalidates every 60 seconds)
- Click any product card to view details
- Add to cart functionality
- Quantity selector

### 4. Shopping Cart (`/cart`)
- Client-side rendered (CSR)
- Uses localStorage for persistence
- Update quantities or remove items
- Checkout form with order submission

## Features to Test

### Cart Functionality
1. Browse products and click "Add to Cart" on product detail pages
2. Adjust quantities using +/- buttons
3. View cart by clicking "Cart" in navigation
4. Cart count updates in navbar
5. Cart persists even after closing browser

### Checkout Process
1. Add items to cart
2. Go to cart page
3. Click "Proceed to Checkout"
4. Fill in customer details
5. Click "Place Order"
6. Order is saved (check browser console for API response)

### Category Filtering
1. Go to `/products`
2. Click category buttons (Electronics, Accessories, etc.)
3. URL updates with query parameter
4. Products filter in real-time

## MongoDB Setup (Optional)

### Option 1: Local MongoDB
1. Install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Set `MONGODB_URI=mongodb://localhost:27017/ecommerce` in `.env.local`

### Option 2: MongoDB Atlas (Cloud)
1. Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Set in `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

### Option 3: Use Mock Data (Default)
- No setup required
- App uses `lib/mockData.ts` automatically
- Perfect for testing and development

## File Structure Explained

```
app/
├── api/                    # Backend API routes
│   ├── products/
│   │   ├── route.ts       # GET /api/products
│   │   └── [id]/route.ts  # GET /api/products/:id
│   └── orders/
│       └── route.ts       # GET/POST /api/orders
├── products/
│   ├── page.tsx           # /products (SSR)
│   └── [id]/page.tsx      # /products/:id (ISR)
├── cart/
│   └── page.tsx           # /cart (CSR)
├── layout.tsx             # Root layout with Navbar
├── page.tsx               # / (SSG homepage)
└── globals.css            # Global styles

components/
├── Navbar.tsx             # Navigation with cart count
├── ProductCard.tsx        # Reusable product card
└── ProductDetailClient.tsx # Client component for product details

lib/
├── mongodb.ts             # MongoDB connection helper
├── types.ts               # TypeScript interfaces
└── mockData.ts            # Sample product data
```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
PORT=3001 npm run dev
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### TypeScript Errors
```bash
# Check for type errors
npx tsc --noEmit
```

### MongoDB Connection Issues
- App falls back to mock data automatically
- Check MongoDB service is running
- Verify connection string in `.env.local`
- Ensure network access in MongoDB Atlas

## Development Tips

### Hot Reload
- Save any file to see changes instantly
- No need to restart server

### API Testing
Use tools like Postman or curl:
```bash
# Get all products
curl http://localhost:3000/api/products

# Get single product
curl http://localhost:3000/api/products/1

# Create order (POST)
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [...],
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "shippingAddress": "123 Main St"
  }'
```

### Chrome DevTools
- Open with F12
- Check Console for errors
- Network tab to see API calls
- Application tab to view localStorage (cart data)

## Performance Monitoring

### Build Analysis
```bash
npm run build
```

Look for:
- ○ Static pages (SSG)
- ● SSG with params (ISR)
- ƒ Dynamic pages (SSR)

### Lighthouse Audit
1. Open Chrome DevTools
2. Go to Lighthouse tab
3. Run audit
4. Should score 90+ on Performance

## Next Steps

### Enhancements You Could Add:
1. User authentication (NextAuth.js)
2. Product search functionality
3. Wishlist feature
4. Product reviews system
5. Payment integration (Stripe)
6. Email notifications (SendGrid)
7. Admin dashboard
8. Image upload for products
9. Inventory management
10. Order tracking

### Learning Resources:
- [Next.js Docs](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [MongoDB University](https://university.mongodb.com/)

## Support

For issues or questions:
1. Check console for error messages
2. Review README.md
3. Read RENDERING_STRATEGIES.md for rendering concepts
4. Check Next.js documentation

Happy coding! 🚀
