import Taskcomplete from "../components/Taskcomplete";
import Sidebar from "../components/Sidebar";

const Completed = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Taskcomplete />
    </div>
  );
};

export default Completed;