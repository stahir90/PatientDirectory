import { useEffect, useState } from "react";
import patientDataSource from "../../data/mock_data.json";
import { Link } from "react-router-dom";
import Filter from "../../components/Filter";

const headData = ["ID", "Name"];

const TableHead = () => (
  <thead>
    <tr>
      {headData.map((item) => (
        <th>{item}</th>
      ))}
    </tr>
  </thead>
);

const TableData = ({ patientList }) => (
  <>
    {patientList &&
      patientList?.map((item) => {
        const { patient_id, first_name, last_name } = item;
        return (
          <tbody>
            <tr>
              <td>{patient_id}</td>
              <td>
                <Link
                  to={{
                    pathname: `/patient/${patient_id}`,
                  }}
                >
                  {first_name} {last_name}
                </Link>
              </td>
            </tr>
          </tbody>
        );
      })}
  </>
);

export default function Home() {
  const [patientData, setPatientData] = useState({
    filters: {
      searchedText: "",
      gender: "",
      age: "",
      sort: "",
    },
    filteredList: "",
    patientList: [],
  });

  useEffect(() => {
    const storedData = window.sessionStorage.getItem("patientData");

    if (storedData) {
      setPatientData(JSON.parse(storedData));
    } else {
      setPatientData({
        ...patientData,
        filteredList: [...patientDataSource],
        patientList: [...patientDataSource],
      });
    }
  }, []);

  useEffect(() => {
    if (patientData) {
      window.sessionStorage.setItem("patientData", JSON.stringify(patientData));
    }
  }, [patientData]);

  return (
    <div>
      <Filter
        filter={patientData.filters}
        dataList={patientData.patientList}
        onFilter={(filters, list) => {
          setPatientData({
            ...patientData,
            filters: filters,
            filteredList: [...list],
          });
        }}
      />
      <table>
        <TableHead />
        <TableData patientList={patientData.filteredList} />
      </table>
    </div>
  );
}
