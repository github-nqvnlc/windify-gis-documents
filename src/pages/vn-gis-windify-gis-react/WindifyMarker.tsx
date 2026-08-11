import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, WindifyMarker, WindifyPopup } from "@vn-gis/windify-gis/react";

const basicUsageCode = `import { WindifyMap, WindifyMarker } from '@vn-gis/windify-gis/react';
import 'leaflet/dist/leaflet.css';

export default function App() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
        
        {/* Điểm đánh dấu cơ bản */}
        <WindifyMarker 
          position={[106.660172, 10.762622]} 
          title="Thành phố Hồ Chí Minh" 
        />
        
        {/* Điểm đánh dấu có thể kéo thả */}
        <WindifyMarker 
          position={[106.68, 10.77]} 
          title="Marker có thể kéo"
          draggable={true}
          onClick={(e) => console.log('Tọa độ mới:', e.lngLat)}
        />
        
      </WindifyMap>
    </div>
  );
}`;

const customElementCode = `import { WindifyMap, WindifyMarker } from '@vn-gis/windify-gis/react';
import 'leaflet/dist/leaflet.css';

// SVG tuỳ chỉnh dưới dạng chuỗi HTML
const customIconHtml = \`
  <div style="background-color: white; border-radius: 50%; padding: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.3);">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  </div>
\`;

export default function CustomMarkerDemo() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
        <WindifyMarker 
          position={[106.660172, 10.762622]} 
          element={customIconHtml}
          title="Marker tuỳ chỉnh"
        />
      </WindifyMap>
    </div>
  );
}`;

const withPopupCode = `import { WindifyMap, WindifyMarker, WindifyPopup } from '@vn-gis/windify-gis/react';
import 'leaflet/dist/leaflet.css';

export default function MarkerWithPopupDemo() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
        <WindifyMarker position={[106.660172, 10.762622]} title="Click để xem thông tin">
          {/* Lồng WindifyPopup bên trong WindifyMarker sẽ tự động gắn kết chúng lại với nhau */}
          <WindifyPopup>
            <div className="p-2">
              <h3 className="font-bold text-lg text-primary">TP. Hồ Chí Minh</h3>
              <p className="text-sm mt-1">Đây là một popup được gắn trực tiếp vào Marker!</p>
            </div>
          </WindifyPopup>
        </WindifyMarker>
      </WindifyMap>
    </div>
  );
}`;

const customIconHtml = `
  <div style=" width: 35px; height: 35px;">
   <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="35px" height="35px" viewBox="0 0 24 24">
      <defs>
        <path id="marker-a" d="M5,2 C4.44771525,2 4,1.55228475 4,1 C4,0.44771525 4.44771525,0 5,0 C5.55228475,0 6,0.44771525 6,1 C6,1.55228475 5.55228475,2 5,2 Z M11.1660156,4.88720703 C11.5270182,4.88753255 11.0398763,6.09019866 9.70458984,8.49520536 C8.36930339,10.9002121 6.80110677,12.8476111 5,14.3374023 C3.47981771,13.1349284 1.89029948,11.2677409 0.231445312,8.73583984 C1.1640625,9.98632812 3.83496094,10.6665039 5.96948242,7.01611328 C7.39249674,4.58251953 9.12467448,3.87288411 11.1660156,4.88720703 Z"/>
        <path id="marker-c" d="M8,22 C5.23620113,22 0,12.5164513 0,8.162063 C0,3.65933791 3.57653449,0 8,0 C12.4234655,0 16,3.65933791 16,8.162063 C16,12.5164513 10.7637989,22 8,22 Z M8,20 C8.39916438,20 9.97421309,18.1222923 11.3773555,15.5809901 C12.9364167,12.7572955 14,9.79929622 14,8.162063 C14,4.75379174 11.308521,2 8,2 C4.69147901,2 2,4.75379174 2,8.162063 C2,9.79929622 3.06358328,12.7572955 4.62264452,15.5809901 C6.02578691,18.1222923 7.60083562,20 8,20 Z M8,12 C5.790861,12 4,10.209139 4,8 C4,5.790861 5.790861,4 8,4 C10.209139,4 12,5.790861 12,8 C12,10.209139 10.209139,12 8,12 Z M8,10 C9.1045695,10 10,9.1045695 10,8 C10,6.8954305 9.1045695,6 8,6 C6.8954305,6 6,6.8954305 6,8 C6,9.1045695 6.8954305,10 8,10 Z"/>
      </defs>
      <g fill="none" fill-rule="evenodd" transform="translate(4 1)">
        <g transform="translate(3 7)">
          <mask id="marker-b" fill="#ffffff">
            <use xlink:href="#marker-a"/>
          </mask>
          <use fill="#D8D8D8" xlink:href="#marker-a"/>
          <g fill="#FFA0A0" mask="url(#marker-b)">
            <rect width="24" height="24" transform="translate(-7 -8)"/>
          </g>
        </g>
        <mask id="marker-d" fill="#ffffff">
          <use xlink:href="#marker-c"/>
        </mask>
        <use fill="#000000" fill-rule="nonzero" xlink:href="#marker-c"/>
        <g fill="#7600FF" mask="url(#marker-d)">
          <rect width="24" height="24" transform="translate(-4 -1)"/>
        </g>
      </g>
    </svg>
  </div>
`;

