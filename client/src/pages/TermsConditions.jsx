import React from "react";
import { FileText, Shield, CreditCard, Truck, RotateCcw, Copyright, Scale } from "lucide-react";

const TermsConditions = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <FileText className="h-16 w-16 text-black" />
          </div>
          <h1 className="text-4xl font-light text-black mb-4">Terms & Conditions</h1>
          <div className="w-24 h-1 mx-auto bg-gray-200 rounded-full mb-6" />
          <p className="text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            Please read these terms and conditions carefully before using our website or making a purchase.
          </p>
        </div>

        <div className="space-y-8">
          {/* Genuine Silver */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">1. Genuine Silver</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed">
                All our jewellery is Sterling 925 Silver certified. Natural tarnishing is a property of silver and is not considered a defect.
              </p>
            </div>
          </div>

          {/* Warranty */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Shield className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">2. Warranty</h2>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed">
                We provide a 7-day replacement warranty against manufacturing defects. This does not cover natural wear & tear, tarnishing, or customer-inflicted damage.
              </p>
            </div>
          </div>

          {/* Orders & Payment */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <CreditCard className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">3. Orders & Payment</h2>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Orders are confirmed only after successful payment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>We currently do not offer Cash on Delivery (COD)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>All prices are in Indian Rupees (INR) and include applicable taxes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>We reserve the right to refuse or cancel any order at our discretion</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Shipping */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">4. Shipping</h2>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>We ship across India. Delivery time is usually 5–7 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Shipping charges are applicable and displayed at checkout</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Courier partners are chosen at our discretion for reliable service</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Delivery times may vary due to weather conditions, holidays, or other factors beyond our control</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Please ensure someone is available to receive the package at the delivery address</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Returns & Refunds */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <RotateCcw className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">5. Returns & Refunds</h2>
            </div>
            <div className="bg-red-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Returns are not accepted</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Only replacements are offered if the product is damaged/defective upon delivery, subject to our Replacement Policy</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Replacement requests must be made within 7 days of delivery</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></span>
                  <span>Natural tarnishing, wear & tear, or damage caused by misuse is not covered</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Intellectual Property */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Copyright className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">6. Intellectual Property</h2>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed mb-4">
                All designs, content, and images on this website belong to Madhava Silver. Unauthorized use is strictly prohibited.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>All product images, descriptions, and designs are proprietary</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>You may not reproduce, distribute, or create derivative works without permission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">•</span>
                  <span>Any unauthorized use may result in legal action</span>
                </li>
              </ul>
            </div>
          </div>

          {/* User Responsibilities */}
          <div>
            <h2 className="text-2xl font-light text-black mb-6">7. User Responsibilities</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Provide accurate and complete information when placing orders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Maintain the security of your account credentials</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Use the website in accordance with applicable laws and regulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Not engage in any fraudulent or illegal activities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Respect the intellectual property rights of Madhava Silver</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="text-2xl font-light text-black mb-6">8. Limitation of Liability</h2>
            <div className="bg-orange-50 p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed">
                Madhava Silver shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the website or purchase of our products.
              </p>
            </div>
          </div>

          {/* Legal Jurisdiction */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Scale className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">9. Legal Jurisdiction</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed">
                All legal disputes are subject to Jaipur, Rajasthan jurisdiction. These terms and conditions are governed by the laws of India.
              </p>
            </div>
          </div>

          {/* Changes to Terms */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-medium text-black mb-4">Changes to Terms & Conditions</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting on the website. Your continued use of the website after any changes constitutes acceptance of the new terms.
            </p>
          </div>

          {/* Contact Information */}
          <div className="text-center bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-medium text-black mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div className="space-y-2 text-gray-600">
              <p>Email: info@madhava.com</p>
              <p>Phone: +91 98765 43210</p>
              <p>Address: 123 Jewellery Street, Mumbai, Maharashtra 400001</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
