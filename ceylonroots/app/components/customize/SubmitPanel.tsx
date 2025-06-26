import React from 'react';
import { Button } from '../../components/ui/button';

interface SubmitPanelProps {
    onSave: () => Promise<void>;
    onRequestQuotation: () => void;
    isEmpty: boolean;
    isSaving: boolean;
    isSubmitting: boolean;
}

const SubmitPanel: React.FC<SubmitPanelProps> = ({
    onSave,
    onRequestQuotation,
    isEmpty,
    isSaving,
    isSubmitting
}) => {
    return (
        <div className="bg-white rounded-xl shadow-sm p-5 border border-ceylon-sand/30">
            <h2 className="text-xl font-bold text-ceylon-stone mb-4 flex items-center">
                <span className="bg-ceylon-tea text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">2</span>
                Save & Request Quote
            </h2>

            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    onClick={onSave}
                    disabled={isEmpty || isSaving || isSubmitting}
                    className="flex-1 bg-ceylon-sand hover:bg-ceylon-sand-dark text-white"
                >
                    {isSaving ? "Saving..." : "Save Itinerary"}
                </Button>
                <Button
                    onClick={onRequestQuotation}
                    disabled={isEmpty || isSaving || isSubmitting}
                    className="flex-1 bg-ceylon-tea hover:bg-ceylon-tea-dark text-white"

                >
                    {isSubmitting ? "Requesting..." : "Request Quotation"}
                </Button>
            </div>
        </div>
    );
};

export default SubmitPanel;