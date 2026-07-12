import {
  CircleHelp,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

const paymentMethods = [
  {
    src: "/payments/visa.svg",
    alt: "Visa",
  },
  {
    src: "/payments/mastercard.svg",
    alt: "Mastercard",
  },
  {
    src: "/payments/paypal.svg",
    alt: "PayPal",
  },
  {
    src: "/payments/apple-pay.svg",
    alt: "Apple Pay",
  },
  {
    src: "/payments/google-pay.svg",
    alt: "Google Pay",
  },
];

export default function Footer() {
  return (
    <footer className="home-footer">
      <div className="home-footer-card">
        <div className="footer-trust-row">
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

        <p className="footer-message">
          Secure comparisons, transparent pricing
          and trusted travel partners.
        </p>

        <div
          className="payment-logos"
          aria-label="Accepted payment methods"
        >
          {paymentMethods.map((method) => (
            <span
              key={method.alt}
              className="payment-logo"
            >
              <img
                src={method.src}
                alt={method.alt}
              />
            </span>
          ))}
        </div>

        <a
          href="mailto:support@voylme.com"
          className="footer-email"
        >
          <Mail size={14} />
          support@voylme.com
        </a>

        <nav
          className="footer-links"
          aria-label="Footer links"
        >
          <a href="#">About</a>
          <a href="#">Help Centre</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </nav>

        <p className="footer-copyright">
          © 2026 Voylme. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
