# Angular Dashboard - Implementation Guide

## Overview
This dashboard replicates the Investo order management interface with a modern, responsive design using Angular standalone components.

## Features Implemented

### 1. **Sidebar Navigation**
- Company logo (Investo)
- Navigation menu with 7 items:
  - Dashboard
  - Inventory
  - Tracking
  - Orders (active)
  - Report Analytics
  - User Authentication
  - Setting
- Hover effects with purple accent color
- Active state highlighting

### 2. **Header/Top Bar**
- Breadcrumb navigation (Home / Order)
- Brand shop dropdown selector
- Notification bell icon
- User profile avatar

### 3. **Order Summary Cards**
Three summary cards displaying:
- **Total Order**: 550 (blue accent)
- **Completed Order**: 430 (orange accent)
- **In Process Order**: 160 (red accent)

### 4. **Order Items Data Table**
- Search functionality
- Filter, Date, and Export buttons
- Columns:
  - Checkbox for bulk selection
  - Order number
  - Customer name
  - Tracking ID
  - Order date
  - Quantity
  - Location
  - Total amount
  - Status badge (Completed/In Process/Pending)
  - Action menu (three dots)
- Status badges with color coding:
  - Green for Completed
  - Orange for In Process
  - Orange for Pending
- Row hover effects

## File Structure

```
src/app/
├── app.ts                          # Main app component
├── app.html                        # App template
├── app.css                         # Global layout styles
├── component/
│   ├── sidebar/
│   │   ├── sidebar.ts              # Sidebar component logic
│   │   ├── sidebar.html            # Sidebar template
│   │   └── sidebar.css             # Sidebar styles
│   └── mainbar/
│       ├── mainbar.ts              # Main content component with data
│       ├── mainbar.html            # Main content template
│       └── mainbar.css             # Main content styles
```

## Customization Guide

### Change Colors
Edit `src/app/app.css`:
```css
:root {
    --primary-color: #5b4cfa;        /* Purple accent color */
    --background-color: #f8f9fa;     /* Light gray background */
}
```

### Modify Navigation Items
Edit `src/app/component/sidebar/sidebar.html` to add/remove menu items.

### Update Order Data
Edit `src/app/component/mainbar/mainbar.ts` in the `orders` array:
```typescript
orders: Order[] = [
  {
    orderNum: '#1002',
    customer: 'Your Customer',
    trackingId: '#12345',
    orderDate: 'Today - 4:30 pm',
    quantity: 20,
    location: 'Your Location',
    total: '$500.00',
    status: 'Completed' // or 'In Process', 'Pending'
  },
  // Add more orders...
];
```

### Add New Table Columns
1. Update the `Order` interface in `mainbar.ts`
2. Add table header in `mainbar.html`
3. Add table data cell in the `*ngFor` loop

### Adjust Layout
Edit `src/app/app.css`:
```css
.container{
    grid-template-columns: 250px 1fr;  /* Sidebar width | Main content */
}
```

## Color Scheme

- **Primary Purple**: `#5b4cfa`
- **Background**: `#f8f9fa`
- **White**: `#ffffff`
- **Text Dark**: `#1a1a1a`
- **Text Gray**: `#666666`
- **Border**: `#e5e7eb`
- **Success Green**: `#2e7d32`
- **Warning Orange**: `#ef6c00` / `#ff9800`
- **Error Red**: `#f44336`

## Running the Application

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Next Steps / Enhancements

1. **Add Routing**: Implement Angular Router for different pages (Dashboard, Inventory, etc.)
2. **Backend Integration**: Connect to a real API for order data
3. **Search Functionality**: Implement actual search filtering
4. **Sorting**: Add column sorting to the table
5. **Pagination**: Add pagination for large datasets
6. **Modal Dialogs**: Add product creation/edit modals
7. **Responsive Design**: Add mobile breakpoints and hamburger menu
8. **Charts**: Add data visualization to the dashboard
9. **Authentication**: Implement real user authentication
10. **Export Feature**: Add CSV/Excel export functionality

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Dependencies

- Angular 20.x
- TypeScript
- Standalone components (no NgModule required)

---

**Created**: October 24, 2025
**Framework**: Angular with Vite
