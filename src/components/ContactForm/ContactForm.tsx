"use client";
import React, { useState } from "react";
import PrivacyPolicyModal from "@/components/Modal/PrivacyPolicyModal";
import { motion } from "framer-motion";
import Modal from "@/components/Modal/Modal";

// Toast Component
const Toast = ({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) => {
  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 w-80 px-4 py-2 rounded-md text-text-clear ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
      style={{ zIndex: 9999 }}
    >
      <p>{message}</p>
    </div>
  );
};

interface FormsProps {
  title?: string;
  description?: string;
  accessKey: string;
  onSubmit?: (formData: Record<string, string>) => void;
}

const ContactForm: React.FC<FormsProps> = ({
  accessKey,
  onSubmit,
  title,
  description,
}) => {
  const [formData, setFormData] = useState({
    name: "", // Changed from firstName + lastName to match web3forms expectation
    email: "",
    phone: "", // Changed from phoneNumber to match common form field names
    company: "",
    message: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isPrivacyAgreedModalOpen, setIsPrivacyAgreedModalOpen] =
    useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!agreed) {
      setIsPrivacyAgreedModalOpen(true);
      return;
    }

    try {
      setIsSubmitting(true);

      // Create FormData object for proper submission
      const submitData = new FormData();
      submitData.append("access_key", accessKey);

      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      // Add honeypot field to prevent spam (recommended by web3forms)
      submitData.append("botcheck", "");

      // You can add a custom subject
      submitData.append("subject", "New Enquiry");

      // Optional: add a redirect URL after successful submission
      // submitData.append("redirect", "https://yourwebsite.com/thanks");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (data.success) {
        // Open the success modal and clear the form if successful
        setIsSuccessModalOpen(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        });
        setShowToast(true);
        setToastMessage("Form submitted successfully!");
        setToastType("success");
      } else {
        throw new Error(data.message || "Form submission failed");
      }
    } catch (error) {
      // Type narrowing
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An error occurred during submission.";
      setShowToast(true);
      setToastMessage(errorMessage);
      setToastType("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  return (
    <>
      <div className="isolate">
        {title && description && (
          <div className="mx-auto max-w-2xl text-center mb-16 sm:mb-20">
            <motion.h2
              className="text-2xl font-semibold tracking-tight text-text-primary sm:text-5xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h2>
            <p className="mt-2 text-md text-text-secondary">{description}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mx-auto max-w-xl">
          <input type="hidden" name="access_key" value={accessKey} />
          {/* Honeypot field to prevent spam */}
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            style={{ display: "none" }}
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Name Field (Combined) */}
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-text-primary"
              >
                Name*
              </label>
              <div className="mt-2.5">
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md bg-card-background px-3.5 py-2 text-sm text-text-primary outline outline-1 outline-border-main placeholder:text-text-dimmed focus:outline-2 focus:outline-elements-primary-main transition-all duration-300"
                />
              </div>
            </div>

            {/* Company (Optional) */}
            <div className="sm:col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-semibold text-text-primary"
              >
                Company
              </label>
              <div className="mt-2.5">
                <input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Your Company (Optional)"
                  value={formData.company}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-card-background px-3.5 py-2 text-sm text-text-primary outline outline-1 outline-border-main placeholder:text-text-dimmed focus:outline-2 focus:outline-elements-primary-main transition-all duration-300"
                />
              </div>
            </div>

            {/* Email */}
            <div className="sm:col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text-primary"
              >
                Email*
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
                  className="block w-full rounded-md bg-card-background px-3.5 py-2 text-sm text-text-primary outline outline-1 outline-border-main placeholder:text-text-dimmed focus:outline-2 focus:outline-elements-primary-main transition-all duration-300"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="sm:col-span-2">
              <label
                htmlFor="phone"
                className="block text-sm font-semibold text-text-primary"
              >
                Phone number*
              </label>
              <div className="mt-2.5">
                <input
                  id="phone"
                  name="phone" // Changed to match common form field names
                  type="tel"
                  placeholder="07911 123456"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-card-background px-3.5 py-2 text-sm text-text-primary outline outline-1 outline-border-main placeholder:text-text-dimmed focus:outline-2 focus:outline-elements-primary-main transition-all duration-300"
                />
              </div>
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-text-primary"
              >
                Message*
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
                  className="block w-full text-sm rounded-md bg-card-background px-3.5 py-2 text-text-primary outline outline-1 outline-border-main placeholder:text-text-dimmed focus:outline-2 focus:outline-elements-primary-main transition-all duration-300"
                />
              </div>
            </div>

            {/* Privacy Policy Agreement */}
            <div className="flex gap-x-4 sm:col-span-2">
              <div className="flex h-6 items-center">
                <input
                  type="checkbox"
                  id="privacy-policy"
                  checked={agreed}
                  onChange={() => setAgreed(!agreed)}
                  className="rounded text-elements-primary-main focus:ring-elements-primary-shadow"
                />
              </div>
              <label
                htmlFor="privacy-policy"
                className="text-sm text-text-tertiary"
              >
                By selecting this, you agree to our{" "}
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="font-semibold text-elements-primary-main hover:underline"
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
              disabled={isSubmitting}
              className="block w-full rounded-md bg-elements-primary-main px-3.5 py-2.5 text-center text-sm font-semibold text-elements-primary-contrastText shadow-sm hover:bg-elements-primary-shadow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-elements-primary-main transition-all duration-300 disabled:opacity-70"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />

      <Modal
        isOpen={isPrivacyAgreedModalOpen}
        onClose={() => setIsPrivacyAgreedModalOpen(false)}
        title="Privacy Policy Agreement"
      >
        You must agree to the privacy policy to proceed. Please review and
        accept the terms to continue.
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        title="Submission Successful"
      >
        Thank you for contacting us! We will get back to you shortly.
      </Modal>

      {/* Toast */}
      {showToast && <Toast message={toastMessage} type={toastType} />}
    </>
  );
};

export default ContactForm;
