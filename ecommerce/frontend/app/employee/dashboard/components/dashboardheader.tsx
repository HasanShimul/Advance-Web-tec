type DashboardHeaderProps = {
    username: string | null;
};

export default function DashboardHeader({
    username
}: DashboardHeaderProps) {


    return (
        <div className="bg-white shadow-md rounded-2xl p-6">

            <h1 className="text-3xl font-bold">
                Welcome, <span className="text-xl">{username}</span>
            </h1>

            <p className="text-gray-500 mt-2">
                Manage employees and profile information
            </p>

        </div>
    );
}