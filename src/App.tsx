"use client";

import { Header } from '@radix-ui/themes/components/table';
import { PageSidebar } from './components/page-sidebar';
import CylinderPage from './pages/CylinderPage';
import { Navigate, Route, Routes } from 'react-router-dom';

const pages = [
  { id: 1, label: "Cilindro", path: "/cylinder" },
  { id: 2, label: "Esfera", path: "/sphere" },
  { id: 3, label: "Cubo", path: "/cube" },
];

export default function Page() {

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/cylinder" replace />} />

            <Route path="/cylinder" element={<CylinderPage />} />
            {/* <Route path="/sphere" element={<SpherePage />} />
            <Route path="/cube" element={<CubePage />} /> */}
          </Routes>
        </main>

        <PageSidebar
          pages={pages}
        />
      </div>
    </div>
  );
}
