'use client';

import { useState } from 'react';
export default function TeamBuilder() {
  const [general, setGeneral] = useState({
    name: '曹操',
    level: 100,
    redStar: 5,
    diancang: 3,
    xingxiang: 2,
  });
const calculatePanel = () => {
    const base = 1000; // 假設基礎值
    const total = base * (1 + general.redStar * 0.2) * (1 + general.level / 100);
    return Math.round(total);
  };
return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">面板計算器</h1>
      
      <div className="max-w-md bg-gray-800 rounded-3xl p-8">
        <h2 className="text-xl mb-4">{general.name}</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-1">等級</label>
            <input
              type="number"
              value={general.level}
              onChange={(e) => setGeneral({ ...general, level: Number(e.target.value) })}
              className="w-full bg-gray-700 p-3 rounded-2xl"
            />
          </div>
<div>
            <label className="block text-sm mb-1">紅度</label>
            <input
              type="number"
              value={general.redStar}
              onChange={(e) => setGeneral({ ...general, redStar: Number(e.target.value) })}
              className="w-full bg-gray-700 p-3 rounded-2xl"
            />
          </div>

          <div className="bg-gray-700 p-6 rounded-3xl text-center">
            <div className="text-5xl font-bold text-yellow-400">
              {calculatePanel()}
            </div>
            <div className="text-sm text-gray-400 mt-2">綜合面板值（預覽）</div>
          </div>
        </div>
<button className="w-full mt-8 bg-green-600 hover:bg-green-500 py-4 rounded-3xl text-lg font-medium">
          保存到我的武將庫
        </button>
</div>
    </div>
  );
}
