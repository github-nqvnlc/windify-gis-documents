import { useState } from "react";
import { CodeBlock } from "@/components/code-block";
import { WindifyMap, WindifyMarker, WindifyPopup } from "@vn-gis/windify-gis/react";

const basicUsageCode = `import { WindifyMap, WindifyPopup } from '@vn-gis/windify-gis/react';
import 'leaflet/dist/leaflet.css';

export default function StandalonePopupDemo() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
        
        {/* Popup độc lập, cần cung cấp prop position */}
        <WindifyPopup position={[106.660172, 10.762622]} closeButton={true}>
          <div className="p-3">
            <h3 className="font-bold text-lg text-primary mb-1">Popup Độc lập</h3>
            <p className="text-sm">Tôi không thuộc về Marker nào cả, tôi đứng một mình tại toạ độ này!</p>
          </div>
        </WindifyPopup>
        
      </WindifyMap>
    </div>
  );
}`;

const nestedUsageCode = `import { WindifyMap, WindifyMarker, WindifyPopup } from '@vn-gis/windify-gis/react';
import 'leaflet/dist/leaflet.css';

export default function NestedPopupDemo() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
        
        <WindifyMarker position={[106.660172, 10.762622]}>
          {/* Popup lồng bên trong Marker. Không cần truyền position nữa! */}
          <WindifyPopup className="custom-popup-wrapper">
            <div className="p-2 text-center">
              <span className="text-2xl">👋</span>
              <p className="text-sm font-semibold mt-1">Hello from nested popup!</p>
            </div>
          </WindifyPopup>
        </WindifyMarker>
        
      </WindifyMap>
    </div>
  );
}`;

