// src/components/ErrorBoundary.jsx
import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 py-20" dir="rtl">
          <div className="w-16 h-16 rounded-full bg-[#721F31]/10 flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-[#721F31]" />
          </div>
          <h2 className="text-xl font-black text-gray-900 mb-2">حدث خطأ غير متوقع</h2>
          <p className="text-gray-500 font-medium text-sm mb-6 max-w-md">
            نعتذر عن الإزعاج. حاول إعادة تحميل الصفحة، وإن استمرت المشكلة تواصل معنا.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#8a1538] hover:bg-[#680f2a] text-white px-6 py-3 rounded-xl font-black text-sm transition-all shadow-md cursor-pointer"
          >
            إعادة تحميل الصفحة
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
