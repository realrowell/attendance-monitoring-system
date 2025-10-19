import { useState } from "react";
import QrReader from "react-qr-reader-es6";

export default function QrScanner() {
    const [scanResult, setScanResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleScan = (data: string | null) => {
        if (!data) return;

        try {
            const parsed = JSON.parse(data);
            setScanResult(JSON.stringify(parsed, null, 2));
            console.log("QR Data:", parsed.id);
        } catch {
            setError("Invalid QR content — not JSON");
        }
    };

    const handleError = (err: any) => {
        console.error(err);
        setError("Camera error or permission denied");
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <h2 className="text-xl font-semibold">Scan Employee QR</h2>

            <div className="w-[250px] h-[250px] overflow-hidden rounded-xl shadow">
                <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%", height: "100%" }}
                />
            </div>

            {scanResult && (
                <pre className="bg-gray-800 p-2 rounded text-xs text-left w-full max-w-sm">
                {scanResult}
                </pre>
            )}
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}
