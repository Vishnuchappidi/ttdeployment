import { HiInbox } from 'react-icons/hi';

const EmptyState = ({ title = 'No data found', message = 'There are no items to display.', icon: Icon = HiInbox }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2">{title}</h3>
      <p className="text-slate-500 text-center max-w-sm">{message}</p>
    </div>
  );
};

export default EmptyState;
