'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'   // ← 正確 alias，已確認可用

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // Google 登入
  const handleGoogleLogin = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    })
    if (error) setMessage(error.message)
    setLoading(false)
  }

  // Line 登入（透過 boompapi.com/sango）
  const handleLineLogin = () => {
    window.location.href = 'https://boompapi.com/sango'
  }

  // Email + Password 登入
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) setMessage(error.message)
    setLoading(false)
  }

  // Email 註冊
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    })
    if (error) setMessage(error.message)
    else setMessage('註冊成功！請檢查 Email 確認')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Sango Teambuilder</h1>
        <p className="text-center text-gray-600 mb-8">登入你的 SGS 帳號</p>

        {/* Google 登入 */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full mb-4 py-4 px-6 bg-white border border-gray-300 hover:bg-gray-50 rounded-xl flex items-center justify-center gap-3 text-lg font-medium"
        >
          <span className="text-2xl">🔵</span>
          <span>Google 登入</span>
        </button>

        {/* Line 登入 */}
        <button
          onClick={handleLineLogin}
          disabled={loading}
          className="w-full mb-4 py-4 px-6 bg-[#00C300] hover:bg-[#00A000] text-white rounded-xl flex items-center justify-center gap-3 text-lg font-medium"
        >
          <span className="text-2xl">🟢</span>
          <span>Line 登入（boompapi）</span>
        </button>

        {/* 分隔線 */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-gray-500">或使用 Email</span>
          </div>
        </div>

        {/* Email 表單 */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <input
            type="email"
            placeholder="你的 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            required
          />
          <input
            type="password"
            placeholder="密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-medium"
          >
            {loading ? '登入中...' : 'Email 登入'}
          </button>

          <button
            type="button"
            onClick={handleEmailSignUp}
            disabled={loading}
            className="w-full py-4 bg-gray-800 hover:bg-gray-900 text-white rounded-xl text-lg font-medium"
          >
            註冊新帳號
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          登入後可建立多角色、雲端存檔隊伍
        </p>
      </div>
    </div>
  )
}
