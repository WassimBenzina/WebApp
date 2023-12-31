import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import image2 from "../../../assets/image2.png";
import "./MakeAppointment.css";


const styleImage = {
  width: "35%",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  margin: "10%",
};

const MakeAppointment = () => {
  const [student, setStudent] = useState({});
  const [tutorID, setTutorID] = useState(-1);
  console.log(student, tutorID);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const currentStudentId = decodedToken.StudentID;

          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const studentResponse = await axios.get(
            `http://localhost:8080/api/students/${currentStudentId}`,
            { headers }
          );
          setStudent(studentResponse.data.student);

          const tutorResponse = await axios.get(
            `http://localhost:8080/api/tutors/${currentStudentId}`
          );
          setTutorID(tutorResponse.data.TutorID);
        } catch (error) {
          console.error("Token decoding or fetching data error:", error);
        }
      }
    };

    fetchData();
    console.log(student, tutorID,student.Email);
  }, [tutorID]);

  const [formData, setFormData] = useState({
    studentEmail: "",
    tutorEmail: "",
    date: "",
    location: "",
    time: "",
  });
  console.log(formData,student.Email,formData.studentEmail);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handledateChange = (e) => {
    const { name, value } = e.target;

    const dateObject = new Date(value);

    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 as getMonth() returns zero-based month
    const day = dateObject.getDate().toString().padStart(2, '0'); // Ensure two-digit day format

    const formattedDate = `${year}-${month}-${day}`;

    setFormData((prevData) => ({
      ...prevData,
      [name]: formattedDate,
    }));}
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    const url = "http://localhost:8080/api/appointments";
    const token = localStorage.getItem("token");
      if (token) {
          const headers = {
            Authorization: `Bearer ${token}`,
          };
    axios
      .post(url, formData,{headers})
      .then((response) => {
        console.log(response.data);
        alert(response.data.msg);
        console.log(formData)
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.error("there was an error", error);
      });
  }};

  const styleContainer2 = {
    backgroundColor: "white",
    minHeight: "100vh",
    width: "100%",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    margin: "0",
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div style={{ marginRight: "16%" }}>
        <Sidebar student={student} tutorID={tutorID} />
      </div>
      <div style={styleContainer2}>
        <div
          className="wrapper"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <form action="" onSubmit={handlesubmit}>
            <h2>
              Welcome !
              <br />
              <span>Ready to schedule an appointment ?</span>
            </h2>

            <div className="input-box">
              <label htmlFor="studentName">Your Email</label>
              <input
                type="text"
                placeholder="Your Email"
                name="studentEmail"
                id="studentEmail"
                className="input"
                value={formData.studentEmail}
                onChange={handleChange}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <label htmlFor="tutorName">Tutor's Email:</label>
              <input
                type="text"
                placeholder="Tutor Email"
                name="tutorEmail"
                id="tutorEmail"
                className="input"
                value={formData.tutorEmail}
                onChange={handleChange}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <label htmlFor="tutorName">Time of the Session:</label>
              <input
                placeholder="HH:mm"
                pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
                type="text"
                name="time"
                id="time"
                className="input"
                value={formData.time}
                onChange={handleChange}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <label htmlFor="dateOfSession">Date of the Session:</label>
              <input
                type="date"
                name="date"
                id="date"
                className="input"
                value={formData.date}
                onChange={handledateChange}
              />
              <i className="bx bxs-user"></i>
            </div>

            <div className="input-box">
              <label htmlFor="placeOfSession">Place of the Session:</label>
              <input
                type="text"
                placeholder="Place of Session"
                name="location"
                id="location"
                className="input"
                value={formData.location}
                onChange={handleChange}
              />{" "}
              <i className="bx bxs-lock-alt"></i>
            </div>
            <br/>
            <button type="submit" className="btn">
              Let's go →
            </button>
          </form>
        </div> 
        <img
              style={styleImage}
              src={image2}
              alt="Empty Request"
            />
      </div>
      
    </div>
  );
};
export default MakeAppointment;
