const urgencyConfig = {
  LOW: { label: 'Low', bg: 'bg-slate-100', text: 'text-slate-600' },
  MEDIUM: { label: 'Medium', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  HIGH: { label: 'High', bg: 'bg-orange-100', text: 'text-orange-700' },
  CRITICAL: { label: 'Critical', bg: 'bg-red-100', text: 'text-red-700 animate-pulse' },
};

const UrgencyBadge = ({ urgency }) => {
  const config = urgencyConfig[urgency] || urgencyConfig.LOW;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-bold rounded-full ${config.bg} ${config.text}`}>
      {urgency === 'CRITICAL' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5 animate-ping"></span>}
      {config.label}
    </span>
  );
};

export default UrgencyBadge;
