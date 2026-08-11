import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, WindifyGeoJSON } from "@vn-gis/windify-gis/react";

const basicUsageCode = `import { WindifyMap, WindifyGeoJSON } from '@vn-gis/windify-gis/react';
import 'leaflet/dist/leaflet.css';

export default function GeoJSONDemo() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <WindifyMap center={[108.2022, 16.0544]} zoom={11}>
        
        {/* Tải dữ liệu GeoJSON từ URL */}
        <WindifyGeoJSON
          id="danang-boundaries"
          data="/geojson/43_da_nang/43_da_nang.geojson"
          style={{ 
            fillColor: '#3388ff', 
            fillOpacity: 0.3,
            color: '#2563eb',
            weight: 2
          }}
          visible={true}
          onClick={(feature, e) => {
            console.log('Bạn vừa click vào vùng:', feature.properties?.name);
          }}
          onError={(error) => console.error('Lỗi tải GeoJSON:', error)}
        />
        
      </WindifyMap>
    </div>
  );
}`;

const inlineDataCode = `import { WindifyMap, WindifyGeoJSON } from '@vn-gis/windify-gis/react';
import 'leaflet/dist/leaflet.css';

// Dữ liệu GeoJSON nội tuyến (inline)
const inlineGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.6, 10.7],
            [106.7, 10.7],
            [106.7, 10.8],
            [106.6, 10.8],
            [106.6, 10.7]
          ]
        ]
      },
      properties: { name: 'Khu vực thử nghiệm' }
    }
  ]
};

export default function InlineGeoJSONDemo() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <WindifyMap center={[106.65, 10.75]} zoom={10}>
        <WindifyGeoJSON
          id="test-polygon"
          data={inlineGeoJSON}
          style={(feature) => ({
            fillColor: feature.properties?.name ? '#10b981' : '#f43f5e',
            fillOpacity: 0.5,
            color: 'white',
            weight: 1
          })}
        />
      </WindifyMap>
    </div>
  );
}`;

const inlineGeoJSON = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [106.6, 10.7],
            [106.7, 10.7],
            [106.7, 10.8],
            [106.6, 10.8],
            [106.6, 10.7]
          ]
        ]
      },
      properties: { name: 'Khu vực thử nghiệm' }
    }
  ]
};

