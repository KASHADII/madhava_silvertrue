const axios = require('axios');

class ShiprocketService {
  constructor() {
    this.baseURL = 'https://apiv2.shiprocket.in/v1/external';
    this.email = process.env.SHIPROCKET_EMAIL || '';
    this.password = process.env.SHIPROCKET_PASSWORD || '';
    this.token = null;
    this.tokenExpiry = null;
  }

  // Authenticate with Shiprocket API
  async authenticate() {
    try {
      if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
        return this.token;
      }

      const response = await axios.post(`${this.baseURL}/auth/login`, {
        email: this.email,
        password: this.password
      });

      if (response.data.status === 200) {
        this.token = response.data.token;
        // Set token expiry to 24 hours from now
        this.tokenExpiry = Date.now() + (24 * 60 * 60 * 1000);
        return this.token;
      } else {
        throw new Error('Shiprocket authentication failed');
      }
    } catch (error) {
      console.error('Shiprocket authentication error:', error.response?.data || error.message);
      throw new Error('Failed to authenticate with Shiprocket');
    }
  }

  // Get authentication headers
  async getAuthHeaders() {
    const token = await this.authenticate();
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  // Create shipment for an order
  async createShipment(orderData) {
    try {
      const headers = await this.getAuthHeaders();
      
      const shipmentData = {
        order_id: orderData.orderId,
        order_date: new Date().toISOString().split('T')[0],
        pickup_location: "Primary",
        billing_customer_name: orderData.customerName,
        billing_last_name: "",
        billing_address: orderData.billingAddress,
        billing_address_2: "",
        billing_city: orderData.billingCity || "Mumbai",
        billing_pincode: orderData.billingPincode || "400001",
        billing_state: orderData.billingState || "Maharashtra",
        billing_country: "India",
        billing_email: orderData.customerEmail,
        billing_phone: orderData.customerPhone,
        shipping_is_billing: true,
        order_items: orderData.items.map(item => ({
          name: item.name,
          sku: item.sku || item.id,
          units: item.quantity,
          selling_price: item.price
        })),
        payment_method: "Prepaid",
        sub_total: orderData.subTotal,
        length: 10,
        breadth: 10,
        height: 10,
        weight: 0.5
      };

      const response = await axios.post(`${this.baseURL}/orders/create/adhoc`, shipmentData, { headers });
      
      if (response.data.status === 201) {
        return {
          success: true,
          shipmentId: response.data.order_id,
          awbCode: response.data.awb_code,
          courierName: response.data.courier_name,
          data: response.data
        };
      } else {
        throw new Error(response.data.message || 'Failed to create shipment');
      }
    } catch (error) {
      console.error('Shiprocket create shipment error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  // Generate AWB (Air Waybill) for shipment
  async generateAWB(shipmentId) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await axios.post(`${this.baseURL}/orders/assign/awb`, {
        shipment_id: shipmentId,
        courier_id: 1 // Default courier ID, can be made configurable
      }, { headers });

      if (response.data.status === 200) {
        return {
          success: true,
          awbCode: response.data.awb_code,
          courierName: response.data.courier_name,
          data: response.data
        };
      } else {
        throw new Error(response.data.message || 'Failed to generate AWB');
      }
    } catch (error) {
      console.error('Shiprocket generate AWB error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  // Track shipment
  async trackShipment(awbCode) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await axios.get(`${this.baseURL}/courier/track/awb/${awbCode}`, { headers });
      
      if (response.data.status === 200) {
        return {
          success: true,
          trackingData: response.data.tracking_data,
          data: response.data
        };
      } else {
        throw new Error(response.data.message || 'Failed to track shipment');
      }
    } catch (error) {
      console.error('Shiprocket track shipment error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  // Get shipment details
  async getShipmentDetails(shipmentId) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await axios.get(`${this.baseURL}/orders/show/${shipmentId}`, { headers });
      
      if (response.data.status === 200) {
        return {
          success: true,
          shipmentData: response.data.data,
          data: response.data
        };
      } else {
        throw new Error(response.data.message || 'Failed to get shipment details');
      }
    } catch (error) {
      console.error('Shiprocket get shipment details error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  // Cancel shipment
  async cancelShipment(shipmentId) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await axios.post(`${this.baseURL}/orders/cancel/shipment/${shipmentId}`, {}, { headers });
      
      if (response.data.status === 200) {
        return {
          success: true,
          message: response.data.message,
          data: response.data
        };
      } else {
        throw new Error(response.data.message || 'Failed to cancel shipment');
      }
    } catch (error) {
      console.error('Shiprocket cancel shipment error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  // Get available couriers
  async getAvailableCouriers(pincode) {
    try {
      const headers = await this.getAuthHeaders();
      
      const response = await axios.get(`${this.baseURL}/courier/serviceability/`, {
        headers,
        params: {
          pickup_pincode: process.env.SHIPROCKET_PICKUP_PINCODE || "400001",
          delivery_pincode: pincode,
          weight: 0.5,
          cod: 0
        }
      });
      
      if (response.data.status === 200) {
        return {
          success: true,
          couriers: response.data.data.available_courier_companies,
          data: response.data
        };
      } else {
        throw new Error(response.data.message || 'Failed to get available couriers');
      }
    } catch (error) {
      console.error('Shiprocket get couriers error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }
}

module.exports = new ShiprocketService();
