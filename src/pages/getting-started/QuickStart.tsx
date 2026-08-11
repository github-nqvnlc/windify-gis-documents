import { useState } from 'react';
import {
    WindifyGeoJSON,
    WindifyMap,
    WindifyMarker,
    WindifyPopup,
} from "@vn-gis/windify-gis/react";
import { CodeBlock } from "@/components/code-block";

const quickStartCode = `// Bạn có thể sao chép đoạn mã dưới đây vào ứng dụng của mình. Lưu ý, container bọc ngoài bản đồ <strong>phải có</strong> thuộc tính chiều cao (height) cụ thể để bản đồ có thể hiển thị.
import React from 'react';
// Quan trọng: Đừng quên import CSS của Leaflet vào root của ứng dụng
import 'leaflet/dist/leaflet.css';

import { 
  WindifyGeoJSON, 
  WindifyMap, 
  WindifyMarker, 
  WindifyPopup 
} from '@vn-gis/windify-gis/react';

export default function App() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <WindifyMap baseMapUrl="" center={[110.2022, 16.0544]} zoom={7.8} minZoom={7} maxZoom={8}>
        
        {/* Thêm một điểm Marker */}
        <WindifyMarker position={[108.2022, 16.0544]} title="Đà Nẵng">
          <WindifyPopup>
            <strong>Trung tâm Đà Nẵng</strong>
          </WindifyPopup>
        </WindifyMarker>
        
        {/* Render Layer ranh giới từ GeoJSON URL */}
        <WindifyGeoJSON
          id="sample-polygons"
          data="/geojson/43_da_nang/43_da_nang.geojson"
          style={{ fillColor: '#3388ff', fillOpacity: 0.3 }}
          visible={true}
          onError={(error) => console.error(error)}
        />
        
      </WindifyMap>
    </div>
  );
}`;

export default function QuickStart() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Bắt đầu nhanh
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Ví dụ dưới đây thể hiện cách khởi tạo một bản đồ cơ bản, thêm Marker, hiển thị Popup và load dữ liệu GeoJSON từ xa bằng kiến trúc Declarative.
                </p>
            </div>

            {/* Dynamic Content Area (Code or Demo) */}
            <div className="space-y-6">

                {/* Section Header & Toggle */}
                <div className="flex items-center justify-between border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {showDemo ? "Live Demo" : "Mã nguồn (Code)"}
                    </h2>
                    <button
                        onClick={() => setShowDemo(!showDemo)}
                        className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-md shadow hover:bg-primary/90 transition-all active:scale-95"
                    >
                        {showDemo ? "Hiển thị Code" : "Hiển thị Live Demo"}
                    </button>
                </div>

                {showDemo ? (
                    /* Live Demo Section */
                    <div className="space-y-4 animate-in fade-in duration-500">
                        {/* Đảm bảo container bản đồ có z-index an toàn để không đè lên header/sidebar */}
                        <div className="aspect-5/2.5 rounded-xl overflow-hidden border shadow-sm relative isolate z-0">
                            <WindifyMap baseMapUrl="carto-voyager-nolabels" center={[110.2022, 16.0544]} zoom={7.8} minZoom={7} maxZoom={8}>
                                <WindifyMarker position={[108.2022, 16.0544]} title="Đà Nẵng">
                                    <WindifyPopup>
                                        <div className="text-sm font-semibold">Trung tâm Đà Nẵng</div>
                                    </WindifyPopup>
                                </WindifyMarker>
                                <WindifyGeoJSON
                                    id="sample-polygons"
                                    data="/geojson/43_da_nang/43_da_nang.geojson"
                                    style={{ fillColor: "#3388ff", fillOpacity: 0.3, color: "#3388ff", weight: 2 }}
                                    visible={true}
                                    onError={(error: any) => console.error("Lỗi GeoJSON:", error)}
                                />
                            </WindifyMap>
                        </div>
                    </div>
                ) : (
                    /* Code Snippet Section */
                    <div className="aspect-5/2.5 space-y-4 animate-in fade-in duration-500">
                        <CodeBlock code={quickStartCode} />
                    </div>
                )}

            </div>
        </div>
    );
}