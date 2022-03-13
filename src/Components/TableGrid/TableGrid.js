import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllUsers,
  getFilteredUsers,
} from "../../Redux/Action/GetUserAction";

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
  }, [dispatch]);

  useEffect(() => {
    if (startCount >= 1) {
      dispatch(getAllUsers(startCount, 20));
    }
  }, [dispatch, startCount]);

  useEffect(() => {
    dispatch(getFilteredUsers(10, newId));
  }, [newId]);

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

  console.log("userData", newUserData);

  return (
    <div className="flex flex-col">
      <div className="text-center font-bold text-2xl">Posts Table</div>
      <div className="flex m-auto ">
        <div
          className="px-6 h-10 py-2 ml-10 font-bold cursor-pointer border-2 border-black"
          onClick={ascendingData}
        >
          ASC
        </div>
        <div
          className="px-6 h-10 py-2 ml-10 font-bold cursor-pointer border-2 border-black"
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
      <div className="px-4 py-5">
        <div className="grid grid-cols-3 border-[1px] p-2">
          <div>#</div>
          <div>Title</div>
          <div>Body</div>
        </div>
        <div className="grid grid-cols-3 p-2 ">
          {newUserData?.map((elem) => (
            <>
              <div className="py-2">{elem?.id}</div>
              <div className="py-2">{elem?.title}</div>
              <div className="py-2">{elem?.body}</div>
            </>
          ))}
        </div>
      </div>
      <div className="flex  m-auto pb-10 ">
        <div
          className="px-6 h-10 py-2 ml-10 font-bold cursor-pointer border-2 border-black"
          onClick={previousValue}
        >
          Prev
        </div>
        <div
          className="px-6 h-10 py-2 ml-10 font-bold cursor-pointer border-2 border-black"
          onClick={nextValue}
        >
          Next
        </div>
      </div>
    </div>
  );
}

export default TableGrid;