export default function WindifyGeoJSONDoc() {
  const [showRemoteDemo, setShowRemoteDemo] = useState(false);
  const [showInlineDemo, setShowInlineDemo] = useState(false);

  return (
    <div className="w-full mx-auto space-y-10 py-6">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
          <span className="text-primary">&lt;WindifyGeoJSON /&gt;</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-8">
          Component quản lý các lớp dữ liệu không gian dạng GeoJSON (Polygon, LineString, Point...). Nó hỗ trợ cả nạp dữ liệu nội tuyến (inline object) lẫn tự động fetch từ URL một cách bất đồng bộ, đi kèm với khả năng tuỳ biến giao diện động theo từng feature.
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
                <td className="px-4 py-3 font-mono font-semibold text-primary">id<span className="text-destructive ml-1">*</span></td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">ID định danh duy nhất của layer. Việc thay đổi <code className="bg-muted px-1 py-0.5 rounded text-xs">data</code> với cùng ID sẽ làm engine nạp đè layer hiện tại.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold text-primary">data<span className="text-destructive ml-1">*</span></td>
                <td className="px-4 py-3 font-mono text-xs">GeoJSONData | string</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Dữ liệu chuẩn RFC 7946 GeoJSON (Geometry, Feature, FeatureCollection) hoặc một chuỗi URL (fetch từ server).</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold">style</td>
                <td className="px-4 py-3 font-mono text-xs">GeoJSONStyle | GeoJSONStyleFunction</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                <td className="px-4 py-3">Style dùng chung cho cả layer hoặc một hàm (callback) trả về style tùy biến riêng dựa theo properties của từng Feature.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold">visible</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">true</td>
                <td className="px-4 py-3">Bật/tắt hiển thị layer trên bản đồ. Thay đổi cờ này không làm tốn tài nguyên tải lại dữ liệu.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold">onClick</td>
                <td className="px-4 py-3 font-mono text-xs">(feature, event) {`=>`} void</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                <td className="px-4 py-3">Callback được gọi khi click vào một điểm/vùng của layer. Tham số chứa thông tin Feature được click và tọa độ nhấp chuột.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold">onError</td>
                <td className="px-4 py-3 font-mono text-xs">(error: Error) {`=>`} void</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                <td className="px-4 py-3">Callback nhận về lỗi nếu URL không hợp lệ, dữ liệu fetch về lỗi format hoặc render thất bại.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Sections */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Tải GeoJSON từ URL (Remote Loading)</h2>
          <div className="flex bg-muted p-1 rounded-lg ml-auto">
            <button
              onClick={() => setShowRemoteDemo(false)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!showRemoteDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Code
            </button>
            <button
              onClick={() => setShowRemoteDemo(true)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showRemoteDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Live Demo
            </button>
          </div>
        </div>
        <p className="text-muted-foreground leading-7">
          Chỉ cần truyền một đường dẫn URL hợp lệ vào prop <code className="bg-muted px-1.5 py-0.5 rounded text-sm">data</code>. Component sẽ tự động dùng Fetch API để tải tài nguyên đó, kiểm tra lỗi và chỉ hiển thị lên bản đồ khi mọi thứ đã sẵn sàng. Bạn có thể sử dụng prop <code className="bg-muted px-1.5 py-0.5 rounded text-sm">onError</code> để bẫy lỗi.
        </p>
        <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          {showRemoteDemo ? (
            <div className="w-full h-[500px] relative z-0">
              <WindifyMap center={[108.2022, 16.0544]} zoom={11}>
                <WindifyGeoJSON
                  id="danang-boundaries"
                  data="/geojson/43_da_nang/43_da_nang.geojson"
                  style={{
                    fillColor: '#3388ff',
                    fillOpacity: 0.3,
                    color: '#2563eb',
                    weight: 2
                  }}
                  visible={true}
                  onClick={(feature) => {
                    console.log('Bạn vừa click vào vùng:', feature.properties?.name);
                  }}
                  onError={(error) => console.error('Lỗi tải GeoJSON:', error)}
                />
              </WindifyMap>
            </div>
          ) : (
            <div className="m-0 border-0 rounded-none shadow-none">
              <CodeBlock language="tsx" code={basicUsageCode} />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Data-Driven Styling (Inline Object)</h2>
          <div className="flex bg-muted p-1 rounded-lg ml-auto">
            <button
              onClick={() => setShowInlineDemo(false)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!showInlineDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Code
            </button>
            <button
              onClick={() => setShowInlineDemo(true)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showInlineDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Live Demo
            </button>
          </div>
        </div>
        <p className="text-muted-foreground leading-7">
          Thuộc tính <code className="bg-muted px-1.5 py-0.5 rounded text-sm">style</code> có thể là một hàm (callback function). Hàm này nhận đầu vào là từng <code className="bg-muted px-1.5 py-0.5 rounded text-sm">feature</code> của GeoJSON và trả về một đối tượng Style tương ứng. Nhờ vậy bạn có thể dễ dàng đổ màu vùng bản đồ phụ thuộc vào biến số dữ liệu (như dân số, mật độ...).
        </p>
        <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          {showInlineDemo ? (
            <div className="w-full h-[500px] relative z-0">
              <WindifyMap center={[106.65, 10.75]} zoom={10}>
                <WindifyGeoJSON
                  id="test-polygon"
                  data={inlineGeoJSON as any}
                  style={(feature) => ({
                    fillColor: feature.properties?.name ? '#10b981' : '#f43f5e',
                    fillOpacity: 0.5,
                    color: 'white',
                    weight: 1
                  })}
                />
              </WindifyMap>
            </div>
          ) : (
            <div className="m-0 border-0 rounded-none shadow-none">
              <CodeBlock language="tsx" code={inlineDataCode} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 p-4 rounded-lg border-l-4 border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200">
        <h3 className="font-semibold flex items-center gap-2 mb-2">⚠️ Lưu ý quan trọng</h3>
        <p className="text-sm leading-6">
          Mặc dù component cho phép thay đổi data liên tục, thao tác thay thế một bộ GeoJSON lớn có thể tốn kém hiệu năng do phải phân tích lại toàn bộ tọa độ hình học (geometry). Nếu bạn chỉ muốn ẩn/hiện dữ liệu có sẵn, hãy sử dụng thuộc tính <code className="bg-black/10 dark:bg-white/20 px-1.5 py-0.5 rounded">visible</code> thay vì unmount component hoặc thay đổi <code className="bg-black/10 dark:bg-white/20 px-1.5 py-0.5 rounded">data</code> thành rỗng!
        </p>
      </div>

    </div>
  );
}
