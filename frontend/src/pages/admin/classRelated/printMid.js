import React, { useEffect, useState } from "react";
// import { useSearchParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Print from '@mui/icons-material/Print';
import { getSubjectList } from '../../../redux/sclassRelated/sclassHandle';
import log from "../../../assets/log.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getClassStudents,
  getSubjectDetails,
} from "../../../redux/sclassRelated/sclassHandle";
import { getAllGrades } from '../../../redux/gradeRelated/gradeHandle';
// import CheckIcon from '@mui/icons-material/Check';

const Prints = () => {
  // const [searchParams] = useSearchParams();
  // const id = searchParams.get('id');

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();

  const [filteredStudent, setFilteredStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { subloading, subjectDetails, sclassStudents, error } =
    useSelector((state) => state.sclass);
  const { subjectsList, loading, response } = useSelector((state) => state.sclass);
  const { gradingList } = useSelector((state) => state.grading);
  const { currentUser } = useSelector(state => state.user)

  const { classID, subjectID, id } = params;
  
  const adminID = currentUser?._id; 
  useEffect(() => {
    if (adminID) {
      dispatch(getAllGrades(adminID, "Grading"));
    }
  }, [adminID, dispatch]);

  useEffect(() => {
    dispatch(getSubjectList(currentUser._id, "AllSubjects"));
  }, [currentUser._id, dispatch]);

  // console.log(subjectsList);

  useEffect(() => {
    dispatch(getSubjectDetails(subjectID, "Subject"));
    dispatch(getClassStudents(classID));
  }, [dispatch, subjectID, classID]);

  useEffect(() => {
    if (sclassStudents.length > 0) {
      const student = sclassStudents.find((student) => student._id === id);
      setFilteredStudent(student);
      setIsLoading(false);
    }
  }, [sclassStudents, id]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError || !filteredStudent) return <Typography>Error loading data or No Pupil found with this ID.</Typography>;


  const handlePrint = () => {
    window.print();
  };
const results = filteredStudent.botExamResult;
const resultEnd = filteredStudent.midExamResult;
  // Calculate total for col2
const totalMarksObtained = results.reduce((total, result) => total + result.marksObtained, 0); 

// Function to calculate the total agg for mid
const totalGrade = results.reduce((total, result) => {
  const grade = result.marksObtained !== null && result.marksObtained !== undefined
    ? gradingList?.find(
        (grading) =>
          result.marksObtained >= grading.from && result.marksObtained <= grading.to
      )?.grade
    : '-';

  // Extract only the numeric part of the grade using regular expressions
  const numericGrade = grade.match(/\d+/)?.[0] || 0;  // Default to 0 if no digits found

  return total + Number(numericGrade);
}, 0);

// Calculate total numeric grades for end-term
const totalEndGrade = filteredStudent.midExamResult.reduce((total, result) => {
  const endExamGrade = result?.marksObtained !== null && result?.marksObtained !== undefined
    ? gradingList?.find(
        (grading) =>
          result.marksObtained >= grading.from && result.marksObtained <= grading.to
      )?.grade
    : '-';

  // Extract numeric part from the grade
  const numericGrade = parseInt(endExamGrade.replace(/[^\d]/g, ''), 10);
  return total + (numericGrade || 0);
}, 0);


const totalMarksEnd = resultEnd.reduce((total, result) => total + result.marksObtained, 0); 

const totalCol2 = results.reduce((total, result) => total + 100, 0); // Assuming 100 is the static value for all rows


  return (
    <Box className="printable-content -mt-10" sx={{  mx: 'auto', border: '10px solid black',padding: '6px',boxSizing: 'border-box',}}>
       <Box>
       <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center' , fontSize: '1rem'}} // Inline styles for boldness and color
        >
            SHINING STARS NURSERY AND PRIMARY SCHOOL - VVUMBA
          </Typography>
       </Box>

       <Box display="flex" justifyContent="center" textAlign="center" className="relative">
      {/* Image on the left */}
      <Box mr={2}>
        <img src={log} alt="Shining" style={{ width: '100px', height: '100px' }} />
      </Box>

      {/* Centered Text Content */}
      <Box className="flex-1 flex flex-col justify-center">
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center', textDecoration: 'underline', fontSize: '0.8rem' }}
        >
          Mixed day and boarding
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center', fontSize: '0.8rem' }}
        >
          P.O.BOX 31007, TEL: 0773297951, 0753753179, 0772413164
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center', fontSize: '0.8rem' }}
        >
          "Arise and shine"
        </Typography>
        <Typography variant="h6" sx={{ mt: -1.8 }}>
          <span style={{ fontWeight: 900, color: 'black', fontSize: '0.8rem' }}>Email:</span>{' '}
          <span style={{ textDecoration: 'underline', fontSize: '0.8rem' }}>shiningstars.school2022@gmail.com</span>
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center', fontSize: '0.8rem',  mt: -1}}
        >
          "A Centre for Guaranteed excellence"
        </Typography>
      </Box>

      {/* Placeholder on the right */}
      <Box mr={2} style={{ width: '100px', height: '95px', border: '2px solid red',marginLeft: '10px'}} />

    </Box>
      <Box justifyContent="center" textAlign="center">
        <Box mb={1} sx={{ borderBottom: 'double 4px black' ,mt: -0.8}} />
      </Box>

      <Box >
      <Typography
          variant="h6"
          sx={{
            border: '3px solid black', // Very thick black border
            justifyContent: 'center', 
            padding: '1px',           // Padding inside the box
            display: 'flex',   // Shrink to fit the content
            width: 'fit-content',      // Fit width to content
            margin: '0 auto',         
            fontWeight: 1000,
            color: 'black', 
            textAlign: 'center' , 
            fontSize: '1.1rem'
          }}
        >
          END OF TERM III ASSESSMENT REPORT
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
          <span style={{ fontWeight: 900 }}>PUPIL'S NAME: </span> <span style={{ borderBottom: '2px dotted black', paddingRight: '10rem',textTransform: 'uppercase', }}>
          {filteredStudent.name}
            </span>
          </Typography>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 900 }}>  CLASS:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '4rem' ,textTransform: 'uppercase', }}>
                    {filteredStudent.sclassName}
                        </span>
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2} mb={3}>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 900 }}>  SEX:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '6rem' ,textTransform: 'uppercase', }}>
                    {filteredStudent.gender}
                    
                        </span>
          </Typography>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 900 }}>  YEAR:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '6rem',textTransform: 'uppercase',  }}>
                        {/* {admission.age}  */}
                        </span>
          </Typography>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 900 }}>  LIN NO:  </span><span style={{ borderBottom: '2px dotted black', paddingRight: '8rem' ,textTransform: 'uppercase', }}>  
                    {filteredStudent.rollNum}
                        </span>
          </Typography>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 900 }}>  DIV:  </span><span style={{ borderBottom: '2px dotted black', paddingRight: '8rem',textTransform: 'uppercase',  }}>  
                        {/* {admission.gender}  */}
                        </span>
          </Typography>
        </Box>

        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%', // Width of the table
        margin: '0 auto', // Center the table
        border: '1px solid black', // Thick border around the table
        borderRadius: '8px', // Optional: border-radius for rounded corners
        overflow: 'hidden', // Ensure content doesn't overflow
      }}
    >
      {/* Table Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: '#f0f0f0', // Optional: background color for header
          textAlign: 'center',
          // border: '1px solid black',
          fontSize: '0.7rem', 
        }}
      >
        <Box sx={{ flex: 1, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '2px 0' , fontWeight: 'bold'}}>SUBJECT</Box>
        <Box sx={{ flex: 1, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '2px 0' , fontWeight: 'bold'}}>FULL MARKS</Box>
        <Box sx={{ flex: 2, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '2px 0' , fontWeight: 'bold'}}>B.O TERM III EXAMS</Box>
        <Box sx={{ flex: 2, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '2px 0' , fontWeight: 'bold'}}>MID TERM III EXAMS</Box>
        <Box sx={{ flex: 2, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '2px 0' , fontWeight: 'bold'}}>TEACHER'S COMMENT</Box>
        <Box sx={{ flex: 1, borderBottom: '1px solid black', padding: '2px 0' , fontWeight: 'bold'}}>INITIALS</Box>
      </Box>
        {/* tables */}
      <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              borderBottom: '1px solid black', // Thick border between rows
              textAlign: 'center',
              fontSize: '0.8rem', 
            }}
          >
            <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}></Box>
            <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}></Box>
            <Box sx={{ flex: 2, borderRight: '1px solid black', padding: '2px 0' }}>
              <Box display="flex" justifyContent="space-between">
                <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>MARKS</Box>
                <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>AGG</Box>
                <Box sx={{ flex: 1, padding: '2px 0' }}>DIV</Box>
              </Box>
            </Box>
            <Box sx={{ flex: 2, borderRight: '1px solid black', padding: '2px 0' }}>
              <Box display="flex" justifyContent="space-between">
                <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>MARKS</Box>
                <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>AGG</Box>
                <Box sx={{ flex: 1, padding: '2px 0' }}>DIV</Box>
              </Box>
            </Box>
            <Box sx={{ flex: 2, borderRight: '1px solid black', padding: '2px 0' }}></Box>
            <Box sx={{ flex: 1, padding: '2px 0' }}></Box>
      </Box>
      

      {/* Table Body */}
      {filteredStudent ? (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column', // Change to 'column' for vertical layout
      justifyContent: 'space-between',
      width: '100%',
      textAlign: 'center',
    }}
  >
    {filteredStudent.botExamResult.map((result) => {
      const subject = subjectsList.find((sub) => sub._id === result.subName);
      const matchingMidExamResult = filteredStudent.midExamResult.find(
        (result2) => result2.subName === result.subName
      );
      // console.log(subject)
       // Find the grade based on marksObtained for botExamResult
    const grade = result.marksObtained !== null && result.marksObtained !== undefined
    ? gradingList?.find(
        (grading) =>
          result.marksObtained >= grading.from && result.marksObtained <= grading.to
      )?.grade
    : '-'; // Display nothing if marks are null or undefined

    // Find the grade based on marksObtained for matchingMidExamResult
    const midExamGrade = matchingMidExamResult?.marksObtained !== null && matchingMidExamResult?.marksObtained !== undefined
    ? gradingList?.find(
        (grading) =>
          matchingMidExamResult.marksObtained >= grading.from && matchingMidExamResult.marksObtained <= grading.to
      )?.grade
    : '-'; // Display nothing if marks are null or undefined

    const midExamComment = matchingMidExamResult?.marksObtained !== null && matchingMidExamResult?.marksObtained !== undefined
  ? gradingList?.find(
      (grading) =>
        matchingMidExamResult.marksObtained >= grading.from && matchingMidExamResult.marksObtained <= grading.to
    )?.comment
  : '-'; // Display '-' if marks are null or undefined


      return (
        <Box key={result._id} sx={{ display: 'flex', borderBottom: '1px solid black', padding: '2px 0' }}>
          <Box sx={{ flex: 1, borderRight: '1px solid black' }}>
            {subject.subName}
          </Box>
          <Box key={result._id + 'col2'} sx={{ flex: 1, borderRight: '1px solid black' }}>100</Box>
          <Box key={result._id + 'col3'} sx={{ flex: 2, borderRight: '1px solid black' }}>
            <Box display="flex" justifyContent="space-between">
              <Box sx={{ flex: 1, borderRight: '1px solid black' }}>
                {result.marksObtained}

              </Box>
              <Box sx={{ flex: 1, borderRight: '1px solid black' }}>{grade}</Box>
              <Box sx={{ flex: 1 }}></Box>
            </Box>
          </Box>
          <Box sx={{ flex: 2, borderRight: '1px solid black' }}>
            <Box display="flex" justifyContent="space-between">
              <Box sx={{ flex: 1, borderRight: '1px solid black' }}>
                {/* {matchingMidExamResult.marksObtained} */}
                {matchingMidExamResult ? matchingMidExamResult.marksObtained : ''}
                    
              </Box>
              <Box sx={{ flex: 1, borderRight: '1px solid black' }}>{midExamGrade}</Box>
              <Box sx={{ flex: 1 }}></Box>
            </Box>
          </Box>
          <Box key={result._id + 'col5'} sx={{ flex: 2 ,borderRight: '1px solid black'}}>{midExamComment}</Box>
          <Box key={result._id + 'col6'} sx={{ flex: 1 }}>Initials</Box>
        </Box>
      );
    })}
  </Box>
) : (
  <Typography>No subjects available for this class.</Typography>
)}
      {/* Last Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Box sx={{ flex: 1, fontWeight: 'bold', borderRight: '1px solid black', padding: '2px 0' }}>TOTAL</Box>
        <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>{totalCol2}</Box>
        <Box sx={{ flex: 2, borderRight: '1px solid black', padding: '2px 0' }}>

        <Box display="flex" justifyContent="space-between">
          <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>{totalMarksObtained}</Box>
          <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>{totalGrade}</Box>
          <Box sx={{ flex: 1, padding: '2px 0' }}></Box>
        </Box>
        </Box>
        {/* MID TERM  */}
        <Box sx={{ flex: 2, borderRight: '1px solid black', padding: '2px 0' }}>

        <Box display="flex" justifyContent="space-between">
          <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>{totalMarksEnd}
            
          </Box>
          <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>{totalEndGrade}</Box>
          <Box sx={{ flex: 1, padding: '2px 0' }}></Box>
        </Box>

        </Box>
        <Box sx={{ flex: 2, borderRight: '1px solid black', padding: '2px 0' }}></Box>
        <Box sx={{ flex: 1, padding: '2px 0' }}></Box>
      </Box>
         </Box>
      </Box>

      {/* Contact Information */}
      <Box mb={1} mt={1} textAlign="center">
      <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center'  , fontSize: '1rem',textDecoration: 'underline' }} // Inline styles for boldness and color
        >
          PUPIL'S GENERAL CONDUCT
        </Typography>
        
        {/* General conduct */}
        <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%', // Width of the table
        margin: '0 auto', // Center the table
        border: '1px solid black', // Thick border around the table
        borderRadius: '8px', // Optional: border-radius for rounded corners
        overflow: 'hidden', // Ensure content doesn't overflow
      }}
    >
      {/* Table Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: '#f0f0f0', // Optional: background color for header
          textAlign: 'center',
          // border: '1px solid black',
          fontSize: '0.875rem', 
        }}
      >
        <Box sx={{ flex: 1, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '3px 0' , fontWeight: 'bold'}}>DISCIPLINE</Box>
        <Box sx={{ flex: 1, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '3px 0' , fontWeight: 'bold'}}>TIME MANAGEMENT</Box>
        <Box sx={{ flex: 1, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '3px 0' , fontWeight: 'bold'}}>SMARTNESS</Box>
        <Box sx={{ flex: 1, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '3px 0' , fontWeight: 'bold'}}>ATTENDANCE</Box>
      </Box>
      
      {/* Last Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          textAlign: 'center',
        }}
      >
          <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>{filteredStudent.discipline}</Box>
          <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>{filteredStudent.timeManagement}</Box>
          <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>{filteredStudent.smartness}</Box>
          <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '2px 0' }}>{filteredStudent.attendanceRemarks}</Box>
        
        </Box>
    </Box>


        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Class teacher's Comment:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '30rem' }}>
                        {/* {admission.parent_telephone} */}
                        </span>
          </Typography>

        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Signature:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '30rem' }}>
                        {/* {admission.parent_address} */}
                        </span>
            
          </Typography>
        </Box>

        {/* Head  */}
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Head teacher's Comment:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '30rem' }}>
                        {/* {admission.parent_telephone} */}
                        </span>
          </Typography>

        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Signature:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '30rem' }}>
                        {/* {admission.parent_address} */}
                        </span>
            
          </Typography>
        </Box>

      </Box>

      {/* Next of Kin */}
      <Box mt={2}  textAlign="center">
      <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center'  , fontSize: '0.9rem' ,textDecoration: 'underline'}} // Inline styles for boldness and color
        >
          GRADING SCALE
        </Typography>
      </Box>

      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%', // Width of the table
        margin: '0 auto', // Center the table
        border: '1px solid black', // Thick border around the table
        borderRadius: '8px', // Optional: border-radius for rounded corners
        overflow: 'hidden', // Ensure content doesn't overflow
      }}
    >
      {/* Table Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          backgroundColor: '#f0f0f0', // Optional: background color for header
          textAlign: 'center',
          // border: '1px solid black',
        }}
      >
        {gradingList && gradingList.map((grading) => (
            <Box
              key={grading._id}
              sx={{ flex: 1, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '3px 0' }}
            >
              {grading.from} - {grading.to}
            </Box>
          ))}
      </Box>
      
      {/* Last Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {gradingList && gradingList.map((grading) => (
            <Box
              key={grading._id}
              sx={{ flex: 1, borderRight: '1px solid black', padding: '3px 0', fontWeight: 'bold' }}
            >
              {grading.grade}
            </Box>
          ))}
      </Box>
    </Box>


      {/* Medical Information */}
      <Box mb={2} mt={2}>
        <Typography variant="body1" >
          <span style={{ fontWeight: 900, fontSize: "0.9rem" }}>Next term begins on </span>
          <span style={{ borderBottom: '2px dotted black', paddingRight: '10rem' }}>
            {/* {admission.child_medical_info} */}
          </span>
          <span style={{ fontWeight: 900, fontSize: "0.9rem" }}> and ends on </span>
          <span style={{ borderBottom: '2px dotted black', paddingRight: '10rem' }}>
            {/* {admission.child_medical_info} */}
          </span>
        </Typography>

      </Box>

      <Typography 
      variant="h6" 
      fontWeight={700}  // Bold text
      fontStyle="italic" // Italic text
      fontSize="1rem" // Increased font size
      textAlign="center"
    >
      THIS REPORT IS NOT VALID WITHOUT A SCHOOL STAMP
    </Typography>
      {/* </Box> */}
{/* Print Button */}
<Box
        mt={4}
        textAlign="center"
        className="print:hidden" // Tailwind class for print visibility
        sx={{
          '@media print': {
            display: 'none', // Inline style to ensure the button is hidden in print view
          },
        }}
      >
        <Button
          onClick={handlePrint}
          variant="contained"
          color="primary"
          startIcon={<Print />}
        >
          Print
        </Button>
      </Box>
    </Box>
  );
};

export default Prints;
