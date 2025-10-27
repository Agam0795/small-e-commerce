# Quick Start Guide

## Get Your E-Commerce App Running in 2 Minutes! 🚀

### Step 1: Install Dependencies (30 seconds)
```bash
cd e-commerce
npm install
```

### Step 2: Run Development Server (10 seconds)
```bash
npm run dev
```

### Step 3: Open in Browser (5 seconds)
```
Visit: http://localhost:3000
```

**That's it! Your app is now running!** ✅

---

## What You Can Do Now

### Browse Products
1. **Homepage** (`/`) - See featured products
2. **Products Page** (`/products`) - Browse all 100 products
3. **Filter by Category** - Click categories in the navbar

### Shop
1. **View Product Details** - Click any product
2. **Add to Cart** - Click "Add to Cart" button
3. **View Cart** (`/cart`) - See your items
4. **Checkout** (`/checkout`) - Complete your order

### Explore
- **About Page** (`/about`) - Learn about the company
- **Contact Page** (`/contact`) - Get in touch

---

## Test Different Rendering Strategies

### Test SSG (Static Site Generation)
```bash
# Build the app
npm run build

# Look for these in the output:
# ✓ / (homepage) - pre-rendered as static HTML
# ✓ /about - pre-rendered as static HTML
```

### Test SSR (Server-Side Rendering)
```bash
# Visit the products page
http://localhost:3000/products

# Try different category filters:
http://localhost:3000/products?category=Electronics
http://localhost:3000/products?category=Clothing

# Each request generates fresh HTML on the server
```

### Test ISR (Incremental Static Regeneration)
```bash
# Visit any product page
http://localhost:3000/products/1

# Page is pre-rendered (instant load)
# After 60 seconds, next visit triggers background regeneration
# Subsequent visits get the updated version
```

### Test CSR (Client-Side Rendering)
```bash
# Add items to cart
# Visit http://localhost:3000/cart
# Close browser completely
# Reopen and visit cart again
# Cart items persist (localStorage)
```

---

## Test API Endpoints

### Using Browser
```
http://localhost:3000/api/products
http://localhost:3000/api/products?category=Electronics
http://localhost:3000/api/products/1
```

### Using curl (PowerShell)
```powershell
# Get all products
curl http://localhost:3000/api/products

# Get products by category
curl "http://localhost:3000/api/products?category=Electronics"

# Get single product
curl http://localhost:3000/api/products/1

# Create order
curl -X POST http://localhost:3000/api/orders `
  -H "Content-Type: application/json" `
  -d '{\"customerName\":\"John Doe\",\"customerEmail\":\"john@example.com\",\"items\":[],\"total\":0}'
```

---

## Production Build

### Build for Production
```bash
npm run build
```

**Expected Output:**
```
✓ Generating static pages (111/111)
  ✓ / 
  ✓ /about
  ✓ /products/1
  ✓ /products/2
  ... (98 more product pages)
  ○ /products (SSR - force-dynamic)
  ○ /cart (CSR)
  ○ /checkout (CSR)
  ○ /contact (CSR)
```

### Run Production Server
```bash
npm start
```

---

## MongoDB Setup (Optional)

The app works perfectly with mock data. MongoDB is optional!

### If you want to use MongoDB:

1. **Install MongoDB** locally or use MongoDB Atlas (cloud)

2. **Copy environment file**:
```bash
copy .env.example .env.local
```

3. **Update .env.local** with your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/ecommerce
# or
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
```

4. **Restart server**:
```bash
npm run dev
```

---

## Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Run production server

# Utilities
npm run lint         # Check code quality
```

---

## Project Structure Quick Reference

```
e-commerce/
├── app/                    # Pages and API routes
│   ├── page.tsx           # Homepage (SSG)
│   ├── products/
│   │   ├── page.tsx       # Products list (SSR)
│   │   └── [id]/page.tsx  # Product detail (ISR)
│   ├── cart/page.tsx      # Cart (CSR)
│   ├── checkout/page.tsx  # Checkout (CSR)
│   └── api/               # Backend API
├── components/             # Reusable components
├── context/               # Global state (CartContext)
├── lib/                   # Utilities and data
│   ├── mockData.ts       # 100 products
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Helper functions
└── docs/                  # Documentation
```

---

## Need Help?

1. **README.md** - Complete documentation
2. **REPORT.md** - Detailed implementation report
3. **docs/** folder - 9 specialized guides
4. **DELIVERABLES.md** - Assignment completion checklist

---

## Troubleshooting

### Port 3000 already in use?
```bash
# Kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
$env:PORT=3001; npm run dev
```

### Build errors?
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Images not loading?
- Check internet connection (images from Unsplash)
- Images are optimized automatically by Next.js

---

## What's Included

✅ **7 Pages** with different rendering strategies  
✅ **100 Products** across 20+ categories  
✅ **4 API Routes** for backend operations  
✅ **8+ Components** reusable across the app  
✅ **Global State** with Context API + localStorage  
✅ **TypeScript** throughout for type safety  
✅ **Responsive Design** works on all devices  
✅ **Production Ready** builds successfully  

---

## Next Steps

1. **Explore the code** - Check out the clean architecture
2. **Read the docs** - Understand rendering strategies
3. **Test features** - Add to cart, checkout, filters
4. **Build for production** - See 111 static pages generated
5. **Review REPORT.md** - Learn about implementation decisions

---

**Happy Coding! 🎉**

For detailed documentation, see [README.md](README.md)  
For implementation details, see [REPORT.md](REPORT.md)  
For assignment completion, see [DELIVERABLES.md](DELIVERABLES.md)
