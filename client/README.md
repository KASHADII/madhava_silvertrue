# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# CodeStore - E-commerce Admin Dashboard

## Sidebar Functionality

The admin dashboard includes a responsive sidebar with the following features:

### How to Use the Sidebar

1. **Desktop**: The sidebar is visible by default and can be collapsed/expanded using the trigger button in the top-right corner of the header
2. **Mobile**: The sidebar is hidden by default and can be opened using the trigger button in the top-left corner of the header
3. **Keyboard Shortcut**: Press `Ctrl/Cmd + B` to toggle the sidebar

### Sidebar Features

- **Responsive Design**: Automatically adapts to mobile and desktop screens
- **Navigation Menu**: Quick access to all admin functions
- **Active State**: Highlights the current page
- **Collapsible**: Can be collapsed to save screen space
- **Persistent State**: Remembers your preference across sessions

### Available Menu Items

- **Create Products**: Add new products to the store
- **All Products**: View and manage existing products
- **Orders**: Monitor customer orders
- **Analytics**: View sales and performance data
- **Settings**: Configure admin settings
- **Logout**: Sign out of the admin panel

### Technical Implementation

The sidebar uses:
- Radix UI components for accessibility
- Tailwind CSS for styling
- React Router for navigation
- Redux for state management
- Custom hooks for mobile detection

### Troubleshooting

If the sidebar is not working:
1. Check that you're logged in as an admin
2. Ensure the server is running
3. Clear browser cache and cookies
4. Check browser console for any JavaScript errors

## Getting Started

1. Install dependencies: `npm install`
2. Start the development server: `npm run dev`
3. Navigate to `/admin/login` to access the admin panel
4. Use the sidebar to navigate between different admin functions
