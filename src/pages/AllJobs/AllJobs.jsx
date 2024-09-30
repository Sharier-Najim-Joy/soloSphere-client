// import JobCard from "../components/JobCard";

import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import JobCard from "../../components/JobCard";
import axios from "axios";
import toast from "react-hot-toast";

const AllJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");
  const [count, setCount] = useState(0);
  // console.log(currentPage, filter);

  const numberOfPage = Math.ceil(count / itemPerPage);
  //   console.log(numberOfPage);

  const pages = [...Array(numberOfPage).keys()].map((element) => element + 1);
  //   console.log(pages);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_URL}/allJobs?page=${
          currentPage - 1
        }&size=${itemPerPage}&filter=${filter}&sort=${sort}&search=${search}`
      )
      .then((res) => {
        // console.log(res.data);
        setJobs(res.data);
      });
  }, [currentPage, itemPerPage, filter, sort, search]);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_API_URL
        }/jobsCount?filter=${filter}&search=${search}`
      )
      .then((res) => {
        setCount(res?.data.count);
        // console.log(res.data);
      });
  }, [filter, search]);

  const handlePaginationButton = (val) => {
    // console.log(val);
    setCurrentPage(val);
  };

  const handleReset = () => {
    setFilter("");
    setSort("");
    setSearch("");
    setSearchText("");
  };
  const handleSearch = (e) => {
    e.preventDefault();
    // const form = e.target;
    // const text = form.search.value;
    setSearch(searchText);
    // e.target.reset();
  };
  // console.log(search);

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };
  // const handleNextPage = () => {
  //   if (currentPage < pages.length) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  return (
    <div className="container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between">
      <div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 ">
          <div>
            <select
              onChange={(e) => {
                setFilter(e.target.value);
                setCurrentPage(1);
              }}
              name="category"
              id="category"
              value={filter}
              className="border p-4 rounded-lg"
            >
              <option value="">Filter By Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Graphics Design">Graphics Design</option>
              <option value="Digital Marketing">Digital Marketing</option>
            </select>
          </div>

          <form onSubmit={handleSearch}>
            <div className="flex p-1 overflow-hidden border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
              <input
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                className="px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
                type="text"
                name="search"
                placeholder="Enter Job Title"
                aria-label="Enter Job Title"
              />

              <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              onChange={(e) => {
                setSort(e.target.value);
                setCurrentPage(1);
              }}
              name="short"
              id="short"
              value={sort}
              className="border p-4 rounded-md"
            >
              <option value="">Sort By Deadline</option>
              <option value="dsc">Descending Order</option>
              <option value="asc">Ascending Order</option>
            </select>
          </div>
          <button onClick={handleReset} className="btn">
            Reset
          </button>
        </div>
        <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>
      {/* // pagination */}
      <div className="flex justify-center mt-12">
        <button
          // onClick={handlePrevPage}
          onClick={() => handlePaginationButton(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white"
        >
          <div className="flex items-center -mx-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>

            <span className="mx-1">previous</span>
          </div>
        </button>

        {pages.map((btnNum) => (
          <button
            key={btnNum}
            onClick={() => setCurrentPage(btnNum)}
            className={`hidden px-4 py-2 mx-1 ${
              currentPage === btnNum ? "bg-blue-500 text-white" : undefined
            } transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        <button
          // onClick={handleNextPage}
          onClick={() => handlePaginationButton(currentPage + 1)}
          disabled={currentPage === pages.length}
          className="px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
        >
          <div className="flex items-center -mx-1">
            <span className="mx-1">Next</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 mx-1 rtl:-scale-x-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AllJobs;
