import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { BadgeFormData, Badge, BadgeErrors } from '@/types/badge';
import NumberInput from '@/components/dashboard/common/NumberInput';

interface BadgeFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (badge: BadgeFormData) => Promise<{ success: boolean; fieldErrors?: Partial<BadgeErrors> }>;
  badge?: Badge;
}

const BadgeForm: React.FC<BadgeFormProps> = ({ isOpen, onClose, onSubmit, badge }) => {
  const [formData, setFormData] = useState<BadgeFormData>({
    name: '',
  });
  const [errors, setErrors] = useState<BadgeErrors>({
    name: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (badge) {
      setFormData({
        name: badge.name,
      });
    } else {
      setFormData({
        name: '',
      });
    }
    setErrors({ name: '' });
  }, [badge, isOpen]);

  const validate = () => {
    const newErrors = {
      name: '',
      image: '',
      price: '',
      description: '',
      sizes: [] as { id: string; sizeLabel: string; price: string }[],
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Badge name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Badge name must be at least 3 characters';
    }

    setErrors(newErrors);

    // Check if any errors exist
    const hasMainErrors =
      newErrors.name;

    return !hasMainErrors;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const result = await onSubmit(formData);
      if (result.success) {
        onClose();
      } else if (result.fieldErrors) {
        setErrors(prev => ({
          ...prev,
          ...result.fieldErrors
        }));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({
        ...prev,
        name: 'An unexpected error occurred'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex min-h-screen items-center justify-center">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/75 transition-opacity" aria-hidden="true"></div>

        {/* Modal panel */}
        <div className="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 w-full text-center sm:mt-0 sm:text-left">
                <h3 className="text-2xl font-semibold leading-6 text-gray-900 mb-6" id="modal-title">
                  {badge ? 'Edit Badge' : 'Create New Badge'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Badge Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) validate();
                        }}
                        className={`block w-full rounded-md px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ${
                          errors.name 
                            ? 'ring-red-300 focus:ring-red-500' 
                            : 'ring-gray-300 focus:ring-indigo-500'
                        } placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 transition-colors`}
                        placeholder="Enter badge name"
                      />
                      {errors.name && (
                        <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto ${
                        isSubmitting
                          ? 'bg-indigo-400 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      } transition-colors`}
                    >
                      {isSubmitting ? 'Saving...' : badge ? 'Save Changes' : 'Create Badge'}
                    </button>
                    <button
                      type="button"
                      onClick={onClose}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgeForm;