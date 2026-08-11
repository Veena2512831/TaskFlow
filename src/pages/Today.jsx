import Sidebar from "../components/Sidebar";
import Todo from "../components/Todo";

const Today = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Todo />
    </div>
  );
};

export default Today;