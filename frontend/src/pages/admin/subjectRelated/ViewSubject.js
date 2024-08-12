import React, { useEffect, useState } from "react";
import {
  getClassStudents,
  getSubjectDetails,
} from "../../../redux/sclassRelated/sclassHandle";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Tab,
  Container,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  BlueButton,
  GreenButton,
  PurpleButton,
} from "../../../components/buttonStyles";
import TableTemplate from "../../../components/TableTemplate";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import InsertChartIcon from "@mui/icons-material/InsertChart";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import TableChartIcon from "@mui/icons-material/TableChart";
import TableChartOutlinedIcon from "@mui/icons-material/TableChartOutlined";
import { updateStudentFields } from "../../../redux/studentRelated/studentHandle";

const ViewSubject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const { subloading, subjectDetails, sclassStudents, getresponse, error } =
    useSelector((state) => state.sclass);

  const { classID, subjectID } = params;

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  if (error) {
    console.log(error);
  }

  const [value, setValue] = useState("1");
  const [marksObtained, setMarksObtained] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loader, setLoader] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [selectedSection, setSelectedSection] = useState("attendance");
  const handleSectionChange = (event, newSection) => {
    setSelectedSection(newSection);
  };

  const studentColumns = [
    { id: "rollNum", label: "Lin No.", minWidth: 150 },
    { id: "name", label: "Name", minWidth: 270 },
    { id: "marksObtained", label: "Marks", minWidth: 50 },
  ];

  const studentRows = sclassStudents.map((student) => {
    const marks = student.botExamResult.length > 0 ? student.botExamResult[0].marksObtained : "";
    return {
      rollNum: student.rollNum,
      name: student.name,
      marksObtained: marks,
      id: student._id,
      botExamResult: student.botExamResult.marksObtained,
    };
  });

  const botExamResult = studentRows.botExamResult;

  let examsSession = "bot";
  // examsSession = "mid";
  // examsSession = "eot";

  const botFields = { subName: subjectID, marksObtained, examsSession };

  const botMarksSubmitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(updateStudentFields(studentId, botFields, "UpdateExamResult"));
    navigate(`/Admin/subjects/subject/${classID}/${subjectID}`);
  };

  const StudentsAttendanceButtonHaver = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton
          variant="contained"
          onClick={() =>
            navigate(`/Admin/subject/student/attendance/${row.id}/${subjectID}`)
          }
        >
          Take Attendance
        </PurpleButton>
      </>
    );
  };

  const StudentsMarksButtonHaver1 = ({ row }) => {
    return (
      <>
        {/* <PurpleButton variant="contained"
          onClick={() => navigate(`/Admin/subject/student/botmarks/${row.id}/${subjectID}`)}>
          Provide Marks
        </PurpleButton> */}
        <form onSubmit={botMarksSubmitHandler}>
          <input
            className="marksInput"
            type="text"
            placeholder="Marks"
            value={botExamResult ? botExamResult : marksObtained}
            onChange={(event) => {
              setMarksObtained(event.target.value);
              setStudentId(row.id);
            }}
            required
          />
          {/* <BlueButton
          variant="contained"
          // onClick={() => navigate("/Admin/students/student/" + row.id)}
          onClick={() => navigate(`/Admin/students/student/${row.id}`)}
        >
          View
        </BlueButton> */}
          <button className="registerButton" type="submit" disabled={loader}>
            {loader ? <CircularProgress size={24} color="inherit" /> : "Add"}
          </button>
        </form>
      </>
    );
  };

  const StudentsMarksButtonHaver2 = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton
          variant="contained"
          onClick={() =>
            navigate(`/Admin/subject/student/motmarks/${row.id}/${subjectID}`)
          }
        >
          Provide Marks
        </PurpleButton>
      </>
    );
  };

  const StudentsMarksButtonHaver3 = ({ row }) => {
    return (
      <>
        <BlueButton
          variant="contained"
          onClick={() => navigate("/Admin/students/student/" + row.id)}
        >
          View
        </BlueButton>
        <PurpleButton
          variant="contained"
          onClick={() =>
            navigate(`/Admin/subject/student/eotmarks/${row.id}/${subjectID}`)
          }
        >
          Provide Marks
        </PurpleButton>
      </>
    );
  };

  const SubjectStudentsSection = () => {
    return (
      <>
        {getresponse ? (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "16px",
              }}
            >
              <GreenButton
                variant="contained"
                onClick={() => navigate("/Admin/class/addstudents/" + classID)}
              >
                Add Students
              </GreenButton>
            </Box>
          </>
        ) : (
          <>
            <Typography variant="h5" gutterBottom>
              Students List:
            </Typography>

            {selectedSection === "attendance" && (
              <TableTemplate
                buttonHaver={StudentsAttendanceButtonHaver}
                columns={studentColumns}
                rows={studentRows}
              />
            )}
            {selectedSection === "marks1" && (
              <TableTemplate
                buttonHaver={StudentsMarksButtonHaver1}
                columns={studentColumns}
                rows={studentRows}
              />
            )}
            {selectedSection === "marks2" && (
              <TableTemplate
                buttonHaver={StudentsMarksButtonHaver2}
                columns={studentColumns}
                rows={studentRows}
              />
            )}
            {selectedSection === "marks3" && (
              <TableTemplate
                buttonHaver={StudentsMarksButtonHaver3}
                columns={studentColumns}
                rows={studentRows}
              />
            )}

            <Paper
              sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
              elevation={3}
            >
              <BottomNavigation
                value={selectedSection}
                onChange={handleSectionChange}
                showLabels
              >
                <BottomNavigationAction
                  label="Attendance"
                  value="attendance"
                  icon={
                    selectedSection === "attendance" ? (
                      <TableChartIcon />
                    ) : (
                      <TableChartOutlinedIcon />
                    )
                  }
                />
                <BottomNavigationAction
                  label="BOT Marks"
                  value="marks1"
                  icon={
                    selectedSection === "marks1" ? (
                      <InsertChartIcon />
                    ) : (
                      <InsertChartOutlinedIcon />
                    )
                  }
                />
                <BottomNavigationAction
                  label="MOT Marks"
                  value="marks2"
                  icon={
                    selectedSection === "marks2" ? (
                      <InsertChartIcon />
                    ) : (
                      <InsertChartOutlinedIcon />
                    )
                  }
                />
                <BottomNavigationAction
                  label="EOT Marks"
                  value="marks3"
                  icon={
                    selectedSection === "marks3" ? (
                      <InsertChartIcon />
                    ) : (
                      <InsertChartOutlinedIcon />
                    )
                  }
                />
              </BottomNavigation>
            </Paper>
          </>
        )}
      </>
    );
  };

  const SubjectDetailsSection = () => {
    const numberOfStudents = sclassStudents.length;

    return (
      <>
        <Typography variant="h4" align="center" gutterBottom>
          Subject Details
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Name : {subjectDetails && subjectDetails.subName}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Code : {subjectDetails && subjectDetails.subCode}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Subject Sessions : {subjectDetails && subjectDetails.sessions}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Number of Students: {numberOfStudents}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Class Name :{" "}
          {subjectDetails &&
            subjectDetails.sclassName &&
            subjectDetails.sclassName.sclassName}
        </Typography>
        {subjectDetails && subjectDetails.teacher ? (
          <Typography variant="h6" gutterBottom>
            Teacher Name : {subjectDetails.teacher.name}
          </Typography>
        ) : (
          <GreenButton
            variant="contained"
            onClick={() =>
              navigate("/Admin/teachers/addteacher/" + subjectDetails._id)
            }
          >
            Add Subject Teacher
          </GreenButton>
        )}
      </>
    );
  };

  return (
    <>
      {subloading ? (
        <div> Loading...</div>
      ) : (
        <>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  sx={{
                    position: "fixed",
                    width: "100%",
                    bgcolor: "background.paper",
                    zIndex: 1,
                  }}
                >
                  <Tab label="Details" value="1" />
                  <Tab label="Students" value="2" />
                </TabList>
              </Box>
              <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                <TabPanel value="1">
                  <SubjectDetailsSection />
                </TabPanel>
                <TabPanel value="2">
                  <SubjectStudentsSection />
                </TabPanel>
              </Container>
            </TabContext>
          </Box>
        </>
      )}
    </>
  );
};

export default ViewSubject;
