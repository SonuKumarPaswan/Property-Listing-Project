import React from 'react'

const PrivacyPolicyPage = () => {
  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", backgroundColor: '#f4f6f9', minHeight: '100vh' }}>

      {/* Hero Header */}
      <section style={{
        background: 'linear-gradient(135deg, #1a2b4a 0%, #243860 60%, #1e3a6e 100%)',
        padding: '80px 24px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '300px', height: '300px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '-40px', left: '-40px',
          width: '200px', height: '200px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.04)', pointerEvents: 'none'
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '700px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.12)',
            color: '#a8c4e8',
            fontSize: '12px',
            fontFamily: "'Arial', sans-serif",
            fontWeight: 700,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            padding: '6px 18px',
            borderRadius: '20px',
            marginBottom: '22px',
            border: '1px solid rgba(255,255,255,0.15)',
          }}>
            Legal Document
          </div>
          <h1 style={{
            color: '#ffffff',
            fontSize: 'clamp(36px, 6vw, 58px)',
            fontWeight: 700,
            margin: '0 0 18px',
            lineHeight: 1.15,
            fontFamily: "'Georgia', serif",
          }}>
            Privacy Policy
          </h1>
          <p style={{
            color: '#a8c4e8',
            fontSize: '17px',
            lineHeight: 1.7,
            margin: '0 auto',
            fontFamily: "'Arial', sans-serif",
            fontWeight: 400,
            maxWidth: '560px',
          }}>
            Your privacy matters to us. Learn how MishtiHouses collects, uses, and protects your personal information.
          </p>
          <p style={{
            color: '#7a9bbf',
            fontSize: '13px',
            marginTop: '20px',
            fontFamily: "'Arial', sans-serif",
          }}>
            Last Updated: April 1, 2026 &nbsp;·&nbsp; Effective Date: January 1, 2024
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '50px 24px 80px' }}>

        {/* Intro Card */}
        <div style={{
          background: '#ffffff',
          borderRadius: '16px',
          padding: '36px 40px',
          marginBottom: '28px',
          boxShadow: '0 2px 16px rgba(26,43,74,0.08)',
          borderLeft: '5px solid #1a2b4a',
        }}>
          <p style={{ color: '#3d4f6b', fontSize: '16px', lineHeight: 1.8, margin: 0, fontFamily: "'Arial', sans-serif" }}>
            At <strong style={{ color: '#1a2b4a' }}>MishtiHouses</strong>, we are committed to protecting the privacy and security of our users, buyers, sellers, agents, and all individuals who interact with our platform. This Privacy Policy outlines in detail how we collect, process, store, share, and protect your personal information when you use our website, mobile applications, and related real estate services. By accessing or using MishtiHouses, you agree to the practices described in this document. We encourage you to read this policy carefully and contact us if you have any questions or concerns.
          </p>
        </div>

        {/* Section 1 */}
        <PolicySection
          number="01"
          title="Information We Collect"
          content={[
            "When you register for an account on MishtiHouses, we collect personal identification details such as your full name, email address, mobile phone number, and a secure password. If you choose to complete a profile, you may also provide additional information such as your profile photo, preferred locations, property budget, and occupation.",
            "When you list a property, we collect detailed information about the property including its address, size, type, price, amenities, and photographs. As an agent or developer, we may also collect your professional license number, agency affiliation, and business address to verify your identity and credentials.",
            "We automatically collect technical data when you interact with our platform, including your IP address, browser type and version, device type, operating system, pages visited, time spent on each page, and click behaviour. This information is collected through cookies, web beacons, and similar tracking technologies to understand how users engage with MishtiHouses and improve our services accordingly.",
            "If you contact our support team or fill out our contact form, we collect the content of your messages, your contact details, and any files or documents you attach. Communication records may be stored for quality assurance, legal compliance, and service improvement purposes.",
          ]}
        />

        {/* Section 2 */}
        <PolicySection
          number="02"
          title="How We Use Your Information"
          content={[
            "Your personal information is used primarily to operate and deliver MishtiHouses services. This includes creating and managing your account, facilitating property searches, connecting buyers with sellers or agents, processing inquiries, and sending you property alerts or recommendations based on your preferences.",
            "We use your contact details to communicate with you about your account activity, property listings, bookings, or messages from other users. We may also send you service-related notifications, security alerts, and transactional emails that are necessary for the functioning of our platform.",
            "With your explicit consent, we may use your information to send you marketing communications about new property listings, promotional offers, real estate insights, and updates about our platform. You can opt out of these communications at any time by clicking the unsubscribe link in any marketing email or updating your notification preferences in your account settings.",
            "We analyse aggregated and anonymised data to understand usage trends, measure performance of our features, conduct market research, and improve the overall quality of our services. This analysis does not identify you personally and helps us develop better tools for the real estate community.",
          ]}
        />

        {/* Section 3 */}
        <PolicySection
          number="03"
          title="Cookies and Tracking Technologies"
          content={[
            "MishtiHouses uses cookies and similar tracking technologies to enhance your experience on our platform. Cookies are small text files stored on your device that help us remember your preferences, keep you logged in, and deliver relevant content. We use both session cookies, which expire when you close your browser, and persistent cookies, which remain on your device for a set period of time.",
            "We use essential cookies that are strictly necessary for the platform to function, such as authentication tokens and security cookies. We also use performance cookies to measure how users interact with our website, preference cookies to remember your language and display settings, and marketing cookies to serve relevant advertisements across the web.",
            "You can control cookie settings through your browser preferences. Most browsers allow you to block or delete cookies. However, disabling certain cookies may affect the functionality of MishtiHouses. You can also opt out of interest-based advertising by visiting relevant industry opt-out pages. We honour Do Not Track signals where technically feasible.",
          ]}
        />

        {/* Section 4 */}
        <PolicySection
          number="04"
          title="Sharing of Your Information"
          content={[
            "MishtiHouses does not sell your personal information to third parties for their own marketing purposes. We share your information only in the limited circumstances described in this policy and always in compliance with applicable law.",
            "We may share your information with registered real estate agents, brokers, or property developers listed on our platform when you submit an inquiry or express interest in a property. In such cases, only the information necessary to facilitate your inquiry, such as your name, contact number, and the property you are interested in, will be shared.",
            "We work with trusted third-party service providers who assist us in operating the platform. These include cloud hosting providers, payment processors, email delivery services, analytics platforms, and customer support tools. All third-party providers are contractually obligated to protect your data and use it only for the specific purpose for which it was shared.",
            "We may disclose your information if required to do so by law or in response to a valid legal request from government authorities, courts, or law enforcement agencies. We may also share information to protect the rights, property, or safety of MishtiHouses, our users, or the general public.",
          ]}
        />

        {/* Section 5 */}
        <PolicySection
          number="05"
          title="Data Security"
          content={[
            "We take the security of your personal information seriously and implement a range of technical and organisational measures to protect it from unauthorised access, alteration, disclosure, or destruction. Our platform uses industry-standard SSL/TLS encryption for all data transmitted between your browser and our servers.",
            "Access to personal data within our organisation is strictly controlled and limited to employees or contractors who need it to perform their job functions. All staff with access to personal data are bound by confidentiality obligations and undergo regular training on data protection best practices.",
            "Despite our best efforts, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee absolute security. In the event of a data breach that poses a significant risk to your rights and freedoms, we will notify you and the relevant authorities as required by applicable law.",
          ]}
        />

        {/* Section 6 */}
        <PolicySection
          number="06"
          title="Your Rights and Choices"
          content={[
            "You have the right to access the personal information we hold about you at any time. You can do this by logging into your account and visiting your profile settings, or by contacting our privacy team directly. Upon request, we will provide you with a copy of your personal data in a commonly used, machine-readable format.",
            "You have the right to correct or update any inaccurate or incomplete personal information we hold about you. You may also request the deletion of your personal data, subject to certain legal exceptions. For example, we may need to retain certain information for legal, financial, or audit purposes even after account deletion.",
            "You have the right to object to or restrict how we process your personal data in certain circumstances, including for direct marketing purposes. You also have the right to withdraw your consent at any time where we are relying on consent as the legal basis for processing your information.",
            "To exercise any of these rights, please contact us at the details provided at the end of this policy. We will respond to all legitimate requests within 30 days. In some cases, we may need to verify your identity before processing your request.",
          ]}
        />

        {/* Section 7 */}
        <PolicySection
          number="07"
          title="Data Retention"
          content={[
            "We retain your personal information for as long as your account is active or as needed to provide you with our services. If you choose to delete your account, we will begin the process of removing your personal data from our active systems within 30 days, subject to any applicable legal retention requirements.",
            "Certain categories of data may be retained for longer periods in accordance with legal obligations. For example, financial transaction records may be retained for up to 7 years as required by Indian tax and accounting laws. Anonymised or aggregated data that cannot identify you may be retained indefinitely for research and analytics purposes.",
          ]}
        />

        {/* Section 8 */}
        <PolicySection
          number="08"
          title="Children's Privacy"
          content={[
            "MishtiHouses is not intended for use by individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal information from a minor, we will take immediate steps to delete that information from our systems. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.",
          ]}
        />

        {/* Section 9 */}
        <PolicySection
          number="09"
          title="Changes to This Policy"
          content={[
            "We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make significant changes, we will notify you by posting the updated policy on our website with a new effective date and, where appropriate, by sending you an email notification.",
            "We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information. Your continued use of MishtiHouses after any changes to this policy constitutes your acceptance of the updated terms.",
          ]}
        />

        {/* Contact Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a2b4a 0%, #243860 100%)',
          borderRadius: '16px',
          padding: '40px',
          marginTop: '12px',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '16px',
        }}>
          <h2 style={{ margin: 0, fontSize: '26px', fontWeight: 700, fontFamily: "'Georgia', serif" }}>
            Contact Our Privacy Team
          </h2>
          <p style={{ margin: 0, color: '#a8c4e8', lineHeight: 1.7, fontFamily: "'Arial', sans-serif", fontSize: '15px' }}>
            If you have any questions, concerns, or requests related to this Privacy Policy or how we handle your data, please reach out to us through any of the following channels:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '10px', marginTop: '8px' }}>
            <ContactItem icon="📍" label="Address" value="C-127 Block-C Sector-63, Noida, Uttar Pradesh 201301" />
            <ContactItem icon="📞" label="Phone" value="+91 98765 43210 (Mon–Sat, 9 AM – 7 PM)" />
            <ContactItem icon="✉️" label="Email" value="support@mishtihouses.com" />
          </div>
          <p style={{ margin: 0, color: '#7a9bbf', fontSize: '13px', fontFamily: "'Arial', sans-serif", marginTop: '8px' }}>
            We aim to respond to all privacy-related requests within 30 business days.
          </p>
        </div>

      </main>
    </div>
  )
}

// ── Sub-components ─────────────────────────────────────────────────────────────

interface PolicySectionProps {
  number: string
  title: string
  content: string[]
}

const PolicySection: React.FC<PolicySectionProps> = ({ number, title, content }) => (
  <div style={{
    background: '#ffffff',
    borderRadius: '16px',
    padding: '36px 40px',
    marginBottom: '24px',
    boxShadow: '0 2px 16px rgba(26,43,74,0.07)',
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
      <span style={{
        background: '#1a2b4a',
        color: '#a8c4e8',
        fontFamily: "'Arial', sans-serif",
        fontSize: '12px',
        fontWeight: 700,
        letterSpacing: '1px',
        padding: '4px 10px',
        borderRadius: '8px',
        flexShrink: 0,
      }}>
        {number}
      </span>
      <h2 style={{
        color: '#1a2b4a',
        fontSize: '20px',
        fontWeight: 700,
        margin: 0,
        fontFamily: "'Georgia', serif",
      }}>
        {title}
      </h2>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '14px' }}>
      {content.map((para, i) => (
        <p key={i} style={{
          color: '#4a5568',
          fontSize: '15px',
          lineHeight: 1.8,
          margin: 0,
          fontFamily: "'Arial', sans-serif",
        }}>
          {para}
        </p>
      ))}
    </div>
  </div>
)

interface ContactItemProps {
  icon: string
  label: string
  value: string
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, label, value }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
    <span style={{ fontSize: '16px', marginTop: '2px' }}>{icon}</span>
    <div>
      <span style={{
        color: '#7a9bbf',
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase' as const,
        fontFamily: "'Arial', sans-serif",
        display: 'block',
        marginBottom: '2px',
      }}>
        {label}
      </span>
      <span style={{ color: '#e0eaf5', fontSize: '15px', fontFamily: "'Arial', sans-serif" }}>
        {value}
      </span>
    </div>
  </div>
)

export default PrivacyPolicyPage