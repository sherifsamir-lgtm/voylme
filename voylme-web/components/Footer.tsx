import {
  CircleHelp,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

const paymentMethods = [
  { src: "/payments/visa.svg", alt: "Visa" },
  { src: "/payments/mastercard.svg", alt: "Mastercard" },
  { src: "/payments/paypal.svg", alt: "PayPal" },
  { src: "/payments/apple-pay.svg", alt: "Apple Pay" },
  { src: "/payments/google-pay.svg", alt: "Google Pay" },
];

export default function Footer() {
  return (
    <footer className="voylme-final-footer">
      <div className="voylme-final-footer-card">
        <div className="voylme-trust-items">
          <span>
            <ShieldCheck size={16} />
            Secure
          </span>

          <span>
            <LockKeyhole size={16} />
            Protected
          </span>

          <span>
            <CircleHelp size={16} />
            Support
          </span>
        </div>

        <p className="voylme-footer-description">
          Secure comparisons, transparent pricing and trusted travel partners.
        </p>

        <div
          className="voylme-payment-methods"
          aria-label="Supported payment methods"
        >
          {paymentMethods.map((method) => (
            <span key={method.alt}>
              <img src={method.src} alt={method.alt} />
            </span>
          ))}
        </div>

        <a
          className="voylme-support-email"
          href="mailto:support@voylme.com"
        >
          <Mail size={14} />
          support@voylme.com
        </a>

        <nav
          className="voylme-footer-links"
          aria-label="Footer links"
        >
          <a href="#">About</a>
          <a href="#">Help Centre</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </nav>

        <small className="voylme-copyright">
          © 2026 Voylme. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
