# Shiprocket API Integration

This document explains the Shiprocket API integration that has been added to the e-commerce platform for delivery management.

## Features Added

### 1. **Automatic Shipment Creation**
- When a customer places an order, a shipment is automatically created with Shiprocket
- Shipment includes customer details, product information, and delivery address
- AWB (Air Waybill) code is generated for tracking

### 2. **Order Tracking**
- Customers can track their orders using the AWB code
- Real-time tracking information from Shiprocket
- Direct links to Shiprocket's tracking page

### 3. **Admin Management**
- Admins can view all orders with shipping details
- Update shipping status (pending, picked_up, in_transit, out_for_delivery, delivered, failed)
- Generate AWB codes for existing orders
- Cancel shipments if needed

### 4. **Enhanced Order Model**
- Added comprehensive shipping information to the Order schema
- Includes shipment ID, AWB code, courier name, tracking URL
- Detailed shipping address with customer contact information

## Environment Variables Required

Add these to your `.env` file:

```env
# Shiprocket Shipping API
SHIPROCKET_EMAIL=your_shiprocket_email
SHIPROCKET_PASSWORD=your_shiprocket_password
SHIPROCKET_PICKUP_PINCODE=400001
```

## API Endpoints Added

### Public Endpoints
- `GET /api/shipping/track/:awbCode` - Track shipment by AWB code
- `GET /api/shipping/couriers/:pincode` - Get available couriers for a pincode

### Protected Endpoints (Authentication Required)
- `GET /api/shipping/order/:orderId` - Get shipment details for an order

### Admin Endpoints (Admin Role Required)
- `GET /api/shipping/admin/orders` - Get all orders with shipping details
- `PUT /api/shipping/admin/order/:orderId/status` - Update shipping status
- `POST /api/shipping/admin/order/:orderId/awb` - Generate AWB for order
- `POST /api/shipping/admin/order/:orderId/cancel` - Cancel shipment

## Frontend Updates

### Customer Order View
- Enhanced order display with shipping information
- Track shipment button with real-time tracking
- Direct links to Shiprocket tracking page
- Shipping status badges with color coding

### Admin Order Management
- Comprehensive shipping information display
- Admin controls for shipping status updates
- AWB generation for orders
- Courier information and tracking URLs

## How It Works

1. **Order Placement**: When a customer completes payment, the system:
   - Creates the order in the database
   - Automatically creates a shipment with Shiprocket
   - Generates AWB code for tracking
   - Updates the order with shipping details

2. **Order Tracking**: Customers can:
   - View their order status and shipping information
   - Track shipments using the AWB code
   - Get real-time updates from Shiprocket

3. **Admin Management**: Admins can:
   - Monitor all orders and their shipping status
   - Update shipping status as orders progress
   - Generate AWB codes for orders that need them
   - Cancel shipments if necessary

## Error Handling

- If Shiprocket API fails, the order is still created successfully
- Error logs are maintained for debugging
- Graceful fallbacks ensure the system continues to work

## Installation

1. Install the required dependency:
   ```bash
   npm install axios
   ```

2. Add environment variables to your `.env` file

3. The integration is automatically active once the environment variables are set

## Testing

To test the integration:

1. Place a test order
2. Check the server logs for Shiprocket API calls
3. Verify the order has shipping information
4. Test tracking functionality with the generated AWB code

## Notes

- The integration is designed to be non-blocking - if Shiprocket fails, orders still complete
- All shipping operations are logged for debugging
- The system supports multiple couriers through Shiprocket
- Shipping addresses are validated and formatted for Shiprocket API
