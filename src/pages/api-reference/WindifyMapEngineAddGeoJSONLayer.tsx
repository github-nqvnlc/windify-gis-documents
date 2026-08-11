import { useState, useEffect } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { useEffect } from "react";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";
import type { GeoJSONLayerOptions } from "@vn-gis/windify-gis/core";

const GeoJSONDemo = () => {
  const { engine, isReady } = useWindifyMap();

  useEffect(() => {
    if (!isReady || !engine) return;

    // 1. Dữ liệu mẫu GeoJSON
    const sampleGeoJSON = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: { name: "Vùng trung tâm" },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [106.65, 10.77],
                [106.67, 10.77],
                [106.67, 10.75],
                [106.65, 10.75],
                [106.65, 10.77]
              ]
            ]
          }
        }
      ]
    };

    // 2. Cấu hình tuỳ chọn GeoJSONLayerOptions
    const options: GeoJSONLayerOptions = {
      id: "demo-layer-1", // Cần một ID duy nhất
      data: sampleGeoJSON, // Có thể truyền URL thay vì Object
      style: {
        fillColor: "rgba(59, 130, 246, 0.5)",
        color: "#1d4ed8",
        weight: 2
      },
      onClick: (feature, event) => {
        alert(\`Bạn vừa click vào vùng: \${feature.properties?.name}\`);
      }
    };

    // 3. Thêm layer vào bản đồ (Lưu ý: hàm này trả về Promise)
    engine.addGeoJSONLayer(options).then(() => {
      console.log("Đã tải xong GeoJSON Layer");
    });

    return () => {
      // 4. Xóa layer khi component unmount
      engine.removeLayer("demo-layer-1");
    };
  }, [engine, isReady]);

  return null;
};

export default function App() {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
        <GeoJSONDemo />
      </WindifyMap>
    </div>
  );
}`;

function LiveDemoGeoJSON() {
    const { engine, isReady } = useWindifyMap();
    const [status, setStatus] = useState<string>("Đang tải...");

    useEffect(() => {
        if (!isReady || !engine) return;

        setStatus("Đang tải dữ liệu...");

        // Dữ liệu giả lập
        const sampleData: any = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: { name: "Khu vực A", type: "residential" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [106.65, 10.77],
                                [106.66, 10.77],
                                [106.66, 10.76],
                                [106.65, 10.76],
                                [106.65, 10.77]
                            ]
                        ]
                    }
                },
                {
                    type: "Feature",
                    properties: { name: "Khu vực B", type: "commercial" },
                    geometry: {
                        type: "Polygon",
                        coordinates: [
                            [
                                [106.665, 10.765],
                                [106.675, 10.765],
                                [106.675, 10.755],
                                [106.665, 10.755],
                                [106.665, 10.765]
                            ]
                        ]
                    }
                }
            ]
        };

        const layerId = "interactive-geojson";

        // Thêm layer
        engine.addGeoJSONLayer({
            id: layerId,
            data: sampleData,
            // Styling dạng function dựa trên thuộc tính 'type'
            style: (feature) => {
                if (feature.properties?.type === "commercial") {
                    return { fillColor: "hsl(var(--destructive))", color: "hsl(var(--destructive))", fillOpacity: 0.4, weight: 2 };
                }
                return { fillColor: "hsl(var(--primary))", color: "hsl(var(--primary))", fillOpacity: 0.4, weight: 2 };
            },
            onClick: (feature) => {
                setStatus(`Đã click vào: ${feature.properties?.name}`);
            }
        }).then(() => {
            setStatus("Sẵn sàng! Hãy click vào các vùng màu.");
        }).catch((err) => {
            setStatus(`Lỗi: ${err.message}`);
        });

        return () => {
            engine.removeLayer(layerId);
        };
    }, [engine, isReady]);

    return (
        <div className="absolute top-4 left-4 z-[999] flex flex-col gap-2 bg-background/95 p-3 rounded-xl shadow-lg border backdrop-blur-sm min-w-[200px]">
            <h4 className="text-sm font-semibold text-foreground">Trạng thái GeoJSON</h4>
            <div className="text-xs font-medium text-muted-foreground bg-muted p-2 rounded flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                {status}
            </div>
            <div className="text-[10px] text-muted-foreground italic leading-tight">
                *Thử click vào các vùng đa giác
            </div>
        </div>
    );
}

export default function WindifyMapEngineAddGeoJSONDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary break-all">addGeoJSONLayer()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded text-base">addGeoJSONLayer(options: GeoJSONLayerOptions): Promise&lt;void&gt;</code> cho phép bạn đưa dữ liệu không gian định dạng chuẩn GeoJSON (Feature, Polygon, LineString,...) lên bản đồ một cách trực quan, có hỗ trợ tạo kiểu (styling) và tương tác.
                </p>
            </div>

            {/* Cấu trúc Options */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả GeoJSONLayerOptions</h2>
                <div className="mt-2 m-0 [&_pre]:my-0">
                    <CodeBlock language="typescript" code={`interface GeoJSONLayerOptions {
  id: string;                                                              // Định danh duy nhất để quản lý (xóa/ẩn/hiện)
  data: GeoJSONData;                                                       // Có thể truyền một JSON Object hoặc URL chuỗi trỏ đến file GeoJSON
  style?: GeoJSONStyle | GeoJSONStyleFunction;                             // Cách trang trí các Feature
  visible?: boolean;                                                       // Trạng thái hiển thị ban đầu (mặc định true)
  onClick?: (feature: GeoJSONFeature, event: WindifyMapEvent) => void;     // Hàm xử lý khi user click
}`} />
                </div>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Những điều cần lưu ý</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Xử lý Bất đồng bộ (Promise):</strong>
                            Việc thêm GeoJSON layer có thể mất thời gian (ví dụ nếu <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">data</code> là một URL cần tải về qua mạng). Do đó, hàm này trả về một <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">Promise</code>. Nếu có lỗi mạng hoặc định dạng file bị hỏng, Promise sẽ bị <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">reject</code>. Nếu cùng một <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">id</code> đang được cập nhật, layer cũ chỉ bị thay thế khi dữ liệu mới đã tải thành công 100%.
                        </li>
                        <li>
                            <strong className="text-foreground">Styling nâng cao:</strong>
                            Thuộc tính <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">style</code> có thể nhận một Object tĩnh (như <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">{`{ fillColor: "red" }`}</code>), hoặc xịn sò hơn là một <em>Hàm (Function)</em> <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">(feature) =&gt; StyleObject</code>. Bằng cách này, bạn có thể kiểm tra <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">feature.properties</code> và tô màu đỏ cho đất thương mại, màu xanh cho đất dân cư như trong Live Demo bên dưới.
                        </li>
                        <li>
                            <strong className="text-foreground">Quản lý ID:</strong>
                            Mỗi layer được quản lý bằng tham số <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">id</code>. Sau khi thêm, bạn có thể gọi <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">removeLayer(id)</code>, <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">setLayerVisibility(id, bool)</code> hoặc <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">hasLayer(id)</code> để thao tác với nó cực kỳ dễ dàng.
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: Dynamic GeoJSON</h2>
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
                    Bản demo dưới đây chèn vào bản đồ 2 vùng Polygon. Phần Styling được code tự động kiểm tra thuộc tính <code className="bg-muted px-1.5 py-0.5 rounded text-sm">type</code> bên trong GeoJSON để quyết định vẽ màu Xanh hay màu Đỏ. Khi click vào từng vùng, tên của vùng đó sẽ được đọc và in lên giao diện.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                                <LiveDemoGeoJSON />
                            </WindifyMap>
                        </div>
                    ) : (
                        <div className="rounded-xl border shadow-sm overflow-hidden m-0">
                            <CodeBlock language="tsx" code={usageCode} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
