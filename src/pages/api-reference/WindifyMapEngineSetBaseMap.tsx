import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const usageCode = `import { WindifyMap, useWindifyMap } from "@vn-gis/windify-gis/react";

const BaseMapSwitcher = () => {
  const { engine, isReady } = useWindifyMap();

  const switchToDarkMap = () => {
    if (isReady && engine) {
      // Cách 1: Truyền trực tiếp chuỗi URL
      engine.setBaseMap(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      );
    }
  };

  const switchToOSM = () => {
    if (isReady && engine) {
      // Cách 2: Truyền Object (BaseMapOptions) để tuỳ chỉnh attribution
      engine.setBaseMap({
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      });
    }
  };

  return (
    <div style={{ position: "absolute", top: 10, right: 10, zIndex: 999, display: "flex", gap: "8px" }}>
      <button onClick={switchToDarkMap}>Giao diện Tối</button>
      <button onClick={switchToOSM}>Bản đồ OSM</button>
    </div>
  );
};

export default function SetBaseMapDemo() {
  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={10}>
        <BaseMapSwitcher />
      </WindifyMap>
    </div>
  );
}`;

function SetBaseMapLiveDemoControls() {
    const { engine, isReady } = useWindifyMap();
    const [activeMap, setActiveMap] = useState<string>("voyager");

    const basemaps = [
        {
            id: "voyager",
            name: "Carto Voyager (Mặc định)",
            url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
            options: {
                attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
            }
        },
        {
            id: "dark",
            name: "Carto Dark Matter",
            url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            options: {
                attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a>'
            }
        },
        {
            id: "osm",
            name: "OpenStreetMap",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            options: {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                maxZoom: 19
            }
        },
        {
            id: "satellite",
            name: "Esri World Imagery",
            url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            options: {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            }
        }
    ];

    const changeBaseMap = (mapConfig: typeof basemaps[0]) => {
        if (!isReady || !engine) return;

        // Truyền object BaseMapOptions
        engine.setBaseMap({
            url: mapConfig.url,
            ...mapConfig.options
        });

        setActiveMap(mapConfig.id);
    };

    return (
        <div className="absolute top-4 right-4 z-[999] flex flex-col gap-3 bg-background/95 p-4 rounded-xl shadow-lg border backdrop-blur-sm min-w-[220px]">
            <div>
                <h4 className="text-sm font-semibold text-foreground">Bộ chọn Bản đồ Nền</h4>
                <p className="text-xs text-muted-foreground mt-1">Sử dụng engine.setBaseMap()</p>
            </div>

            <div className="flex flex-col gap-2 mt-1">
                {basemaps.map((map) => (
                    <button
                        key={map.id}
                        onClick={() => changeBaseMap(map)}
                        className={`px-3 py-2 text-sm font-medium rounded-md transition-all text-left flex items-center justify-between ${activeMap === map.id
                            ? 'bg-primary text-primary-foreground shadow-sm ring-1 ring-primary ring-offset-1 dark:ring-offset-background'
                            : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'
                            }`}
                    >
                        {map.name}
                        {activeMap === map.id && (
                            <span className="w-2 h-2 rounded-full bg-current opacity-70 animate-pulse" />
                        )}
                    </button>
                ))}
            </div>
            <div className="mt-2 text-[11px] text-muted-foreground italic">
                *Thao tác thay đổi basemap sẽ xoá layer nền hiện tại và thay thế bằng layer nền mới.
            </div>
        </div>
    );
}

export default function WindifyMapEngineSetBaseMapDoc() {
    const [showDemo, setShowDemo] = useState(false);

    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
                    <span className="text-primary">setBaseMap()</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-8">
                    Phương thức <code className="bg-muted px-1.5 py-0.5 rounded">setBaseMap(options: BaseMapOptions | string): void</code> cho phép bạn thay đổi lớp bản đồ nền (Raster Tile Layer) đang hiển thị một cách linh hoạt, tạo ra các tính năng như "Chế độ ban đêm", "Chế độ vệ tinh".
                </p>
            </div>

            {/* Chi tiết kĩ thuật */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Đặc tả API</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-7">
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong className="text-foreground">Đầu vào linh hoạt:</strong>
                            Bạn có thể truyền vào một chuỗi (String) chứa URL của Tile Server (ví dụ: <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">"https://.../&#123;z&#125;/&#123;x&#125;/&#123;y&#125;.png"</code>) để thay đổi thật nhanh.
                            Hoặc bạn có thể truyền vào một đối tượng kiểu <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">BaseMapOptions</code> để cấu hình chi tiết hơn (như Attribution, minZoom, maxZoom).
                        </li>
                        <li>
                            <strong className="text-foreground">Cấu trúc BaseMapOptions:</strong>
                            <div className="mt-2 m-0 [&_pre]:my-0">
                                <CodeBlock language="typescript" code={`interface BaseMapOptions {
  url: string;                      // Bắt buộc. URL của Tile Server
  attribution?: string;             // Chú thích bản quyền gốc
  subdomains?: string | string[];   // (Tuỳ chọn) Các subdomain a,b,c,d
  maxZoom?: number;                 // Mức zoom lớn nhất cho phép
  minZoom?: number;                 // Mức zoom nhỏ nhất cho phép
}`} />
                            </div>
                        </li>
                        <li>
                            <strong className="text-foreground">Cơ chế thay thế:</strong> Khi gọi phương thức này, engine sẽ tự động tháo dỡ (remove) layer bản đồ nền cũ khỏi màn hình và thêm layer bản đồ nền mới vào ngay lập tức mà không làm ảnh hưởng tới các thành phần khác (Marker, GeoJSON, Popup,...).
                        </li>
                    </ul>
                </div>
            </div>

            {/* Usage Sections */}
            <div className="space-y-4">
                <div className="flex items-center gap-4 border-b pb-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Ví dụ minh hoạ: BaseMap Switcher</h2>
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
                    Tính năng cung cấp hộp lựa chọn Bản đồ nền là tính năng vô cùng phổ biến trên các nền tảng Web GIS. Khối Demo dưới đây hướng dẫn bạn cách chuyển đổi mượt mà giữa các provider bản đồ nổi tiếng như Carto, OSM hay Esri Satellite.
                </p>
                <div className="mt-4">
                    {showDemo ? (
                        <div className="w-full h-[500px] rounded-xl border bg-card shadow-sm overflow-hidden relative z-0">
                            <WindifyMap center={[106.660172, 10.762622]} zoom={12}>
                                <SetBaseMapLiveDemoControls />
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
