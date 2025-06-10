export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#1a1a1a]/70 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          {/* 鸡尾酒杯摇晃动画 */}
          <div className="absolute inset-0 flex items-center justify-center animate-pulse">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 10 L42 25 L42 40 L38 45 L26 45 L22 40 L22 25 L32 10Z" 
                    stroke="#ef4444" strokeWidth="2" fill="none" className="animate-[wiggle_1s_ease-in-out_infinite]"/>
              <path d="M26 45 L26 55 L38 55" stroke="#ef4444" strokeWidth="2" fill="none" />
              <path d="M22 25 L42 25" stroke="#ef4444" strokeWidth="2" />
              <circle cx="32" cy="30" r="2" fill="#ef4444" className="animate-ping" />
            </svg>
          </div>
        </div>
        <p className="mt-4 text-amber-500 font-medium text-lg animate-pulse">
          调制中...
        </p>
      </div>
    </div>
  )
}

// 添加摇晃动画
const wiggleKeyframes = `
@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
`;

// 将动画添加到全局样式
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = wiggleKeyframes;
  document.head.appendChild(style);
}
