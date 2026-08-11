import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import { getGeoJSONBounds } from "@vn-gis/windify-gis/core";

const usageCode = `import { getGeoJSONBounds } from "@vn-gis/windify-gis/core";

const geojsonData = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: [[106.6, 10.7], [106.7, 10.8], [106.5, 10.9]]
  }
};

// Tính toán Bounding Box
// Kết quả: [minLng, minLat, maxLng, maxLat]
const bounds = getGeoJSONBounds(geojsonData);
console.log(bounds); // [106.5, 10.7, 106.7, 10.9]
`;

function BoundsLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [boundsResult, setBoundsResult] = useState<string>("Đang tính toán...");

    useEffect(() => {
        if (!isReady || !engine) return;

        // Dữ liệu mẫu: Một đa giác (Polygon) đại diện cho khu vực
        const sampleGeoJSON: any = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [106.63, 10.75],
                        [106.68, 10.73],
                        [106.71, 10.76],
                        [106.66, 10.80],
                        [106.63, 10.75]
                    ]
                ]
            }
        };

        // 1. Vẽ đa giác gốc lên bản đồ
        engine.addGeoJSONLayer({
            id: "sample-polygon",
            data: sampleGeoJSON,
            style: {
                fillColor: "#3b82f6", // Blue
                fillOpacity: 0.3,
                color: "#2563eb",
                weight: 2
            }
        });

        // 2. Gọi hàm tiện ích để tính toán Bounds
        const bounds = getGeoJSONBounds(sampleGeoJSON);
        if (bounds) {
            const [minLng, minLat, maxLng, maxLat] = bounds;
            setBoundsResult(`[${minLng.toFixed(3)}, ${minLat.toFixed(3)}, ${maxLng.toFixed(3)}, ${maxLat.toFixed(3)}]`);

            // 3. Trực quan hóa Bounding Box bằng một GeoJSON hình chữ nhật nét đứt
            const bboxGeoJSON: any = {
                "type": "Feature",
                "properties": {},
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [
                        [
                            [minLng, minLat],
                            [maxLng, minLat],
                            [maxLng, maxLat],
                            [minLng, maxLat],
                            [minLng, minLat]
                        ]
                    ]
                }
            };

            engine.addGeoJSONLayer({
                id: "bounding-box",
                data: bboxGeoJSON,
                style: {
                    fillColor: "transparent",
                    color: "#ef4444", // Red
                    weight: 2,
                    dashArray: "5, 5" // Nét đứt
                }
            });

            // Tự động fit bounds (bằng cách mượn hàm setCenter tạm thời vào giữa box)
            engine.setCenter([(minLng + maxLng) / 2, (minLat + maxLat) / 2]);
            engine.setZoom(12);
        } else {
            setBoundsResult("Lỗi: Không tìm thấy tọa độ hợp lệ");
        }

        return () => {
            engine.removeLayer("sample-polygon");
            engine.removeLayer("bounding-box");
        };
    }, [engine, isReady]);

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-2 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[240px] pointer-events-auto">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Bounding Box Calculator</h4>
                <p className="text-xs text-muted-foreground mt-1">Sử dụng getGeoJSONBounds()</p>
            </div>

            <div className="bg-muted p-2 rounded text-xs font-mono text-foreground border mt-2 break-all">
                Kết quả:<br />
                <span className="text-rose-500 font-bold">{boundsResult}</span>
            </div>

            <div className="text-[11px] text-muted-foreground leading-tight space-y-1 mt-2">
                <p><span className="inline-block w-3 h-3 bg-blue-500/30 border border-blue-600 mr-1 align-middle"></span> Đa giác gốc</p>
                <p><span className="inline-block w-3 h-3 border-2 border-dashed border-red-500 mr-1 align-middle"></span> Bounding Box (Kết quả)</p>
            </div>
        </div>
    );
}

export default function SpatialUtilsGetGeoJSONBoundsDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">getGeoJSONBounds()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Hàm tiện ích <code className="bg-muted px-1.5 py-0.5 rounded text-base">getGeoJSONBounds(data: GeoJSONDocument): [number, number, number, number]</code> giúp tính toán nhanh <strong>Bounding Box</strong> (khung bao ngoài) của bất kỳ dữ liệu GeoJSON nào, bất kể cấu trúc phức tạp đến đâu.
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả Kỹ thuật</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Tham số đầu vào:</strong>
                            Nhận vào một đối tượng GeoJSON (<code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">Geometry</code>, <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">Feature</code>, hoặc <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">FeatureCollection</code>).
                        </li>
                        <li>
                            <strong className="text-foreground">Đầu ra:</strong>
                            Trả về một mảng chứa 4 số thực (Float) đại diện cho tọa độ các góc của khung chữ nhật bao quanh toàn bộ dữ liệu: <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">[minLng, minLat, maxLng, maxLat]</code>.
                        </li>
                        <li>
                            <strong className="text-foreground">Độc lập với Map Engine:</strong>
                            Hàm này là một tiện ích tính toán toán học thuần túy (Pure Function), nằm độc lập trong gói <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">@vn-gis/windify-gis/core</code>. Nó chạy ngay trên trình duyệt mà không cần khởi tạo bản đồ (Map instance).
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
                    Live Demo trực quan hóa cách hệ thống quét qua tọa độ của một đa giác bất quy tắc (màu xanh), từ đó nội suy ra tọa độ nhỏ nhất (Min) và lớn nhất (Max) để vẽ thành một hình chữ nhật bao bọc vừa khít (nét đứt màu đỏ).
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660, 10.762]} zoom={11}>
                                <BoundsLiveDemoControls />
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
