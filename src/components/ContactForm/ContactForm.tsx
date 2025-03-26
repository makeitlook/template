"use client";
import React, { useState } from "react";
import PrivacyPolicyModal from "@/components/Modal/PrivacyPolicyModal";

interface Web3FormsProps {
  accessKey: string;
  onSubmit?: (formData: Record<string, string>) => void;
}

const Web3ContactForm: React.FC<Web3FormsProps> = ({ accessKey, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreed) {
      alert("Please agree to the privacy policy");
      return;
    }

    onSubmit?.(formData);
  };

  return (
    <>
      <div className="isolate py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
            Contact sales
          </h2>
          <p className="mt-2 text-lg/8 text-text-secondary">
            Get in touch with our sales team
          </p>
        </div>
        <form
          action="https://api.web3forms.com/submit"
          method="POST"
          onSubmit={handleSubmit}
          className="mx-auto mt-16 max-w-xl sm:mt-20"
        >
          <input type="hidden" name="access_key" value={accessKey} />

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {/* First Name */}
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm/6 font-semibold text-text-primary"
              >
                First name
              </label>
              <div className="mt-2.5">
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-card-background px-3.5 py-2 text-base text-text-primary outline outline-1 -outline-offset-1 outline-border-main placeholder:text-text-dimmed focus:outline-2 focus:outline-elements-primary-main"
                />
              </div>
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm/6 font-semibold text-text-primary"
              >
                Last name
              </label>
              <div className="mt-2.5">
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-card-background px-3.5 py-2 text-base text-text-primary outline outline-1 -outline-offset-1 outline-border-main placeholder:text-text-dimmed focus:outline-2 focus:outline-elements-primary-main"
                />
              </div>
            </div>

            {/* Company */}
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm/6 font-semibold text-text-primary"
              >
                Company
              </label>
              <div className="mt-2.5">
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-card-background px-3.5 py-2 text-base text-text-primary outline outline-1 -outline-offset-1 outline-border-main placeholder:text-text-dimmed focus:outline-2 focus:outline-elements-primary-main"
                />
              </div>
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm/6 font-semibold text-text-primary"
              >
                Email
              </label>
              <div className="mt-2.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-card-background px-3.5 py-2 text-base text-text-primary outline outline-1 -outline-offset-1 outline-border-main placeholder:text-text-dimmed focus:outline-2 focus:outline-elements-primary-main"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="sm:col-span-2">
              <label
                htmlFor="phone-number"
                className="block text-sm/6 font-semibold text-text-primary"
              >
                Phone number
              </label>
              <div className="mt-2.5">
                <input
                  id="phone-number"
                  name="phoneNumber"
                  type="tel"
                  placeholder="07911 123456"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-card-background px-3.5 py-2 text-base text-text-primary outline outline-1 -outline-offset-1 outline-border-main placeholder:text-text-dimmed focus:outline-2 focus:outline-elements-primary-main"
                />
              </div>
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm/6 font-semibold text-text-primary"
              >
                Message
              </label>
              <div className="mt-2.5">
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Leave us a message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-card-background px-3.5 py-2 text-base text-text-primary outline outline-1 -outline-offset-1 outline-border-main placeholder:text-text-dimmed focus:outline-2 focus:outline-elements-primary-main"
                />
              </div>
            </div>

            <div className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <input
                  type="checkbox"
                  id="privacy-policy"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>
              <label
                htmlFor="privacy-policy"
                className="text-sm/6 text-gray-600"
              >
                By selecting this, you agree to our{" "}
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="font-semibold text-indigo-600 hover:underline"
                >
                  privacy&nbsp;policy
                </button>
                .
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-10">
            <button
              type="submit"
              className="block w-full rounded-md bg-elements-primary-main px-3.5 py-2.5 text-center text-sm font-semibold text-elements-primary-contrastText shadow-sm hover:bg-elements-primary-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elements-primary-main"
            >
              Let's talk
            </button>
          </div>
        </form>
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </>
  );
};

export default Web3ContactForm;

// Optional wrapper for usage
export function ContactPage() {
  const handleSubmit = (formData: Record<string, string>) => {
    console.log("Form submitted:", formData);
  };

  return (
    <Web3ContactForm
      accessKey="your-web3forms-access-key"
      onSubmit={handleSubmit}
    />
  );
}
