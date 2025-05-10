import React from 'react';
import { Button } from '../ui/button';
import { Save, Send } from 'lucide-react';

interface SubmitPanelProps {
    onSave: () => void;
    onSubmit: () => void;
    isEmpty: boolean;
}

const SubmitPanel: React.FC<SubmitPanelProps> = ({ onSave, onSubmit, isEmpty }) => {
    return (
        <div className="ceylon-card p-4">
            <h2 className="text-lg font-bold mb-4">Save Your Journey</h2>

            <div className="flex flex-col sm:flex-row gap-3">
                <Button
                    onClick={onSave}
                    variant="outline"
                    className="border-ceylon-tea text-ceylon-tea hover:bg-ceylon-tea hover:text-white flex-1"
                    disabled={isEmpty}
                >
                    <Save className="mr-2 h-4 w-4" />
                    Save Itinerary
                </Button>

                <Button
                    onClick={onSubmit}
                    className="bg-ceylon-tea hover:bg-ceylon-tea/90 text-white flex-1"
                    disabled={isEmpty}
                >
                    <Send className="mr-2 h-4 w-4" />
                    Request Quotation
                </Button>
            </div>

            {isEmpty && (
                <p className="text-xs text-gray-500 mt-2 text-center">
                    Add at least one component to save or request a quotation.
                </p>
            )}
        </div>
    );
};

export default SubmitPanel;