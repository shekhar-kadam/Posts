import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getFilteredUsers,
} from "../../Redux/Action/GetUserAction";
import UserTable from "../../View/UserTable/UserTable";

function TableGrid() {
  const [startCount, setStartCount] = useState(1);
  const [newUserData, setNewUserData] = useState([]);
  const [newId, setNewId] = useState("");
  const {
    loading: userLoadding,
    data: userData,
    error: userError,
  } = useSelector((state) => state.getUsers);
  const {
    loading: userFilterLoadding,
    data: userFilterData,
    error: userFilterError,
  } = useSelector((state) => state.getFilterUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers(startCount, 20));
  }, [dispatch, startCount]);

  useEffect(() => {
    if (startCount >= 1) {
      dispatch(getAllUsers(startCount, 20));
    }
  }, [dispatch, startCount]);

  useEffect(() => {
    dispatch(getFilteredUsers(10, newId));
  }, [newId, dispatch]);

  const previousValue = () => {
    if (startCount <= 1) return;
    setStartCount((prevValue) => {
      return prevValue - 1;
    });
  };
  const nextValue = () => {
    if (startCount >= 5) return;
    setStartCount((prevValue) => {
      return prevValue + 1;
    });
  };

  const ascendingData = () => {
    const ascData = [...newUserData];
    ascData?.sort((a, b) => a.id - b.id);
    setNewUserData(ascData);
  };
  const descendingData = () => {
    const desData = [...newUserData];
    desData?.sort((a, b) => a.id - b.id).reverse();
    setNewUserData(desData);
  };

  useEffect(() => {
    if (newId) setNewUserData(userFilterData);
  }, [userFilterData]);
  useEffect(() => {
    setNewUserData(userData);
  }, [userData]);

  const handleChange = (event) => {
    setNewId(event.target.value);
  };

  useEffect(() => {
    // Function to add our give data into cache
    const addDataIntoCache = (cacheName, url, response) => {
      // Converting our response into Actual Response form
      const data = new Response(JSON.stringify(response));

      if ("caches" in window) {
        // Opening given cache and putting our data into it
        caches.open(cacheName).then((cache) => {
          cache.put(url, data);
          // alert("Data Added into cache!");
        });
      }
    };

    addDataIntoCache("MyCache", "https://localhost:3000", newUserData);
  }, [newUserData]);

  useEffect(() => {
    getAllCacheData();
  }, []);

  const getAllCacheData = async () => {
    var url = "https://localhost:3000";

    // List of all caches present in browser
    var names = await caches.open("MyCache");
    const cachedResponse = await names.match(url);
    const finalData = await cachedResponse.json();
    setNewUserData(finalData);
  };

  return (
    <div className="flex flex-col">
      <div className="text-2xl font-bold text-center">Posts Table</div>
      <div className="flex m-auto xl:flex-row md:flex-row sm:flex-col ">
        <div
          className="h-10 px-6 py-2 ml-10 font-bold border-2 border-black cursor-pointer"
          onClick={ascendingData}
        >
          ASC
        </div>
        <div
          className="h-10 px-6 py-2 ml-10 font-bold border-2 border-black cursor-pointer"
          onClick={descendingData}
        >
          Desc
        </div>
        <div className="pt-4 ml-5">
          <label>Filter</label>
          <select className="border-[1px] ml-2" onChange={handleChange}>
            <option>Select a user</option>
            {userData?.map((elem) => (
              <option value={elem?.userId}>{elem?.title}</option>
            ))}
          </select>
        </div>
      </div>
      <UserTable newUserData={newUserData} />
      <div className="flex pb-10 m-auto ">
        <div
          className="h-10 px-6 py-2 ml-10 font-bold border-2 border-black cursor-pointer"
          onClick={previousValue}
        >
          Prev
        </div>
        <div
          className="h-10 px-6 py-2 ml-10 font-bold border-2 border-black cursor-pointer"
          onClick={nextValue}
        >
          Next
        </div>
      </div>
    </div>
  );
}

export default TableGrid;
