"use client";

// import { PageSidebar } from './components/page-sidebar';
import PrismPage from './pages/PrismPage';
import { Navigate, Route, Routes } from 'react-router-dom';

// const pages = [
//   { id: 1, label: "Cilindro", path: "/cylinder" },
//   { id: 2, label: "Esfera", path: "/sphere" },
//   { id: 3, label: "Cubo", path: "/cube" },
// ];

export default function Page() {

  return (
    <div className="bg-background flex flex-col">
      
      <div className="flex flex-1">
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Navigate to="/prism" replace />} />

            <Route path="/prism" element={<PrismPage />} />
            {/* <Route path="/sphere" element={<SpherePage />} />
            <Route path="/cube" element={<CubePage />} /> */}
          </Routes>
        </main>

        {/* <PageSidebar
          pages={pages}
        /> */}
      </div>
    </div>
  );
}
