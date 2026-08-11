import { CodeBlock } from "@/components/code-block";

export default function Installation() {
    return (
        <div className="w-full mx-auto space-y-10 py-6">
            {/* Header Section */}
            <div className="space-y-4">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Cài đặt (Installation)</h1>
                <p className="text-xl text-muted-foreground">
                    Windify GIS là một package bản đồ GIS hiệu năng cao, cung cấp API bản đồ với Leaflet cùng với React wrapper hiện đại.
                </p>
            </div>

            {/* Package Installation */}
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Cài đặt Package</h2>
                <p className="text-muted-foreground leading-7">
                    Sử dụng trình quản lý package (npm, yarn, hoặc pnpm) để cài đặt thư viện vào dự án của bạn:
                </p>
                <CodeBlock 
                    language="bash" 
                    code={`npm install @vn-gis/windify-gis

# HOẶC sử dụng yarn
yarn add @vn-gis/windify-gis

# HOẶC sử dụng pnpm
pnpm add @vn-gis/windify-gis`} 
                />
            </div>

            {/* Peer Dependencies */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight border-b pb-2">Peer Dependencies</h2>
                    <p className="text-muted-foreground leading-7">
                        <code className="bg-muted px-1.5 py-0.5 rounded text-sm">leaflet</code>, <code className="bg-muted px-1.5 py-0.5 rounded text-sm">react</code> và <code className="bg-muted px-1.5 py-0.5 rounded text-sm">react-dom</code> là các peer dependencies tùy chọn. Bạn chỉ cần cài đặt những package tương ứng mà bạn sử dụng.
                    </p>
                </div>

                {/* Leaflet */}
                <div className="space-y-4 ml-4 pl-4 border-l-2">
                    <h3 className="text-xl font-semibold">1. Leaflet (Bắt buộc cho bản đồ)</h3>
                    <p className="text-muted-foreground text-sm">
                        Cài đặt <code className="bg-muted px-1.5 py-0.5 rounded">leaflet</code> (v1.9.4+) để sử dụng bản đồ raster tile.
                    </p>
                    <CodeBlock 
                        language="bash" 
                        code={`npm install leaflet

# Nếu sử dụng TypeScript, cần cài thêm type definitions:
npm install -D @types/leaflet`} 
                    />

                    <div className="mt-4 p-4 rounded-lg border-l-4 border-amber-500 bg-amber-500/10 text-amber-900 dark:text-amber-200">
                        <strong className="font-semibold block mb-2 flex items-center gap-2">
                            ⚠️ Quan trọng: Import CSS
                        </strong>
                        <p className="text-sm leading-6 mb-3">
                            Leaflet yêu cầu import CSS để bản đồ hiển thị đúng. Thêm dòng import sau vào file entry của ứng dụng (ví dụ: <code className="bg-black/10 dark:bg-white/20 px-1.5 py-0.5 rounded">main.tsx</code> hoặc <code className="bg-black/10 dark:bg-white/20 px-1.5 py-0.5 rounded">App.tsx</code>):
                        </p>
                        <CodeBlock 
                            language="tsx" 
                            code={`import 'leaflet/dist/leaflet.css';`} 
                        />
                        <p className="text-sm mt-3 opacity-90 italic">
                            * Nếu bạn thấy bản đồ bị vỡ layout, rất có thể bạn đang thiếu dòng import này.
                        </p>
                    </div>
                </div>

                {/* React */}
                <div className="space-y-4 ml-4 pl-4 border-l-2">
                    <h3 className="text-xl font-semibold">2. React (Bắt buộc cho React Wrapper)</h3>
                    <p className="text-muted-foreground text-sm leading-6">
                        Nếu bạn sử dụng React wrapper (<code className="bg-muted px-1.5 py-0.5 rounded">@vn-gis/windify-gis/react</code>) hay component <code className="bg-muted px-1.5 py-0.5 rounded">&lt;WindifyMap /&gt;</code>, hãy đảm bảo đã cài đặt React 18 hoặc 19.
                    </p>
                    <CodeBlock 
                        language="bash" 
                        code={`npm install react react-dom`} 
                    />
                </div>
            </div>
        </div>
    )
}
