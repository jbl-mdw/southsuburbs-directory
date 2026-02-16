"use client";
import { useState } from 'react';
import { Upload, MapPin, Phone, Mail, Globe, Clock } from 'lucide-react';

interface SubmitFormProps {
  plan: 'free' | 'basic' | 'premium';
  price: string;
}

export default function SubmitForm({ plan, price }: SubmitFormProps) {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <Step number={1} title="Business Info" active={step === 1} completed={step > 1} />
          <div className="flex-1 h-px bg-gray-300 mx-4" />
          <Step number={2} title="Details" active={step === 2} completed={step > 2} />
          <div className="flex-1 h-px bg-gray-300 mx-4" />
          <Step number={3} title="Media" active={step === 3} completed={step > 3} />
          <div className="flex-1 h-px bg-gray-300 mx-4" />
          <Step number={4} title="Review" active={step === 4} completed={step > 4} />
        </div>
      </div>

      {/* Plan Badge */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-center justify-between">
        <div>
          <span className="text-sm text-gray-600">Selected Plan:</span>
          <span className="ml-2 font-semibold text-gray-900 capitalize">{plan}</span>
        </div>
        <div className="text-2xl font-bold text-blue-600">{price}</div>
      </div>

      <form className="bg-white rounded-xl border border-gray-200 p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Information</h2>
            
            <FormField label="Business Name" required>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Joe's Pizza"
              />
            </FormField>

            <FormField label="Category" required>
              <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select a category</option>
                <option>Restaurants</option>
                <option>Home Services</option>
                <option>Automotive</option>
                <option>Real Estate</option>
                <option>Healthcare</option>
              </select>
            </FormField>

            <FormField label="Tagline" required={plan !== 'free'}>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your business"
                maxLength={100}
              />
              <p className="text-sm text-gray-500 mt-1">Max 100 characters</p>
            </FormField>

            <FormField label="Full Description" required>
              <textarea
                rows={6}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell customers about your business..."
              />
            </FormField>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact & Location</h2>

            <FormField label="Street Address" required icon={<MapPin className="w-5 h-5" />}>
              <input
                type="text"
                className="w-full px-4 py-2.5 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123 Main Street"
              />
            </FormField>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField label="City" required>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Select city</option>
                  <option>Orland Park</option>
                  <option>Tinley Park</option>
                  <option>Homewood</option>
                  <option>Flossmoor</option>
                </select>
              </FormField>

              <FormField label="ZIP Code" required>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="60477"
                />
              </FormField>
            </div>

            <FormField label="Phone Number" required icon={<Phone className="w-5 h-5" />}>
              <input
                type="tel"
                className="w-full px-4 py-2.5 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="(708) 555-0123"
              />
            </FormField>

            <FormField label="Email Address" required icon={<Mail className="w-5 h-5" />}>
              <input
                type="email"
                className="w-full px-4 py-2.5 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="contact@business.com"
              />
            </FormField>

            {plan !== 'free' && (
              <FormField label="Website" icon={<Globe className="w-5 h-5" />}>
                <input
                  type="url"
                  className="w-full px-4 py-2.5 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://yourbusiness.com"
                />
              </FormField>
            )}

            <FormField label="Business Hours" icon={<Clock className="w-5 h-5" />}>
              <textarea
                rows={4}
                className="w-full px-4 py-2.5 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Mon-Fri: 9am-6pm&#10;Sat: 10am-4pm&#10;Sun: Closed"
              />
            </FormField>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Photos & Media</h2>

            <FormField label="Business Photos" required>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">
                  {plan === 'free' ? 'Up to 3 photos' : plan === 'basic' ? 'Up to 8 photos' : 'Unlimited photos'}
                </p>
              </div>
            </FormField>

            {plan !== 'free' && (
              <FormField label="Video URL (YouTube or Vimeo)">
                <input
                  type="url"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </FormField>
            )}

            <FormField label="Logo">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload your business logo</p>
              </div>
            </FormField>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Summary</h3>
              <p className="text-sm text-gray-600">Please review your listing details before submitting.</p>
              
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium capitalize">{plan}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-medium">{price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {plan === 'free' ? '10 days' : plan === 'basic' ? '20 days' : '60 days'}
                  </span>
                </div>
              </div>
            </div>

            <label className="flex items-start gap-3">
              <input type="checkbox" className="mt-1" required />
              <span className="text-sm text-gray-600">
                I agree to the <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a> and confirm that all information provided is accurate.
              </span>
            </label>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition"
            >
              Back
            </button>
          ) : (
            <a href="/submit" className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition">
              Change Plan
            </a>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
            >
              Submit Listing
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function Step({ number, title, active, completed }: any) {
  return (
    <div className="flex flex-col items-center">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 ${
        completed ? 'bg-blue-600 text-white' : 
        active ? 'bg-blue-600 text-white' : 
        'bg-gray-200 text-gray-500'
      }`}>
        {number}
      </div>
      <span className={`text-xs font-medium ${active ? 'text-gray-900' : 'text-gray-500'}`}>{title}</span>
    </div>
  );
}

function FormField({ label, required, icon, children }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>}
        {children}
      </div>
    </div>
  );
}
