import React from 'react';
interface Props {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

const SectionHeader = ({ title, description, actions }: Props) => {
  return (
  
    <div className="sm:flex sm:items-center justify-between shrink-0">
      <div>
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        {description && <p className="mt-2 text-sm text-gray-700">{description}</p>}
      </div>
      {actions}
    </div>
  )
};
export default SectionHeader;