import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useState } from "react";

export default function ImportCsvDependentsDialog() {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a CSV file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        setLoading(true);

        try {
            await axios.post("/api/v1/import/csv/dependents", formData);

            alert("Import successful!");
        } catch (err) {
            console.error(err);
            alert("Import failed."+err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button>Import Dependents</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Import with CSV File</DialogTitle>
                    <DialogDescription>
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-4">Import Dependents CSV</h2>

                            <form onSubmit={handleSubmit}>
                                <input
                                    type="file"
                                    accept=".csv"
                                    name="file"
                                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                                    className="mb-4 block"
                                    required
                                />

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded"
                                >
                                    {loading ? "Importing..." : "Import CSV"}
                                </button>
                            </form>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}
