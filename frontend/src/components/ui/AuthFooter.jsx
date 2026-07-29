import { Link } from "react-router-dom";

export default function AuthFooter() {
  return (
    <div className="mt-auto pt-6">
      <hr className="border-gray-200/60 mb-4" />
      <p className="text-xs text-gray-400 text-center">
        &copy; 2025-2026 EchOo Inc.
        <span className="mx-2">&middot;</span>
        <Link to="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy</Link>
        <span className="mx-2">&middot;</span>
        <Link to="/terms_conditions" className="hover:text-gray-900 transition-colors">Terms</Link>
        <span className="mx-2">&middot;</span>
        <Link to="/support" className="hover:text-gray-900 transition-colors">Support</Link>
      </p>
    </div>
  );
}
