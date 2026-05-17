import {
  FaList,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

export default function FilteredButtons({
  filter,
  setFilter,
}) {
  return (
    <div className="filters">

      <button
        className={
          filter === "all"
            ? "active-filter"
            : ""
        }
        onClick={() => setFilter("all")}
      >
        <FaList />
        All
      </button>

      <button
        className={
          filter === "pending"
            ? "active-filter"
            : ""
        }
        onClick={() =>
          setFilter("pending")
        }
      >
        <FaClock />
        Pending
      </button>

      <button
        className={
          filter === "completed"
            ? "active-filter"
            : ""
        }
        onClick={() =>
          setFilter("completed")
        }
      >
        <FaCheckCircle />
        Completed
      </button>

    </div>
  );
}