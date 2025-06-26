import React, { useState } from 'react';

interface EmailRequestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => Promise<void>;
    isSubmitting: boolean;
}

const EmailRequestModal: React.FC<EmailRequestModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isSubmitting
}) => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple email validation
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        setIsValidEmail(valid);

        if (valid) {
            await onSubmit(email);
            setEmail('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-ceylon-stone mb-2">Request a Quotation</h2>
                    <p className="text-gray-600 mb-6">
                        Please enter your email address to receive your customized travel package quote.
                    </p>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-4 py-3 border rounded-lg focus:ring focus:ring-ceylon-tea/50 ${isValidEmail ? 'border-gray-300' : 'border-red-500'
                                    }`}
                                placeholder="your@email.com"
                                required
                            />
                            {!isValidEmail && (
                                <p className="mt-1 text-sm text-red-600">Please enter a valid email address</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-2.5 text-ceylon-stone font-medium rounded-lg border border-gray-300 hover:bg-gray-50"
                                disabled={isSubmitting}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-ceylon-tea text-white font-medium rounded-lg hover:bg-ceylon-tea/90 flex items-center justify-center"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </>
                                ) : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmailRequestModal;