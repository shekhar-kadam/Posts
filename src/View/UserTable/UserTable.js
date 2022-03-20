import React from "react";
import TableGrid from "../../Components/TableGrid";

function UserTable({ newUserData }) {
  return (
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
  );
}

export default UserTable;
