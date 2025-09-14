import React from "react";
import { Shield, RotateCcw, AlertCircle, CheckCircle } from "lucide-react";

const ReturnPolicy = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Shield className="h-16 w-16 text-black" />
          </div>
          <h1 className="text-4xl font-light text-black mb-4">Return & Refund Policy</h1>
          <div className="w-24 h-1 mx-auto bg-gray-200 rounded-full mb-6" />
          <p className="text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
            At Madhava Silver, customer satisfaction is our priority. Please review our policy carefully.
          </p>
        </div>

        <div className="space-y-8">
          {/* General Policy */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-medium text-black mb-3">General Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Returns:</strong> We do not accept returns once a product has been delivered.
                </p>
              </div>
            </div>
          </div>

          {/* Replacement Policy */}
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <RotateCcw className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-medium text-black mb-3">Replacement Policy</h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  If you receive a damaged product or face a manufacturing defect, we offer a replacement within 7 days of delivery.
                </p>
              </div>
            </div>
          </div>

          {/* Conditions for Replacement */}
          <div>
            <h2 className="text-2xl font-light text-black mb-6">Conditions for Replacement</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-600">The item must be unused and in its original packaging.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-600">Proof of purchase (order confirmation/email) is required.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-1" />
                <p className="text-gray-600">Replacement is not valid for natural tarnishing, wear & tear, or damage caused by misuse.</p>
              </div>
            </div>
          </div>

          {/* Refund Policy */}
          <div className="bg-yellow-50 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-medium text-black mb-3">Refund Policy</h2>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Refunds:</strong> Refunds are not provided. In case a replacement product is unavailable, we may issue store credit.
                </p>
              </div>
            </div>
          </div>

          {/* Process */}
          <div>
            <h2 className="text-2xl font-light text-black mb-6">How to Request a Replacement</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                  1
                </div>
                <div>
                  <h3 className="font-medium text-black mb-2">Contact Us</h3>
                  <p className="text-gray-600">Reach out to our customer support within 7 days of delivery at info@madhava.com or call +91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                  2
                </div>
                <div>
                  <h3 className="font-medium text-black mb-2">Provide Details</h3>
                  <p className="text-gray-600">Share your order number, photos of the damaged item, and description of the issue</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                  3
                </div>
                <div>
                  <h3 className="font-medium text-black mb-2">Review & Approval</h3>
                  <p className="text-gray-600">Our team will review your request and approve if it meets our replacement criteria</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                  4
                </div>
                <div>
                  <h3 className="font-medium text-black mb-2">Replacement</h3>
                  <p className="text-gray-600">Once approved, we'll arrange for pickup of the damaged item and dispatch a replacement</p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <div className="bg-red-50 p-6 rounded-lg">
            <h2 className="text-xl font-medium text-black mb-4">Important Notes</h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Natural tarnishing of silver is not considered a manufacturing defect</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Damage caused by improper handling, storage, or wear is not covered</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Custom or personalized items are not eligible for replacement</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">•</span>
                <span>Replacement requests must be made within 7 days of delivery</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Need help with a replacement request?
          </p>
          <a 
            href="mailto:info@madhava.com" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-medium tracking-wide hover:bg-gray-800 transition-all duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
