'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    };
    checkUser();
  }, [router]);

  if (loading) return <div className="flex min-h-screen items-center justify-center">載入中...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">歡迎回來，Sango Teambuilder！</h1>
        <p className="text-gray-600 mb-8">你已成功登入 • 現在開始組隊吧</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 快速按鈕 */}
          <button
            onClick={() => router.push('/team-builder')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-8 rounded-3xl text-left shadow-lg"
          >
            <div className="text-5xl mb-4">⚔️</div>
            <h2 className="text-2xl font-bold">新建隊伍</h2>
            <p className="text-blue-200">即時面板計算 + 模擬</p>
          </button>

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white p-8 rounded-3xl text-left shadow-lg">
            <div className="text-5xl mb-4">🛡️</div>
            <h2 className="text-2xl font-bold">我的武將庫</h2>
            <p className="text-emerald-200">管理面板數據</p>
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 text-white p-8 rounded-3xl text-left shadow-lg">
            <div className="text-5xl mb-4">🔥</div>
            <h2 className="text-2xl font-bold">熱門推薦隊伍</h2>
            <p className="text-purple-200">社群分享</p>
          </button>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          已登入用戶：{user?.email || 'Line / Google 用戶'}<br />
          <button
            onClick={() => supabase.auth.signOut().then(() => router.push('/login'))}
            className="mt-4 text-red-600 underline"
          >
            登出
          </button>
        </div>
      </div>
    </div>
  );
}
