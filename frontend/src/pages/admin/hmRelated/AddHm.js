import React, { useEffect, useState } from "react";
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { BlueButton } from "../../../components/buttonStyles";
import Popup from "../../../components/Popup";
import styled from "styled-components";

const AddHm = () => {
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
            navigate("/Admin/grades/grade/" + tempDetails._id)
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
                        <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
                            Enter Grading Scale Range
                        </Typography>
                    </Stack>
                    <form onSubmit={submitHandler}>
                    <Stack spacing={3}>
                    <TextField
                        label="From"
                        variant="outlined"
                        // value={term}
                        // onChange={(event) => setTerm(event.target.value)}
                        required
                        fullWidth
                        />

                        <TextField
                        label="To"
                        variant="outlined"
                        // value={term}
                        // onChange={(event) => setTerm(event.target.value)}
                        required
                        fullWidth
                        />

                        <TextField
                        label="Grade"
                        variant="outlined"
                        // value={term}
                        // onChange={(event) => setTerm(event.target.value)}
                        required
                        fullWidth
                        />

                        <TextField
                        label="Comment"
                        variant="outlined"
                        // value={term}
                        // onChange={(event) => setTerm(event.target.value)}
                        required
                        fullWidth
                        />

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

export default AddHm

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