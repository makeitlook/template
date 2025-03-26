import React from "react";
import Modal from "@/components/Modal/Modal";

const PrivacyPolicyContent = () => (
  <>
    <section>
      <h3 className="text-lg font-semibold mb-2">1. Information We Collect</h3>
      <p>We collect information you provide directly to us, including:</p>
      <ul className="list-disc list-inside ml-2">
        <li>Name and contact information</li>
        <li>Company details</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Message content</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">
        2. How We Use Your Information
      </h3>
      <p>We use the information we collect to:</p>
      <ul className="list-disc list-inside ml-2">
        <li>Respond to your inquiries</li>
        <li>Provide support</li>
        <li>Communicate about our products and services</li>
        <li>Improve our customer experience</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">3. Data Protection</h3>
      <p>
        We implement appropriate technical and organizational measures to
        protect your personal data, including:
      </p>
      <ul className="list-disc list-inside ml-2">
        <li>Encryption of data transmission</li>
        <li>Restricted access to personal information</li>
        <li>Regular security assessments</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">4. Your Rights</h3>
      <p>You have the right to:</p>
      <ul className="list-disc list-inside ml-2">
        <li>Access your personal data</li>
        <li>Request correction of your information</li>
        <li>Request deletion of your data</li>
        <li>Opt-out of marketing communications</li>
      </ul>
    </section>

    <section>
      <h3 className="text-lg font-semibold mb-2">5. Contact Us</h3>
      <p>
        If you have any questions about this privacy policy, please contact us
        at privacy@company.com
      </p>
    </section>
  </>
);

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy">
      <PrivacyPolicyContent />
    </Modal>
  );
};

export default PrivacyPolicyModal;
