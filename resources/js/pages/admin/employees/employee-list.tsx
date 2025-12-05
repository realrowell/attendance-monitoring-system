import AuthenticatedLayout from "@/layouts/authenticated-layout";
import { Head, usePage } from "@inertiajs/react";
import EmployeeTable from "@/pages/admin/employees/partials/employee-table"
import AddEmployeeDialog from "@/pages/admin/employees/partials/add-employee-dialog"
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import ImportCsvDependentsDialog from "./partials/import-csv-dependents-dialog";
import ImportCsvEmployeesDialog from "./partials/import-csv-employees-dialog";

interface EmployeeListPageProps extends Record<string, any> {
    suffixes: Record<string, string>;
    empClasses: Record<string, string>;
    departments: any[];
}

export default function EmployeeList(){
    const { suffixes, empClasses, departments } = usePage<EmployeeListPageProps>().props;

    return (
        <AuthenticatedLayout
            header="Employee List"
        >
            <Head title="Employees" />

            <div className="flex flex-1 flex-col gap-4 h-full">
                <div className="flex-1 rounded-xl bg-muted/50 h-full">
                    <div className="flex flex-row items-center justify-between p-6">
                        <div className="flex flex-col text-start items-start gap-1">
                            <h2 className="text-2xl ">Employees List</h2>
                            <p>View the list of employees here.</p>
                        </div>
                        <div className="flex flex-row gap-3">
                            <ImportCsvEmployeesDialog/>
                            <ImportCsvDependentsDialog/>
                            {/* <div className="p-4">
                                <h2 className="text-xl font-bold mb-4">Import Employees CSV</h2>

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
                            </div> */}
                            <Button><a href="/export/csv/employees" className="btn">Export</a></Button>
                            <AddEmployeeDialog
                                suffixes={suffixes}
                                empClasses={empClasses}
                                departments={departments}
                            />
                        </div>
                    </div>
                    <EmployeeTable />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
