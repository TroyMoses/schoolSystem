import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, InputLabel, Typography} from "@mui/material";
import { Select, MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addTerm } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import styled from "styled-components";
import dayjs from 'dayjs';

const AddTerm = () => {
    const currentYear = dayjs().year(); // Get the current year
    const [year] = useState(currentYear); 

    // const [sclassName, setSclassName] = useState("");
    // const [sclassName ] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const [term, setTermName] = useState("");
    const [statu, setStatusName] = useState("");
    const adminID = currentUser._id
    const address = "Term"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        term,
        statu,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addTerm(fields, address))
    };

    useEffect(() => {
        if (status === 'added') {
        navigate('/Admin/terms');
        dispatch(underControl())
        } else if (status === 'error') {
        setMessage("Network Error")
        setShowPopup(true)
        setLoader(false)
        }
    }, [status, navigate, error, response, dispatch]);

    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <Stack sx={{
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
                          Register New Term For The Current Year
                       </Typography>
                    </Stack>
                    <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                    {/* <InputLabel htmlFor="year-select">Year</InputLabel> */}
                        <Select
                            id="year-select"
                            value={year}
                            // onChange={(event) => setYear(event.target.value)} // No need for onChange since entry is fixed
                            required
                            fullWidth
                            variant="outlined"
                            disabled // Make the select field non-editable
                        >
                            <MenuItem value={currentYear}>{currentYear}</MenuItem>
                        </Select>

                        <InputLabel id="term-select-label">Select Term</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            value={term}
                            onChange={(event) => setTermName(event.target.value)}
                            displayEmpty
                            label="Select Term"
                        >
                            <MenuItem value="">
                                <em>Select Term</em>
                            </MenuItem>
                            <MenuItem value="I">Term One</MenuItem>
                            <MenuItem value="II">Term Two</MenuItem>
                            <MenuItem value="III">Term Three</MenuItem>
                        </Select>
                        
                        <InputLabel id="status-select-label">Select Term Status</InputLabel>
                        <Select
                        label="Select Status"
                        value={statu}
                        onChange={(event) => setStatusName(event.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                        </Select>

                        <BlueButton
                        fullWidth
                        size="large"
                        sx={{ mt: 3 }}
                        variant="contained"
                        type="submit"
                        disabled={loader}
                        >
                        {loader ? <CircularProgress size={24} color="inherit" /> : "Create"}
                        </BlueButton>

                        <Button variant="outlined" onClick={() => navigate(-1)}>
                        Back
                        </Button>
                    </Stack>
                    </form>
                </StyledBox>
            </StyledContainer>
            <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
        </>
    )
}

export default AddTerm

const StyledContainer = styled(Box)`
  flex: 1 1 auto;
  align-items: center;
  display: flex;
  justify-content: center;
`;

const StyledBox = styled(Box)`
  max-width: 550px;
  padding: 50px 3rem 50px;
  margin-top: 1rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border: 1px solid #ccc;
  border-radius: 4px;
`;