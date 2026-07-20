// src/components/programs/detail/ProgramMetaCard.jsx
import { ArrowLeft, Building2, LayoutGrid, LayoutTemplate, Award, Users, Languages, CalendarDays, Circle, ExternalLink } from 'lucide-react';
import { getPathwayColor } from '../../../utils/pathwayColors';

// 🟢 خريطة أيقونات لحقول بطاقة البرنامج الديناميكية (metaDetails)
const metaIconMap = {
  'نوع البرنامج': LayoutGrid,
  'اللغة': Languages,
  'آلية التعلّم': Building2,
  'آلية البرنامج': Building2,
  'الشهادات': Award,
  'الفئة المناسبة': Users,
  'الفئة العمرية': Users,
  'المدة': CalendarDays,
};
const getMetaIcon = (label) => metaIconMap[label] || LayoutGrid;

export default function ProgramMetaCard({ currentProgram, onNavigate }) {
  return (
    <div className="w-full lg:w-4/12 relative z-10 mb-8 lg:mb-0 order-first lg:order-none">
      <div className="lg:sticky lg:top-32 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 lg:p-6 2xl:p-8 text-right shadow-xl shadow-gray-100">
        <h3 className="font-black text-xl text-gray-900 mb-6 lg:mb-4 2xl:mb-6 border-b border-gray-100 pb-4">بطاقة البرنامج</h3>
        <div className="space-y-5 lg:space-y-4 2xl:space-y-5 mb-8 lg:mb-6 2xl:mb-8">
          {(currentProgram.metaDetails || [
            { label: 'آلية البرنامج', value: currentProgram.mechanism },
            { label: 'نوع البرنامج', value: currentProgram.type },
            { label: 'اللغة', value: currentProgram.languages },
          ]).map((item, idx) => {
            if (item.label === 'حالة التسجيل') {
              const isClosed = item.value === 'مغلق';
              return (
                <div key={idx} className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border ${isClosed ? 'bg-gray-50 border-gray-200' : 'bg-green-50 border-green-200'}`}>
                  <span className="text-[12px] md:text-[13px] font-bold text-gray-500">{item.label}</span>
                  <span className={`inline-flex items-center gap-1.5 font-black text-[13px] md:text-[14px] ${isClosed ? 'text-gray-600' : 'text-green-700'}`}>
                    <Circle className={`w-2 h-2 fill-current ${isClosed ? 'text-gray-400' : 'text-green-500'}`} />
                    {item.value}
                  </span>
                </div>
              );
            }
            const Icon = getMetaIcon(item.label);
            return (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 lg:w-4 lg:h-4 text-[#C08F2D]" />
                </div>
                <div>
                  <p className="text-[11px] md:text-[12px] lg:text-[11px] font-bold text-gray-500 mb-0.5">{item.label}</p>
                  <p className="text-[13px] md:text-[15px] lg:text-[13px] font-black text-gray-800">{item.value}</p>
                </div>
              </div>
            );
          })}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 lg:w-10 lg:h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
              <LayoutTemplate className="w-5 h-5 lg:w-4 lg:h-4 text-[#C08F2D]" />
            </div>
            <div>
              <p className="text-[11px] md:text-[12px] lg:text-[11px] font-bold text-gray-500 mb-0.5">مسار البرنامج</p>
              <p style={{ color: getPathwayColor(currentProgram.pathway) }} className="text-[13px] md:text-[15px] lg:text-[13px] font-black">{currentProgram.pathway}</p>
            </div>
          </div>
        </div>
        {currentProgram.ctaUrl ? (
          <>
            <a
              href={currentProgram.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={
                currentProgram.registrationStatus === 'مغلق'
                  ? "w-full bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 px-6 py-4 lg:py-3 2xl:py-4 rounded-2xl lg:rounded-xl 2xl:rounded-2xl font-black text-[14px] md:text-[15px] lg:text-[14px] transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
                  : "w-full bg-[#8a1538] hover:bg-[#680f2a] text-white px-6 py-4 lg:py-3 2xl:py-4 rounded-2xl lg:rounded-xl 2xl:rounded-2xl font-black text-[14px] md:text-[15px] lg:text-[14px] transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer group"
              }
            >
              <ExternalLink className="w-5 h-5 lg:w-4 lg:h-4 transform group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
              <span>{currentProgram.ctaLabel || 'زيارة الموقع الرسمي'}</span>
            </a>
            {currentProgram.registrationStatus === 'مغلق' && (
              <p className="text-center text-gray-500 font-medium text-[11px] md:text-[12px] mt-3">
                التسجيل مغلق حالياً؛ زر الموقع الرسمي لمتابعة موعد فتح الدفعة القادمة.
              </p>
            )}
          </>
        ) : (
          <button
            onClick={() => onNavigate('contact')}
            className="w-full bg-[#8a1538] hover:bg-[#680f2a] text-white px-6 py-4 lg:py-3 2xl:py-4 rounded-2xl lg:rounded-xl 2xl:rounded-2xl font-black text-[14px] md:text-[15px] lg:text-[14px] transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer group"
          >
            <ArrowLeft className="w-5 h-5 lg:w-4 lg:h-4 transform group-hover:-translate-x-1.5 transition-transform" strokeWidth={2.5} />
            <span>تواصل معنا للاستفسار</span>
          </button>
        )}
      </div>
    </div>
  );
}
