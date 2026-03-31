import { useEffect, useState } from 'react';
import { HiCheckCircle, HiXCircle, HiInformationCircle, HiX } from 'react-icons/hi';

const toastConfig = {
  success: { icon: HiCheckCircle, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-800', iconColor: 'text-emerald-500' },
  error: { icon: HiXCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', iconColor: 'text-red-500' },
  info: { icon: HiInformationCircle, bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', iconColor: 'text-blue-500' },
};

const Toast = ({ message, type = 'info', onClose, duration = 4000 }) => {
  const [show, setShow] = useState(false);
  const config = toastConfig[type] || toastConfig.info;
  const Icon = config.icon;

  useEffect(() => {
    setTimeout(() => setShow(true), 10);
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onClose, 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`fixed top-6 right-6 z-50 transform transition-all duration-300 ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className={`flex items-center gap-3 px-5 py-4 rounded-xl ${config.bg} ${config.border} border shadow-lg max-w-md`}>
        <Icon className={`w-6 h-6 flex-shrink-0 ${config.iconColor}`} />
        <p className={`text-sm font-medium ${config.text}`}>{message}</p>
        <button onClick={() => { setShow(false); setTimeout(onClose, 300); }} className="ml-2 text-slate-400 hover:text-slate-600">
          <HiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
