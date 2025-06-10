'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 可以在这里记录错误到错误报告服务
    console.error('发生了错误:', error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1a1a] text-white p-4">
      <div className="max-w-md w-full bg-[#212121] p-8 rounded-lg shadow-lg border border-[#2a2a2a]">
        <h2 className="text-2xl font-bold text-amber-500 mb-4">出现了一点问题</h2>
        <p className="text-gray-300 mb-6">
          很抱歉，我们在加载这个页面时遇到了一些麻烦。请尝试刷新页面或返回首页。
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={reset}
            className="bg-amber-500 hover:bg-amber-400 text-black font-medium"
          >
            重试
          </Button>
          <Button
            onClick={() => window.location.href = '/'}
            className="bg-gray-700 hover:bg-gray-600 text-white"
          >
            返回首页
          </Button>
        </div>
      </div>
    </div>
  )
} 