import React from "react";
import { Shield, Eye, Lock, Mail, Users, AlertTriangle } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-black" />
          </div>
          <h1 className="text-4xl font-light text-black mb-4">Privacy Policy</h1>
          <div className="w-24 h-1 mx-auto bg-gray-200 rounded-full mb-6" />
          <p className="text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            Madhava Silver values your trust and is committed to protecting your personal information.
          </p>
        </div>

        <div className="space-y-8">
          {/* Information We Collect */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Eye className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">1. Information We Collect</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Name, email, phone number, and shipping address</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Payment details when you make a purchase</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Order history and preferences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>Website usage data and analytics</span>
                </li>
              </ul>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">2. How We Use Your Information</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>To process and deliver your orders</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>To provide order updates and customer support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>To inform you about offers, sales, and new collections</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>To improve our website and services</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></span>
                  <span>To prevent fraud and ensure security</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Data Security */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Lock className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">3. Data Security</h2>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed mb-4">
                We use secure payment gateways to protect your financial data. We never store or share your payment details.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>SSL encryption for all data transmission</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Secure payment processing through trusted gateways</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Regular security audits and updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Limited access to personal information</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Sharing of Data */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">4. Sharing of Data</h2>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed mb-4">
                Your information is never sold. It may only be shared with trusted partners strictly for order fulfillment.
              </p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-medium text-black mb-2">We may share your information with:</h3>
                  <ul className="space-y-2 text-gray-600 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Courier partners for delivery purposes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Payment processors for transaction processing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 mt-1">•</span>
                      <span>Customer service providers for support</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Marketing Communication */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-black" />
              <h2 className="text-2xl font-light text-black">5. Marketing Communication</h2>
            </div>
            <div className="bg-yellow-50 p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed mb-4">
                We may send promotional messages about new launches, offers, or sales. You can opt-out anytime by contacting us.
              </p>
              <div className="space-y-2 text-gray-600">
                <p>You can unsubscribe from marketing emails by:</p>
                <ul className="space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Clicking the unsubscribe link in any marketing email</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Contacting us at info@madhava.com</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-yellow-600 mt-1">•</span>
                    <span>Updating your preferences in your account settings</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="text-2xl font-light text-black mb-6">6. Your Rights</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-600 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-black mt-1">•</span>
                  <span>Access your personal information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black mt-1">•</span>
                  <span>Correct inaccurate information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black mt-1">•</span>
                  <span>Request deletion of your data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black mt-1">•</span>
                  <span>Opt-out of marketing communications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-black mt-1">•</span>
                  <span>Data portability</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="bg-red-50 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-medium text-black mb-3">Policy Updates</h2>
                <p className="text-gray-600 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="text-center bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-medium text-black mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
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

export default PrivacyPolicy;