export default function WindifyPopupDoc() {
  const [showNestedDemo, setShowNestedDemo] = useState(false);
  const [showStandaloneDemo, setShowStandaloneDemo] = useState(false);

  return (
    <div className="w-full mx-auto space-y-10 py-6">
      {/* Header Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl flex items-center gap-2">
          <span className="text-primary">&lt;WindifyPopup /&gt;</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-8">
          Component dùng để hiển thị một cửa sổ thông tin (Popup/Tooltip) trên bản đồ. Nó hỗ trợ hai chế độ hoạt động: đứng độc lập tại một toạ độ cụ thể, hoặc lồng vào bên trong một Marker để tự động đính kèm. Khác với popup native, bạn có thể truyền thẳng component React vào đây!
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
                <td className="px-4 py-3 font-mono font-semibold">id</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">Tự động tạo</td>
                <td className="px-4 py-3">ID định danh duy nhất của popup trên engine gốc. Nếu không truyền, thư viện sẽ tự động sinh mã ID ngẫu nhiên.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold text-primary">position</td>
                <td className="px-4 py-3 font-mono text-xs">[number, number]</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                <td className="px-4 py-3">Bắt buộc phải có nếu Popup đứng độc lập (không lồng trong Marker). Tọa độ chuẩn EPSG:4326 <code className="bg-muted px-1 py-0.5 rounded text-xs">[longitude, latitude]</code>.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold">className</td>
                <td className="px-4 py-3 font-mono text-xs">string</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">'windify-popup-content'</td>
                <td className="px-4 py-3">CSS class áp dụng cho thẻ div bọc nội dung (content) của popup. Dùng để tùy chỉnh style.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold">closeButton</td>
                <td className="px-4 py-3 font-mono text-xs">boolean</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">true</td>
                <td className="px-4 py-3">Bật/tắt nút đóng [x] mặc định của popup native.</td>
              </tr>
              <tr className="hover:bg-muted/30">
                <td className="px-4 py-3 font-mono font-semibold text-primary">children</td>
                <td className="px-4 py-3 font-mono text-xs">React.ReactNode</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">undefined</td>
                <td className="px-4 py-3">Nội dung của Popup. Bạn có thể sử dụng bất kỳ thẻ HTML hoặc component React nào (Tailwind, Framer Motion...) vì nó sử dụng cơ chế React Portal.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Sections */}
      <div className="space-y-4">
        <div className="flex items-center gap-4 border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Lồng vào WindifyMarker (Nested)</h2>
          <div className="flex bg-muted p-1 rounded-lg ml-auto">
            <button
              onClick={() => setShowNestedDemo(false)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!showNestedDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Code
            </button>
            <button
              onClick={() => setShowNestedDemo(true)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showNestedDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Live Demo
            </button>
          </div>
        </div>
        <p className="text-muted-foreground leading-7">
          Cách phổ biến nhất để dùng Popup là đặt nó làm <code className="bg-muted px-1.5 py-0.5 rounded text-sm">children</code> của một <code className="bg-muted px-1.5 py-0.5 rounded text-sm">&lt;WindifyMarker /&gt;</code>. Windify GIS sẽ tự động hiểu và gắn Popup đó vào Marker thông qua Context mà không cần cấu hình thêm.
        </p>
        <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          {showNestedDemo ? (
            <div className="w-full h-[500px] relative z-0">
              <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                <WindifyMarker position={[106.660172, 10.762622]}>
                  <WindifyPopup className="custom-popup-wrapper">
                    <div className="p-2 text-center">
                      <span className="text-2xl">👋</span>
                      <p className="text-sm font-semibold mt-1">Hello from nested popup!</p>
                    </div>
                  </WindifyPopup>
                </WindifyMarker>
              </WindifyMap>
            </div>
          ) : (
            <div className="m-0 border-0 rounded-none shadow-none">
              <CodeBlock language="tsx" code={nestedUsageCode} />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4 border-b pb-2">
          <h2 className="text-2xl font-semibold tracking-tight">Sử dụng độc lập (Standalone)</h2>
          <div className="flex bg-muted p-1 rounded-lg ml-auto">
            <button
              onClick={() => setShowStandaloneDemo(false)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${!showStandaloneDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Code
            </button>
            <button
              onClick={() => setShowStandaloneDemo(true)}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${showStandaloneDemo ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
            >
              Live Demo
            </button>
          </div>
        </div>
        <p className="text-muted-foreground leading-7">
          Nếu bạn muốn hiển thị một Popup riêng lẻ không phụ thuộc vào Marker nào (ví dụ để ghi chú một khu vực trên bản đồ), hãy truyền prop <code className="bg-muted px-1.5 py-0.5 rounded text-sm">position</code>. Bản thân Popup sẽ tự tìm vị trí đứng trên bản đồ.
        </p>
        <div className="mt-4 rounded-xl border bg-card text-card-foreground shadow-sm overflow-hidden">
          {showStandaloneDemo ? (
            <div className="w-full h-[500px] relative z-0">
              <WindifyMap center={[106.660172, 10.762622]} zoom={13}>
                <WindifyPopup position={[106.660172, 10.762622]} closeButton={true}>
                  <div className="p-3">
                    <h3 className="font-bold text-lg text-primary mb-1">Popup Độc lập</h3>
                    <p className="text-sm">Tôi không thuộc về Marker nào cả, tôi đứng một mình tại toạ độ này!</p>
                  </div>
                </WindifyPopup>
              </WindifyMap>
            </div>
          ) : (
            <div className="m-0 border-0 rounded-none shadow-none">
              <CodeBlock language="tsx" code={basicUsageCode} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 p-4 rounded-lg border-l-4 border-primary bg-primary/80 text-primary-foreground dark:text-primary">
        <h3 className="font-semibold flex items-center gap-2 mb-2">💡 Cơ chế hoạt động (React Portal)</h3>
        <p className="text-sm leading-6">
          Bên dưới Windify GIS sử dụng <code className="bg-black/10 dark:bg-white/20 px-1.5 py-0.5 rounded text-sm">createPortal()</code> của React để render nội dung của bạn thẳng vào trong DOM node do Leaflet quản lý. Điều này có nghĩa là bạn có thể tận dụng toàn bộ sức mạnh của React: hook, context, event listener, state, component UI, Tailwind CSS... y hệt như đang code một React component bình thường mà không bị giới hạn bởi engine đồ hoạ!
        </p>
      </div>

    </div>
  );
}
