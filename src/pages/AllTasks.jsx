import AllTask from "../components/AllTask";
import Sidebar from "../components/Sidebar";

const AllTasks = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <AllTask />
    </div>
  );
};

export default AllTasks;