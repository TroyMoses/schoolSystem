import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Select, MenuItem} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import year from "../../../assets/schoo.jpeg";
import styled from "styled-components";

const AddTerm = () => {
    // const [sclassName, setSclassName] = useState("");
    const [sclassName ] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userState = useSelector(state => state.user);
    const { status, currentUser, response, error, tempDetails } = userState;

    const adminID = currentUser._id
    const address = "Sclass"

    const [loader, setLoader] = useState(false)
    const [message, setMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);

    const fields = {
        sclassName,
        adminID,
    };

    const submitHandler = (event) => {
        event.preventDefault()
        setLoader(true)
        dispatch(addStuff(fields, address))
    };

    useEffect(() => {
        if (status === 'added' && tempDetails) {
            navigate("/Admin/terms/term/" + tempDetails._id)
            dispatch(underControl())
            setLoader(false)
        }
        else if (status === 'failed') {
            setMessage(response)
            setShowPopup(true)
            setLoader(false)
        }
        else if (status === 'error') {
            setMessage("Network Error")
            setShowPopup(true)
            setLoader(false)
        }
    }, [status, navigate, error, response, dispatch, tempDetails]);
    return (
        <>
            <StyledContainer>
                <StyledBox>
                    <Stack sx={{
                        alignItems: 'center',
                        mb: 3
                    }}>
                        <img
                            src={year}
                            alt="term"
                            style={{ width: '80%' }}
                        />
                    </Stack>
                    <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                        <Select
                        label="Select Year"
                        value={year}
                        // onChange={(event) => setYear(event.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        >
                        <MenuItem value="2023">2023</MenuItem>
                        <MenuItem value="2024">2024</MenuItem>
                        <MenuItem value="2025">2025</MenuItem>
                        {/* Add more years as needed */}
                        </Select>

                        <TextField
                        label="Enter Term"
                        variant="outlined"
                        // value={term}
                        // onChange={(event) => setTerm(event.target.value)}
                        required
                        fullWidth
                        />

                        <Select
                        label="Select Status"
                        value={status}
                        // onChange={(event) => setStatus(event.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                        >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="inactive">Inactive</MenuItem>
                        {/* Add more statuses as needed */}
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