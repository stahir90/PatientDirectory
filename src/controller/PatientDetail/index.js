import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function PatientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();

  useEffect(() => {
    const patientData = window.sessionStorage.getItem("patientData");

    if (patientData) {
      const storageData = JSON.parse(patientData);
      setUser(storageData?.patientList?.find((item) => item.patient_id == id));
    }
  }, []);

  const handleOnDelete = () => {
    if (window.confirm("Are you sure to delete the record?")) {
      console.log("yes");
      const patientData = JSON.parse(
        window.sessionStorage.getItem("patientData")
      );

      const patientList = patientData?.patientList;
      const filteredList = patientData?.filteredList;

      let position = patientList?.findIndex((item) => item.patient_id == id);
      patientList.splice(position, 1);

      position = filteredList?.findIndex((item) => item.patient_id == id);
      filteredList.splice(position, 1);

      window.sessionStorage.setItem(
        "patientData",
        JSON.stringify({
          ...patientData,
          filteredList: [...filteredList],
          patientList: [...patientList],
        })
      );

      navigate("/");
    } else {
      console.log("no");
    }
  };

  return (
    <div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Go Back!
      </button>
      <div>
        <img alt="profile_image" src={user?.avatar} />
        <h1>
          {user?.first_name} {user?.last_name}
        </h1>
        <p>ID: {user?.patient_id}</p>
        <p>Age: {user?.age}</p>
        <p>Email: {user?.email}</p>
        <p>Gender: {user?.gender}</p>
        <button onClick={handleOnDelete}>Delete</button>
      </div>
    </div>
  );
}
