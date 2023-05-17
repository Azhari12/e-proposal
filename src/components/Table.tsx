import { RiDeleteBin6Line, RiPencilLine } from "react-icons/ri";
import { useTable, Column, Row } from "react-table";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import Swal from "@/utils/Swal";
import axios from "axios";

import {
  SubmissionDetail,
  PositionData,
  OfficeData,
  UserData,
} from "@/utils/types/Admin";

type PropsTablePosition = {
  data: PositionData[];
};

const columns: readonly Column<PositionData>[] = [
  {
    Header: "Position",
    accessor: "position",
  },
  {
    Header: "Tag",
    accessor: "tag" as const,
  },
];

export function TablePosition(props: PropsTablePosition) {
  const data = useMemo(() => props.data, [props.data]);

  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "Delete",
        Header: <div className="flex pr-3 justify-end">Action</div>,
        Cell: ({ row }: { row: Row<PositionData> }) => (
          <div className="flex pr-3 justify-end">
            {" "}
            <button
              className="btn btn-ghost btn-xl text-xl text-@Red"
              onClick={() => handleDelete(row.original)}
            >
              <RiDeleteBin6Line />
            </button>{" "}
          </div>
        ),
      },
    ]);
  };
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    tableHooks
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const isEven = (index: number) => index % 2 == 0;
  return (
    <table className="table w-full border border-@Gray2">
      <thead {...getTableProps()}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} scope="col">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);

          return (
            <tr
              {...row.getRowProps()}
              className={isEven(index) ? "bg-@Gray" : ""}
            >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
const handleDelete = async (data: PositionData) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will not be able to recover your account!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`position`, {
          headers: {
            Authorization: "your-authorization-token",
          },
        })
        .then((response) => {
          const { message } = response.data;
          Swal.fire({
            icon: "success",
            title: "Success",
            text: message,
            showCancelButton: false,
          });
        })
        .catch((error) => {
          const { data } = error.response;
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: data.message,
            showCancelButton: false,
          });
        });
    }
  });
};

// table users
type PropsTableUsers = {
  dataUsers: UserData[];
  edit: string;
};

const columnsUser: readonly Column<UserData>[] = [
  {
    Header: "Name",
    accessor: "name",
    Cell: ({ row }) => (
      <div>
        <div className="font-bold text-black">{row.values.name}</div>
        <div className="text-sm opacity-80 text-@Gray">
          {row.values.user_id}
        </div>
      </div>
    ),
  },
  {
    Header: "ID",
    accessor: "user_id",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Position",
    accessor: "position",
  },
  {
    Header: "Office",
    accessor: "office",
  },
];

export function TableUsers(props: PropsTableUsers) {
  const dataUsers = useMemo(() => props.dataUsers, [props.dataUsers]);
  const navigate = useNavigate();

  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "action",
        Header: <div className="flex pr-3 justify-center">Action</div>,
        Cell: ({ row }: { row: Row<UserData> }) => (
          <div className="flex pr-3 justify-center">
            <button
              className="btn btn-ghost btn-xl text-xl text-@Red"
              onClick={() => handleDelete(row.original)}
            >
              <RiDeleteBin6Line />
            </button>
            <button
              className="btn btn-ghost btn-xl text-xl text-@Blue"
              onClick={() => navigate(`${props.edit}`)}
            >
              <RiPencilLine />
            </button>
          </div>
        ),
      },
    ]);
  };

  const handleDelete = async (userData: UserData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`users/${userData.user_id}`, {
            headers: {
              Authorization: "your-authorization-token",
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: message,
              showCancelButton: false,
            });
          })
          .catch((error) => {
            const { data } = error.response;
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: data.message,
              showCancelButton: false,
            });
          });
      }
    });
  };

  const tableInstanceUser = useTable(
    {
      columns: columnsUser,
      data: dataUsers,
    },
    tableHooks
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstanceUser;

  const isEven = (index: number) => index % 2 == 0;
  return (
    <table className="table w-full border border-@Gray2">
      <thead {...getTableProps()}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} scope="col">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);

          return (
            <tr
              {...row.getRowProps()}
              className={isEven(index) ? "bg-@Gray" : ""}
            >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

//office table
type PropsTableOffice = {
  data: OfficeData[];
};

const columnsOffice: readonly Column<OfficeData>[] = [
  {
    accessor: "office_name",
    Header: "Office",
  },
];

export function TableOffice(props: PropsTableOffice) {
  const data = useMemo(() => props.data, [props.data]);

  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "Delete",
        Header: <div className="flex pr-3 justify-end">Action</div>,
        Cell: ({ row }: { row: Row<OfficeData> }) => (
          <div className="flex pr-3 justify-end">
            <button
              className="btn btn-ghost btn-xl text-xl text-@Red"
              onClick={() => handleDelete(row.original)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ),
      },
    ]);
  };
  const handleDelete = async (data: OfficeData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`office`, {
            headers: {
              Authorization: "your-authorization-token",
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: message,
              showCancelButton: false,
            });
          })
          .catch((error) => {
            const { data } = error.response;
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: data.message,
              showCancelButton: false,
            });
          });
      }
    });
  };

  const tableInstance = useTable(
    {
      columns: columnsOffice,
      data,
    },
    tableHooks
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const isEven = (index: number) => index % 2 == 0;
  return (
    <table className="table w-full border border-@Gray2">
      <thead {...getTableProps()}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} scope="col">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);

          return (
            <tr
              {...row.getRowProps()}
              className={isEven(index) ? "bg-@Gray" : ""}
            >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

//TABLE SUBMISSION TYPE
interface TableSubmissionProps {
  data: SubmissionDetail[];
}

const columnsSubmission: Column<SubmissionDetail>[] = [
  {
    Header: "Submission Name",
    accessor: "submission_type_name",
  },
  {
    Header: "Value",
    accessor: "submission_value",
  },
  {
    Header: "Requirement",
    accessor: "submission_requirement",
  },
];

export const TableSubmission: React.FC<TableSubmissionProps> = ({ data }) => {
  const tableHooks = (hooks: any) => {
    hooks.visibleColumns.push((columns: any) => [
      ...columns,
      {
        id: "Delete",
        Header: <div className="flex pr-3 justify-end">Action</div>,
        Cell: ({ row }: { row: Row<OfficeData> }) => (
          <div className="flex pr-3 justify-end">
            <button
              className="btn btn-ghost btn-xl text-xl text-@Red"
              onClick={() => handleDelete(row.original)}
            >
              <RiDeleteBin6Line />
            </button>
          </div>
        ),
      },
    ]);
  };

  const handleDelete = async (data: OfficeData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`office`, {
            headers: {
              Authorization: "your-authorization-token",
            },
          })
          .then((response) => {
            const { message } = response.data;
            Swal.fire({
              icon: "success",
              title: "Success",
              text: message,
              showCancelButton: false,
            });
          })
          .catch((error) => {
            const { data } = error.response;
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: data.message,
              showCancelButton: false,
            });
          });
      }
    });
  };

  const tableInstance = useTable(
    {
      columns: columnsSubmission,
      data: data,
    },
    tableHooks
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const isEven = (index: number) => index % 2 === 0;

  return (
    <table className="table w-full border border-@Gray2">
      <thead {...getTableProps()}>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} scope="col">
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className={isEven(index) ? "bg-@Gray" : ""}
            >
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
