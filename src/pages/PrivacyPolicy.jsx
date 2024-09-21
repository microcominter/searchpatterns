import React, { useState } from 'react';
import '../assets/css/privacypolicy.css'; 
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
const PrivacyPolicy = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  
  const handleLoginClick = () => {
    setIsLoginVisible(true);
  };
  return (
    <>
    <Navbar onLoginClick={handleLoginClick}/>
    <section id="policy">
      <h1>Introduction</h1>
      <p>We are committed to protecting and respecting your privacy. This Privacy Policy should be read in conjunction with our Terms and Conditions and applies to your use of our Site. The same definitions apply.</p>
      
      <h2>Personal Data</h2>
      <p>Personal data is information that allows someone to identify or contact you, e.g., your name, address, telephone number, email address, and any other information about you associated or linked to such information (‘your Information’). This Privacy Policy outlines how we may collect, use, process, and store your Information collected or provided by you through any means. By submitting any of your Information to us via our Site or otherwise, you agree to the terms of this Privacy Policy. Please do not submit personal data unless you have the right to do so.</p>

      <h2>Help</h2>
      <p>If you need any help or assistance, please contact <a href="support@searchpatterns.in">support@searchpatterns.in</a>, and we will do our best to respond promptly.</p>

      <h2>Information We May Collect From You</h2>
      <p>Information provided or input when you subscribe and use the Site, fill out forms, or interact with us.</p>
      <p>Contact details you provide.</p>
      <p>Documents, content, communications, and electronic files uploaded, imported, or transmitted through our Site.</p>
      <p>Information accessed and imported from third-party websites or storage locations.</p>
      <p>Records of correspondence via email, telephone, web forms, or otherwise.</p>
      <p>Survey responses for research purposes.</p>
      <p>Details of your visits to our Site, including traffic data, location data, weblogs, and resources accessed.</p>
      <p>Information from devices accessing our Site, including browser type, location, and IP address.</p>
      <p>Searches performed via the Site.</p>

      <h2>IP Addresses, Cookies, and Analytics</h2>
      <p>Our servers may collect your Information, including IP address, operating system, and browser type, for system administration and reporting aggregate anonymised information.</p>
      <p>We use cookies to enhance our Site and provide a better, more personalized service by:</p>
      <ul>
        <li>Making our Site more useful.</li>
        <li>Estimating audience size and usage patterns.</li>
        <li>Storing preferences to customize the Site.</li>
        <li>Speeding up searches and usage.</li>
        <li>Recognizing you when you return to our Site.</li>
      </ul>
      <p>You can refuse cookies by adjusting your browser settings. However, this may restrict access to certain parts of our Site. We may also use Google Analytics or similar services to collect information about your Site usage.</p>

      <h2>How We Use Your Information</h2>
      <p>Provide and manage our Site.</p>
      <p>Identify you as a user.</p>
      <p>Provide customer service.</p>
      <p>Develop and improve the Site.</p>
      <p>Allow participation in interactive features.</p>
      <p>Provide news and relevant information.</p>
      <p>Assist third-party contractors in monitoring usage.</p>
      <p>Present content effectively.</p>
      <p>Facilitate new features or applications on the Site.</p>
      <p>Notify you of Site changes.</p>

      <h2>Legal Basis of Processing</h2>
      <p>We process your Information based on the following legal grounds:</p>
      <ul>
        <li>Your consent.</li>
        <li>Performance of a contract or steps taken at your request before entering a contract.</li>
        <li>Compliance with a legal obligation.</li>
        <li>Protection of vital interests.</li>
        <li>Performance of a task carried out in the public interest or official authority.</li>
        <li>Legitimate interests, including Site administration, contractual obligations, monitoring, improving the Site, protecting legal rights, and mitigating risks.</li>
      </ul>

      <h2>Disclosure of Your Information</h2>
      <p>We may disclose your Information to:</p>
      <ul>
        <li>Our group members, including subsidiaries and the ultimate holding company.</li>
        <li>Third-party service providers running our Site, provided they adhere to reasonable privacy policies.</li>
        <li>Prospective buyers or sellers of our business or assets.</li>
        <li>Legal obligations, enforcing terms and conditions, protecting rights, property, or safety.</li>
      </ul>

      <h2>Retention of Your Information</h2>
      <p>We will not retain your Information longer than necessary. Upon request to delete your Pro Plan subscription, we will delete related content except for backup or cached copies retained for a reasonable time. Some Information may still be used by third-party contractors.</p>

      <h2>Third-Party Contractors</h2>
      <p>Your Information may be stored on servers hosted by third parties. Payment transactions will be encrypted and processed by third-party payment providers.</p>

      <h2>Third-Party Websites</h2>
      <p>Links to third-party websites will subject you to their privacy policies. This Privacy Policy only applies to Information collected by us via our Site.</p>

      <h2>Data Transfers</h2>
      <p>Your Information may be transferred and stored outside the EEA. Appropriate safeguards will be implemented for processing in non-EEA countries, ensuring data subject rights and legal remedies are available. Contact <a href="mailto:support@searchpatterns.in">support@searchpatterns.in</a> for further details.</p>

      <h2>Anonymous Data</h2>
      <p>We may create anonymous records from your Information for business purposes, including research and development.</p>

      <h2>Your Rights</h2>
      <p>As a data subject, you have the right to:</p>
      <ul>
        <li>Access: Obtain confirmation and access your Information.</li>
        <li>Rectification: Correct inaccuracies in your Information.</li>
        <li>Erasure: Request deletion of your Information.</li>
        <li>Restrict Processing: Limit how we process your Information.</li>
        <li>Data Portability: Transfer your Information to another controller.</li>
        <li>Object: Object to processing based on legitimate interests or direct marketing.</li>
        <li>Withdraw Consent: Withdraw consent at any time.</li>
      </ul>

      <h2>Access to Information</h2>
      <p>Your rights under data protection laws may include accessing your Information. Requests will be processed in accordance with applicable laws. Contact us at <a href="mailto:support@searchpatterns.in">support@searchpatterns.in</a> for more information.</p>

      <h2>Changes to Our Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. Changes will be posted on our Site, and where appropriate, notified to you via email.</p>

      <h2>Contact</h2>
      <p>Questions, comments, and requests regarding this Privacy Policy are welcomed and should be addressed to <a href="mailto:support@searchpatterns.in">support@searchpatterns.in</a>.</p>
    </section>
    <Footer/>
    </>
  );
};

export default PrivacyPolicy;
