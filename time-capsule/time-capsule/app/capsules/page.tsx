'use client';

import { useEffect, useState } from 'react';

interface Capsule {
  id: string;
  public_id: string;
  name: string;
  title: string;
  message: string;
  unlock_at: string;
  created_at: string;
  is_unlocked: boolean;
}

export default function CapsulesPage() {
  const [capsules, setCapsules] = useState<Capsule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCapsules() {
      try {
        const response = await fetch('https://timecapsule-u7ec.onrender.com/capsules');
        if (!response.ok) {
          throw new Error('Failed to fetch capsules');
        }
        const data: Capsule[] = await response.json();
        setCapsules(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchCapsules();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold">Loading capsules...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Time Capsules</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {capsules.map((capsule) => (
            <div
              key={capsule.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{capsule.title}</h2>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">From:</span> {capsule.name}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">Message:</span> {capsule.message}
              </p>
              <p className="text-sm text-gray-500">
                Created: {new Date(capsule.created_at).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Unlocks: {new Date(capsule.unlock_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}