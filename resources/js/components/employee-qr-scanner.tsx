import { useState } from "react";
import QrReader from "react-qr-reader-es6";
import axios from "axios";
import { usePage } from "@inertiajs/react";

interface QrCodeScannerProps {
    onEmployeeFound: (employee: any) => void;
}

const QrScanner: React.FC<QrCodeScannerProps> = ({ onEmployeeFound }) => {

    const [scanResult, setScanResult] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(true); // Control the scanner's activity
    const [processing, setProcessing] = useState(false); // Prevent multiple scans while processing

    const handleScan = async (data: string | null) => {
        if (!data || processing) return;

        setProcessing(true); // Set processing flag to true
        setIsScanning(false); // Stop the scanner

        try {
            const parsed = JSON.parse(data);
            setScanResult(JSON.stringify(parsed, null, 2));
            const response = await axios.get(`/api/v1/employee/details/${parsed.id}`);
            const employeeDetails = response.data.employee;
            onEmployeeFound(employeeDetails);
            // console.log("QR Data:", response.data.employee);
            setError(null);
        } catch (err) {
            console.error(err);
            if (err instanceof SyntaxError) {
                setError("Invalid QR content — not JSON");
            } else {
                setError("Failed to fetch employee details.");
            }
        } finally {
            // Re-enable the scanner after a delay (e.g., 3 seconds)
            setTimeout(() => {
                setIsScanning(true);
                setProcessing(false); // Reset processing flag
                console.log("Scanning resumed.");
            }, 3000);
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
                    delay={10}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: "100%", height: "100%" }}
                />
            </div>

            {/* {scanResult && (
                <pre className="bg-gray-800 p-2 rounded text-xs text-left w-full max-w-sm">
                {scanResult}
                </pre>
            )} */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
}

export default QrScanner;
