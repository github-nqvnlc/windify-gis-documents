import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import { extractCoordinates } from "@vn-gis/windify-gis/core";

const usageCode = `import { extractCoordinates } from "@vn-gis/windify-gis/core";

const geojsonData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: { type: "Point", coordinates: [106.6, 10.7] }
    },
    {
      type: "Feature",
      geometry: { type: "LineString", coordinates: [[106.7, 10.8], [106.8, 10.9]] }
    }
  ]
};

// Trích xuất toàn bộ (làm phẳng - flatten) tọa độ từ FeatureCollection
const coords = extractCoordinates(geojsonData);

console.log(coords);
// Kết quả:
// [ [ 106.6, 10.7 ], [ 106.7, 10.8 ], [ 106.8, 10.9 ] ]
`;

function ExtractLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        if (!isReady || !engine) return;

        // Dữ liệu hỗn hợp: Có Point, có LineString, có Polygon
        const complexGeoJSON: any = {
            "type": "FeatureCollection",
            "features": [
                {
                    "type": "Feature",
                    "geometry": { "type": "Point", "coordinates": [106.63, 10.73] },
                    "properties": {}
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": [[106.64, 10.74], [106.66, 10.76], [106.67, 10.75]]
                    },
                    "properties": {}
                },
                {
                    "type": "Feature",
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [
                            [
                                [106.68, 10.72],
                                [106.70, 10.72],
                                [106.70, 10.74],
                                [106.68, 10.74],
                                [106.68, 10.72]
                            ]
                        ]
                    },
                    "properties": {}
                }
            ]
        };

        // 1. Trích xuất (flatten) toàn bộ mảng tọa độ nằm sâu bên trong
        const flatCoordinates = extractCoordinates(complexGeoJSON);
        setCount(flatCoordinates.length);

        // 2. Chấm từng tọa độ trích xuất được lên bản đồ để chứng minh
        // Dùng cụm marker cluster cho nhẹ vì nếu có 10,000 điểm thì nó vẫn cân được
        engine.addMarkerCluster({
            id: "extracted-points",
            markers: flatCoordinates.map((coord, idx) => ({
                position: coord as [number, number],
                element: `<div class="w-3 h-3 bg-purple-500 rounded-full border border-white shadow animate-pulse"></div>`,
                title: `Tọa độ số ${idx + 1}`
            }))
        });

        // Focus
        engine.setCenter([106.66, 10.74]);
        engine.setZoom(12);

        return () => {
            engine.clearMarkers();
        };
    }, [engine, isReady]);

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-2 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[220px] pointer-events-auto">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Coordinate Extractor</h4>
                <p className="text-xs text-muted-foreground mt-1">Sử dụng extractCoordinates()</p>
            </div>

            <div className="bg-muted p-2 rounded text-xs font-mono text-foreground border mt-2 flex flex-col">
                <span className="text-muted-foreground">Tổng số điểm trích xuất:</span>
                <span className="text-purple-500 font-bold text-xl text-center mt-1">{count}</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1 leading-tight italic">
                Các điểm màu tím nhấp nháy trên bản đồ chính là tọa độ đã được "kéo" ra khỏi những mảng lồng nhau phức tạp của GeoJSON gốc.
            </p>
        </div>
    );
}

export default function SpatialUtilsExtractCoordinatesDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">extractCoordinates()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Hàm cấp thấp <code className="bg-muted px-1.5 py-0.5 rounded text-base">extractCoordinates(data: GeoJSONDocument): Position[]</code> được dùng để "làm phẳng" (flatten) toàn bộ tọa độ lồng nhau sâu thẳm bên trong GeoJSON thành một mảng 1 chiều chứa các cặp tọa độ <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">[Lng, Lat]</code>.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả Kỹ thuật</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Giải quyết bài toán mảng đa chiều:</strong>
                            Trong cấu trúc chuẩn GeoJSON, Point là mảng 1 chiều <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">[lng,lat]</code>, LineString là mảng 2 chiều, Polygon là mảng 3 chiều, MultiPolygon là mảng 4 chiều. Hàm này sử dụng đệ quy để đào qua toàn bộ cấu trúc cây và trả về một list sạch sẽ nhất.
                        </li>
                        <li>
                            <strong className="text-foreground">Tính ứng dụng:</strong>
                            Hàm này chính là lõi (core) ẩn bên trong các hàm <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">getGeoJSONBounds</code> và <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">getGeoJSONExtremes</code>. Bằng cách đẩy mọi tọa độ thành 1 chuỗi liên tiếp, hệ thống mới có thể lặp qua 1 lượt để tìm ra giá trị Min/Max. Bạn cũng có thể dùng nó để render một heatmap hoặc tính toán mật độ.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ</h2>
                    <div className="flex bg-muted p-1 rounded-lg ml-auto">
                        <button
                            onClick={() => setShowDemo(false)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!showDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Code
                        </button>
                        <button
                            onClick={() => setShowDemo(true)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Live Demo
                        </button>
                    </div>
                </div>
                <p className="text-muted-foreground leading-7">
                    Demo tạo ra một cấu trúc GeoJSON cực kỳ "hầm bà lằng" chứa hỗn hợp cả Point, LineString và Polygon. Hàm <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">extractCoordinates</code> sẽ lôi đầu toàn bộ tọa độ ra để cắm các Marker màu tím lên bản đồ chứng minh thành quả.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.66, 10.74]} zoom={12}>
                                <ExtractLiveDemoControls />
                            </WindifyMap>
                        </div>
                    ) : (
                        <div className="rounded-xl border shadow-sm overflow-hidden m-0">
                            <CodeBlock language="typescript" code={usageCode} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
