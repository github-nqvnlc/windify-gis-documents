import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, type IWindifyMapEngine } from "@vn-gis/windify-gis/react";

const basicUsageCode = `import { WindifyMap } from '@vn-gis/windify-gis/react';
import 'leaflet/dist/leaflet.css';

export default function App() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <WindifyMap 
        center={[106.660172, 10.762622]} 
        zoom={12}
        minZoom={5}
        maxZoom={18}
      >
        {/* Các component bản đồ khác (Marker, GeoJSON, v.v...) */}
      </WindifyMap>
    </div>
  );
}`;

const advancedUsageCode = `import { WindifyMap, type IWindifyMapEngine } from '@vn-gis/windify-gis/react';

export default function App() {
  const handleMapReady = (engine: IWindifyMapEngine) => {
    // Lấy instance native của Leaflet để xử lý nâng cao
    const leafletMap = engine.getNativeMap();
    console.log('Bản đồ đã sẵn sàng!', leafletMap);
  };

  return (
    <div className="w-full h-screen">
      <WindifyMap 
        center={[106.660172, 10.762622]} 
        zoom={12}
        onMapReady={handleMapReady}
      />
    </div>
  );
}`;

export default function WindifyMapDoc() {
    const [showDemo, setShowDemo] = useState(false);
    const [showAdvancedDemo, setShowAdvancedDemo] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const handleMapReady = (engine: IWindifyMapEngine) => {
        const leafletMap = engine.getNativeMap();
        // @ts-ignore
        const mapName = leafletMap?.constructor?.name || 'Leaflet Map';
        setLogs(prev => [...prev, `Bản đồ đã sẵn sàng! Native Map Instance: ${mapName}`]);
    };

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary">&lt;WindifyMap /&gt;</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Component gốc và quan trọng nhất trong <code className="bg-muted px-2 py-1 rounded text-sm">@vn-gis/windify-gis/react</code>. Nó đóng vai trò khởi tạo engine bản đồ (Leaflet) và là container chứa các component bản đồ con khác.
                </p>
            </div>

            {/* Properties Section */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Properties (Props)</h2>
                <div className="overflow-x-auto rounded-md border">
                    <table className="w-full text-sm text-left border-collapse">
                        <thead className="bg-muted/50 text-muted-foreground">
                            <tr>
                                <th className="px-4 py-3 border-b font-medium whitespace-nowrap">Prop</th>
                                <th className="px-4 py-3 border-b font-medium whitespace-nowrap">Kiểu dữ liệu</th>
                                <th className="px-4 py-3 border-b font-medium whitespace-nowrap">Mặc định</th>
                                <th className="px-4 py-3 border-b font-medium">Mô tả</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">center<span className="text-destructive ml-1">*</span></td>
                                <td className="px-4 py-3 font-mono text-xs">[number, number]</td>
                                <td className="px-4 py-3 text-muted-foreground">-</td>
                                <td className="px-4 py-3">Tâm bản đồ theo chuẩn EPSG:4326 <code className="bg-muted px-1 py-0.5 rounded text-xs">[longitude, latitude]</code>.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold text-primary">zoom<span className="text-destructive ml-1">*</span></td>
                                <td className="px-4 py-3 font-mono text-xs">number</td>
                                <td className="px-4 py-3 text-muted-foreground">-</td>
                                <td className="px-4 py-3">Mức zoom ban đầu của bản đồ.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold">minZoom</td>
                                <td className="px-4 py-3 font-mono text-xs">number</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                                <td className="px-4 py-3">Mức zoom tối thiểu cho phép (bản đồ không thể zoom nhỏ hơn mức này).</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold">maxZoom</td>
                                <td className="px-4 py-3 font-mono text-xs">number</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                                <td className="px-4 py-3">Mức zoom tối đa cho phép (bản đồ không thể zoom lớn hơn mức này).</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold">engine</td>
                                <td className="px-4 py-3 font-mono text-xs">'leaflet'</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">'leaflet'</td>
                                <td className="px-4 py-3">Engine bản đồ sử dụng bên dưới. Hiện tại hỗ trợ mặc định là Leaflet.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold">baseMapUrl</td>
                                <td className="px-4 py-3 font-mono text-xs">string</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                                <td className="px-4 py-3">Đường dẫn Tile URL tùy chỉnh cho Leaflet (ví dụ: OpenStreetMap, Google Maps).</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold">className</td>
                                <td className="px-4 py-3 font-mono text-xs">string</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                                <td className="px-4 py-3">CSS class áp dụng cho thẻ div container bọc bản đồ.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold">style</td>
                                <td className="px-4 py-3 font-mono text-xs">React.CSSProperties</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">default sizes</td>
                                <td className="px-4 py-3">Inline style cho container. Mặc định tự động phủ kín (<code className="bg-muted px-1 py-0.5 rounded text-xs">width: 100%, height: 100%, minHeight: 400px</code>).</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold">onMapReady</td>
                                <td className="px-4 py-3 font-mono text-xs">(engine: IWindifyMapEngine) {`=>`} void</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                                <td className="px-4 py-3">Callback được gọi ngay sau khi engine bản đồ khởi tạo thành công. Hữu ích khi cần tương tác API trực tiếp.</td>
                            </tr>
                            <tr className="hover:bg-muted/30">
                                <td className="px-4 py-3 font-mono font-semibold">children</td>
                                <td className="px-4 py-3 font-mono text-xs">React.ReactNode</td>
                                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                                <td className="px-4 py-3">Các component con (<code className="bg-muted px-1 py-0.5 rounded text-xs">WindifyMarker, WindifyPopup, WindifyGeoJSON...</code>) bên trong bản đồ.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Basic Usage Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Cách sử dụng cơ bản</h2>
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
                    Sử dụng component <code className="bg-muted px-1.5 py-0.5 rounded text-sm">WindifyMap</code> và truyền vào bắt buộc hai prop: <code className="bg-muted px-1.5 py-0.5 rounded text-sm">center</code> và <code className="bg-muted px-1.5 py-0.5 rounded text-sm">zoom</code>. Đừng quên import file CSS của leaflet ở đầu ứng dụng.
                </p>

                <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
                    {showDemo ? (
                        <div className="w-full h-[500px] relative z-0">
                            <WindifyMap
                                center={[106.660172, 10.762622]}
                                zoom={12}
                                minZoom={5}
                                maxZoom={18}
                            />
                        </div>
                    ) : (
                        <div className="m-0 border-0 rounded-none shadow-none">
                            <CodeBlock language="tsx" code={basicUsageCode} />
                        </div>
                    )}
                </div>
            </div>

            {/* Advanced Usage Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Sử dụng nâng cao (onMapReady)</h2>
                    <div className="flex bg-muted p-1 rounded-lg ml-auto">
                        <button
                            onClick={() => setShowAdvancedDemo(false)}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!showAdvancedDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Code
                        </button>
                        <button
                            onClick={() => {
                                setShowAdvancedDemo(true);
                                setLogs([]); // Reset log khi chuyển sang tab Live Demo
                            }}
                            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showAdvancedDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                        >
                            Live Demo
                        </button>
                    </div>
                </div>

                <p className="text-muted-foreground leading-7">
                    Nếu bạn cần can thiệp sâu vào bản đồ hoặc thực hiện các thao tác vượt ra ngoài phạm vi React component, bạn có thể lấy instance của <code className="bg-muted px-1.5 py-0.5 rounded text-sm">IWindifyMapEngine</code> thông qua hàm <code className="bg-muted px-1.5 py-0.5 rounded text-sm">onMapReady</code>. Từ đó, bạn có thể gọi <code className="bg-muted px-1.5 py-0.5 rounded text-sm">engine.getNativeMap()</code> để lấy trực tiếp đối tượng Leaflet gốc để gọi các hàm Native.
                </p>

                <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
                    {showAdvancedDemo ? (
                        <div className="space-y-2">
                            <div className="w-full relative z-0 border-b">
                                <WindifyMap
                                    center={[106.660172, 10.762622]}
                                    zoom={12}
                                    onMapReady={handleMapReady}
                                />
                            </div>
                            <div className="bg-zinc-950 p-4 font-mono text-sm overflow-y-auto">
                                <div className="text-zinc-500 mb-2">Terminal / Console</div>
                                {logs.length === 0 ? (
                                    <div className="text-zinc-500 italic">Đang chờ khởi tạo...</div>
                                ) : (
                                    logs.map((log, i) => (
                                        <div key={i} className="text-emerald-400 flex gap-2">
                                            <span className="text-zinc-500">{'>'}</span> {log}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="m-0 border-0 rounded-none shadow-none">
                            <CodeBlock language="tsx" code={advancedUsageCode} />
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