export default function WindifyMarkerDoc() {
  const [showBasicDemo, setShowBasicDemo] = useState(false);
  const [showPopupDemo, setShowPopupDemo] = useState(false);
  const [showCustomDemo, setShowCustomDemo] = useState(false);

  return (
    <div className="w-full mx-auto space-y-10 py-6">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
          <span className="text-primary">&lt;WindifyMarker /&gt;</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-8">
          Component dùng để hiển thị một điểm đánh dấu (Marker) trên bản đồ. Hỗ trợ hiển thị icon mặc định, tuỳ chỉnh giao diện bằng HTML/SVG, hỗ trợ kéo thả và gắn kết trực tiếp với <code className="bg-muted px-2 py-1 rounded text-sm">&lt;WindifyPopup /&gt;</code>.
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
                <td className="px-4 py-3 font-mono font-semibold text-primary">position<span className="text-destructive ml-1">*</span></td>
                <td className="px-4 py-3 font-mono text-xs">[number, number]</td>
                <td className="px-4 py-3 text-muted-foreground">-</td>
                <td className="px-4 py-3">Vị trí của điểm đánh dấu theo chuẩn EPSG:4326 <code className="bg-muted px-1 py-0.5 rounded text-xs">[longitude, latitude]</code>.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold">title</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                <td className="px-4 py-3">Chuỗi hiển thị (tooltip gốc) khi người dùng di chuột qua marker, đồng thời tăng tính truy cập (accessibility).</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold">draggable</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                <td className="px-4 py-3">Cho phép người dùng kéo thả (drag) marker trên bản đồ.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold">element</td>
                <td className="px-4 py-3 font-mono text-xs">HTMLElement | string</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                <td className="px-4 py-3">Nội dung HTML hoặc DOM Element để tuỳ chỉnh icon của marker. Nếu không truyền, engine sẽ sử dụng icon mặc định.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold">onClick</td>
                <td className="px-4 py-3 font-mono text-xs">(event: WindifyMapEvent) {`=>`} void</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                <td className="px-4 py-3">Callback nhận sự kiện click chuẩn hoá từ Windify, chứa thông tin tọa độ tại thời điểm click.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold">children</td>
                <td className="px-4 py-3 font-mono text-xs">React.ReactNode</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                <td className="px-4 py-3">Dùng để lồng component <code className="bg-muted px-1 py-0.5 rounded text-xs">&lt;WindifyPopup /&gt;</code> vào bên trong. Popup sẽ tự động gắn vào Marker này.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Sections */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Cách sử dụng cơ bản</h2>
          <div className="flex bg-muted p-1 rounded-lg ml-auto">
            <button
              onClick={() => setShowBasicDemo(false)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!showBasicDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Code
            </button>
            <button
              onClick={() => setShowBasicDemo(true)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showBasicDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Live Demo
            </button>
          </div>
        </div>
        <p className="text-muted-foreground leading-7">
          Marker luôn cần được đặt bên trong <code className="bg-muted px-1.5 py-0.5 rounded text-sm">&lt;WindifyMap /&gt;</code>. Truyền thuộc tính <code className="bg-muted px-1.5 py-0.5 rounded text-sm">position</code> để xác định toạ độ.
        </p>
        <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          {showBasicDemo ? (
            <div className="w-full h-[500px] relative z-0">
              <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                <WindifyMarker
                  position={[106.660172, 10.762622]}
                  title="Thành phố Hồ Chí Minh"
                />
                <WindifyMarker
                  position={[106.68, 10.77]}
                  title="Marker có thể kéo"
                  draggable={true}
                  onClick={(e) => console.log('Tọa độ mới:', e.lngLat)}
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
          <h2 className="text-2xl font-semibold tracking-tight">Gắn Popup (Tooltip)</h2>
          <div className="flex bg-muted p-1 rounded-lg ml-auto">
            <button
              onClick={() => setShowPopupDemo(false)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!showPopupDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Code
            </button>
            <button
              onClick={() => setShowPopupDemo(true)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showPopupDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Live Demo
            </button>
          </div>
        </div>
        <p className="text-muted-foreground leading-7">
          Một tính năng rất mạnh mẽ của cấu trúc Declarative: Bạn có thể đưa trực tiếp <code className="bg-muted px-1.5 py-0.5 rounded text-sm">&lt;WindifyPopup /&gt;</code> làm thẻ con (children) của Marker. Khi đó, Popup sẽ tự động biết cách liên kết với Marker mà không cần phải truyền ID rườm rà.
        </p>
        <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          {showPopupDemo ? (
            <div className="w-full h-[500px] relative z-0">
              <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                <WindifyMarker position={[106.660172, 10.762622]} title="Click để xem thông tin">
                  <WindifyPopup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg text-primary">TP. Hồ Chí Minh</h3>
                      <p className="text-sm mt-1">Đây là một popup được gắn trực tiếp vào Marker!</p>
                    </div>
                  </WindifyPopup>
                </WindifyMarker>
              </WindifyMap>
            </div>
          ) : (
            <div className="m-0 border-0 rounded-none shadow-none">
              <CodeBlock language="tsx" code={withPopupCode} />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Custom HTML/SVG Marker</h2>
          <div className="flex bg-muted p-1 rounded-lg ml-auto">
            <button
              onClick={() => setShowCustomDemo(false)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!showCustomDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Code
            </button>
            <button
              onClick={() => setShowCustomDemo(true)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showCustomDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Live Demo
            </button>
          </div>
        </div>
        <p className="text-muted-foreground leading-7">
          Bạn có thể thay đổi icon mặc định thành giao diện tuỳ chỉnh thông qua thuộc tính <code className="bg-muted px-1.5 py-0.5 rounded text-sm">element</code>.
        </p>
        <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          {showCustomDemo ? (
            <div className="w-full h-[500px] relative z-0">
              <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                <WindifyMarker
                  position={[106.660172, 10.762622]}
                  element={customIconHtml}
                  title="Marker tuỳ chỉnh"
                />
              </WindifyMap>
            </div>
          ) : (
            <div className="m-0 border-0 rounded-none shadow-none">
              <CodeBlock language="tsx" code={customElementCode} />
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
