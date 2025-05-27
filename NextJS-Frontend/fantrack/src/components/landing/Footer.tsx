import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-gray-900 text-gray-200 py-6 mt-12">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <span className="font-bold text-lg">Finance Tracker</span>
                    <span className="ml-2 text-sm text-gray-400">© {new Date().getFullYear()} All rights reserved.</span>
                </div>
                <div className="flex space-x-4">
                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-white transition"
                    >
                        GitHub
                    </a>
                    <a
                        href="/privacy"
                        className="hover:text-white transition"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="/contact"
                        className="hover:text-white transition"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;