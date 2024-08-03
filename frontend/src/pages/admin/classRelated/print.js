import React from 'react';
import { useSearchParams } from 'react-router-dom';
// import { useList} from '@refinedev/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Print from '@mui/icons-material/Print';
import log from "../../../assets/log.jpg";
import CheckIcon from '@mui/icons-material/Check';

const Prints = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

//   const { data, isLoading, isError } = useList({
//     resource: 'admissions',
//   });

//   const admissions = data?.data ?? [];

//   const admission = admissions.find((admission) => admission._id === id);

  const handlePrint = () => {
    window.print();
  };

//   if (isLoading) return <Typography>Loading...</Typography>;
//   if (isError) return <Typography>Error loading data...</Typography>;

//   if (!admission) return <Typography>No admission found with this ID.</Typography>;

  return (
    <Box className="printable-content -mt-10" sx={{ width: '80%' , mx: 'auto'}}>
    
      <Box display="flex" justifyContent="center" textAlign="center" mb={1}>
        <Box mr={2}>
          <img src={log} alt="Shining" style={{ width: '100px', height: '100px' }} />
        </Box>
        <Box justifyContent="center" textAlign="center">
        <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center' , fontSize: '1.1rem'}} // Inline styles for boldness and color
        >
            SHINING STARS NURSERY AND PRIMARY SCHOOL - VVUMBA
          </Typography>
          <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center' , textDecoration: 'underline' , fontSize: '0.9rem' }} // Inline styles for boldness and color
        >
            Mixed day and boarding
          </Typography>
          <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center'  , fontSize: '0.9rem'}} // Inline styles for boldness and color
        >
            P.O.BOX  31007, TEL: 0773297951, 0753753179, 0772413164
          </Typography>
          <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center'  , fontSize: '0.9rem'}} // Inline styles for boldness and color
        >
            "Arise and shine"
          </Typography>
          <Typography variant="h6" fontWeight={400} >
            <span style={{ fontWeight: 900, color: 'black'  , fontSize: '0.9rem'}}>Email:</span>{' '}
            <span style={{ textDecoration: 'underline' , fontSize: '0.9rem'}}>shiningstars.school2022@gmail.com</span>
          </Typography>
          <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center'  , fontSize: '0.9rem'}} // Inline styles for boldness and color
        >
            "A Centre for Guaranteed excellence"
          </Typography>
        </Box>
      </Box>
      <Box justifyContent="center" textAlign="center">
        <Box mb={2} sx={{ borderBottom: 'double 4px black' }} />
      </Box>

      <Box mb={1}>
      <Typography
          variant="h6"
          sx={{
            border: '4px solid black', // Very thick black border
            justifyContent: 'center', 
            padding: '10px',           // Padding inside the box
            display: 'flex',   // Shrink to fit the content
            width: 'fit-content',      // Fit width to content
            margin: '0 auto',         
            fontWeight: 900,
            color: 'black', 
            textAlign: 'center' , 
            fontSize: '1rem'
          }}
        >
          END OF TERM III ASSESSMENT REPORT
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
          <span style={{ fontWeight: 900 }}>PUPIL'S NAME: </span> <span style={{ borderBottom: '2px dotted black', paddingRight: '10rem' }}>
            {/* {admission.name} */}
            </span>
          </Typography>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 900 }}>  CLASS:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '8rem' }}>
                        {/* {admission.admission_no} */}
                        </span>
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2} mb={5}>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 900 }}>  SEX:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '6rem' }}>
                        {/* {admission.date_of_birth}  */}
                        </span>
          </Typography>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 900 }}>  YEAR:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '6rem' }}>
                        {/* {admission.age}  */}
                        </span>
          </Typography>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 900 }}>  LIN NO:  </span><span style={{ borderBottom: '2px dotted black', paddingRight: '8rem' }}>  
                        {/* {admission.gender}  */}
                        </span>
          </Typography>
          <Typography variant="h6" fontWeight={300} style={{ fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 900 }}>  DIV:  </span><span style={{ borderBottom: '2px dotted black', paddingRight: '8rem' }}>  
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
        border: '4px solid black', // Thick border around the table
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
        }}
      >
        <Box sx={{ flex: 1, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '8px 0' , fontWeight: 'bold'}}>SUBJECT</Box>
        <Box sx={{ flex: 1, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '8px 0' , fontWeight: 'bold'}}>FULL MARKS</Box>
        <Box sx={{ flex: 1, borderRight: '4px solid black', borderBottom: '1px solid black', padding: '8px 0' , fontWeight: 'bold'}}>MID TERM III EXAMS</Box>
        <Box sx={{ flex: 1, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '8px 0' , fontWeight: 'bold'}}>END OF TERM III EXAMS</Box>
        <Box sx={{ flex: 2, borderRight: '1px solid black', borderBottom: '1px solid black', padding: '8px 0' , fontWeight: 'bold'}}>TEACHER'S COMMENT</Box>
        <Box sx={{ flex: 1, borderBottom: '1px solid black', padding: '8px 0' , fontWeight: 'bold'}}>INITIALS</Box>
      </Box>

      {/* Table Body */}
      {Array(4)
        .fill(null)
        .map((_, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              borderBottom: '1px solid black', // Thick border between rows
              textAlign: 'center',
            }}
          >
            <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '8px 0' }}>Subject {rowIndex + 1}</Box>
            <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '8px 0' }}>100</Box>
            <Box sx={{ flex: 1, borderRight: '4px solid black', padding: '8px 0' }}>
              <Box display="flex" justifyContent="space-between">
                <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '8px 0' }}>Mid 1</Box>
                <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '8px 0' }}>Mid 2</Box>
                <Box sx={{ flex: 1, padding: '8px 0' }}>Mid 3</Box>
              </Box>
            </Box>
            <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '8px 0' }}>
              <Box display="flex" justifyContent="space-between">
                <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '8px 0' }}>End 1</Box>
                <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '8px 0' }}>End 2</Box>
                <Box sx={{ flex: 1, padding: '8px 0' }}>End 3</Box>
              </Box>
            </Box>
            <Box sx={{ flex: 2, borderRight: '1px solid black', padding: '8px 0' }}>Comment {rowIndex + 1}</Box>
            <Box sx={{ flex: 1, padding: '8px 0' }}>Initials {rowIndex + 1}</Box>
          </Box>
        ))}

      {/* Last Row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Box sx={{ flex: 1, fontWeight: 'bold', borderRight: '1px solid black', padding: '8px 0' }}>Marks</Box>
        <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '8px 0' }}>Total</Box>
        <Box sx={{ flex: 1, borderRight: '4px solid black', padding: '8px 0' }}>Mid</Box>
        <Box sx={{ flex: 1, borderRight: '1px solid black', padding: '8px 0' }}>End</Box>
        <Box sx={{ flex: 2, borderRight: '1px solid black', padding: '8px 0' }}></Box>
        <Box sx={{ flex: 1, padding: '8px 0' }}></Box>
      </Box>
    </Box>
      </Box>

      {/* Contact Information */}
      <Box mb={1} textAlign="center">
      <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center'  , fontSize: '0.9rem' }} // Inline styles for boldness and color
        >
          CONTACT INFORMATION
        </Typography>
        <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
            <Box display="flex" alignItems="center" flex="1 1 auto" mr={2}>
              <Typography
                variant="h6"
                fontWeight={300}
                style={{ fontSize: "0.9rem" }}
              >
                <span style={{ fontWeight: 900 }}>Parent's/Guardian's Name:</span>
              </Typography>
              <Typography
                variant="h6"
                fontWeight={300}
                style={{ fontSize: "1rem", borderBottom: '2px dotted black', paddingRight: '5rem'}}
              >
                {/* {admission.parent_name} */}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" flex="2 1 0">
              <Typography
                variant="h6"
                fontWeight={300}
                style={{ fontSize: "0.9rem" }}
              >
                <span style={{ fontWeight: 900 }}>Email:</span>
              </Typography>
              <Typography
                variant="h6"
                fontWeight={300}
                style={{ fontSize: "1rem", borderBottom: '2px dotted black', paddingRight: '2rem', marginLeft: '0.5rem' }}
              >
                {/* {admission.parent_email} */}
              </Typography>
            </Box>
          </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Telephone Number:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '5rem' }}>
                        {/* {admission.parent_telephone} */}
                        </span>
            
          </Typography>

          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Relationship with the Pupil:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '5rem' }}>
                        {/* {admission.parent_relationship_with_pupil} */}
                        </span>
           
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Address:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '6rem' }}>
                        {/* {admission.parent_address} */}
                        </span>
            
          </Typography>

          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Village:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '6rem' }}>
                        {/* {admission.parent_village} */}
                        </span>

          </Typography>

          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  LC1:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '6rem' }}>
                        {/* {admission.parent_lc} */}
                        </span>
            
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  NIN No:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '33rem' }}> 
                        {/* {admission.parent_nin} */}
                        </span>
            
          </Typography>
        </Box>
      </Box>

      {/* Next of Kin */}
      <Box mb={1} textAlign="center">
      <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center'  , fontSize: '0.9rem' }} // Inline styles for boldness and color
        >
          NEXT OF KIN
        </Typography>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Name:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '15rem' }}>
                        {/* {admission.next_of_kin_name} */}
                        </span>
            
          </Typography>

          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Gender:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '6rem' }}>
                        {/* {admission.next_of_kin_gender} */}
                        </span>
            
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Telephone Number:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '4rem' }}>
                        {/* {admission.next_of_kin_telephone} */}
                        </span>
            
          </Typography>

          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Relationship with the pupil:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '4rem' }}>
                        {/* {admission.next_of_kin_relationship_with_pupil} */}
                        </span>
            
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" mt={2}>
          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Address:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '6rem' }}>
                        {/* {admission.next_of_kin_address} */}
                        </span>
            
          </Typography>

          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  Village:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '6rem' }}>
                        {/* {admission.next_of_kin_village} */}
                        </span>
            
          </Typography>

          <Typography
            variant="h6"
            fontWeight={300}
            style={{ fontSize: "0.9rem" }}
          >
                    <span style={{ fontWeight: 900 }}>  LC1:</span> <span style={{ borderBottom: '2px dotted black', paddingRight: '6rem' }}>
                        {/* {admission.next_of_kin_lc} */}
                        </span>
            
          </Typography>
        </Box>
      </Box>

      {/* Medical Information */}
      <Box mb={1}>
      <Typography
          variant="h6"
          sx={{ fontWeight: 900, color: 'black', textAlign: 'center'  , fontSize: '0.9rem' }} // Inline styles for boldness and color
        >
          MEDICAL INFORMATION
        </Typography>
        <Typography
          variant="body1"
          mt={1}
          mb={2}
          style={{ fontSize: "0.9rem" }}
        >
                   <span style={{ fontWeight: 900 }}> Does your child have any medical issue(s) of which we need to be aware
          of? </span>
        </Typography>
        <Typography variant="body1">
        <span style={{ fontWeight: 900 , fontSize: "0.9rem"}}>  If YES please explain: </span> <span style={{ borderBottom: '2px dotted black', paddingRight: '30rem' }}>
            {/* {admission.child_medical_info} */}
            </span>
          
        </Typography>
        <Typography
          variant="body1"
          fontWeight={300}
          style={{ fontSize: "1rem" }}
        >
          {/* <span
            style={{
              borderBottom: "1px dotted black",
              display: "inline-block",
              width: "1000px",
            }}
          /> */}
        </Typography>

        <Typography
          variant="body1"
          fontWeight={300}
          style={{ fontSize: "0.9rem" }}
        >
                   <span style={{ fontWeight: 900 }}> I </span> <span style={{ borderBottom: '2px dotted black', paddingRight: '11rem' }}>
                    {/* {admission.parent_name} */}
                      </span>         <span style={{ fontWeight: 900 }}> hereby certify to the best of my knowledge that the above information
          is true and accurate. </span>
        </Typography>
      </Box>

      {/* signtures */}

      <Box display="flex" justifyContent="space-between" >
            <Typography
        variant="h6"
        fontWeight={300}
        fontSize= "0.8rem"
        style={{ fontFamily: 'Cursive', fontStyle: 'italic' }}
      >
        <span style={{ borderBottom: '2px dotted black', paddingRight: '10rem' }}>
            {/* {admission.parent_name.toLowerCase()} */}
            </span>
      </Typography>

      <Typography
        variant="h6"
        fontWeight={300}
        fontSize= "0.8rem"
        style={{ fontFamily: 'Cursive', fontStyle: 'italic' }}
      >
        <span style={{ borderBottom: '2px dotted black', paddingRight: '5rem' }}>
            {/* {admission.createdAt} */}
            </span>
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" >
      <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: 'black'  , fontSize: '0.9rem'}} // Inline styles for boldness and color
        >
          PARENT'S/GUARDIAN'S SIGNATURE
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontWeight: 500, color: 'black'  , fontSize: '0.9rem'}} // Inline styles for boldness and color
        >
          DATE
        </Typography>
      </Box>

      <Typography
          variant="h6" mt={1}
          sx={{ fontWeight: 700, color: 'black', textAlign: 'center'  , fontSize: '0.9rem'}} // Inline styles for boldness and color
        >
        LOCATED ALONG GAYAZA-ZIROBWE ROAD BUSIKA TOWN COUNCIL
      </Typography>

      <Typography variant="h6" fontWeight={400}  fontSize= "0.9rem" textAlign="center" >
        "A CENTRE FOR GUARANTEED EXCELLENCE"
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
