'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 记录错误到错误报告服务
    console.error('全局错误:', error)
  }, [error])

  return (
    <html lang="zh">
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white p-4">
          <div className="max-w-md w-full bg-[#212121] p-8 rounded-lg shadow-lg border border-[#2a2a2a]">
            <h2 className="text-2xl font-bold text-red-500 mb-4">系统错误</h2>
            <p className="text-gray-300 mb-6">
              非常抱歉，系统发生了意外错误。请尝试刷新页面或联系我们的支持团队。
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => reset()}
                className="bg-red-500 hover:bg-red-400 text-white font-medium py-2 px-4 rounded"
              >
                重试
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
} 