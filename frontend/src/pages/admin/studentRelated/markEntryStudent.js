import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllStudents } from '../../../redux/studentRelated/studentHandle';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import {
    Paper, Box, IconButton, Button
} from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';

import * as React from 'react';

const MarkEntryStudents = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { studentsList, loading, error, response } = useSelector((state) => state.student);
    const { currentUser } = useSelector(state => state.user);

    useEffect(() => {
        dispatch(getAllStudents(currentUser._id));
    }, [currentUser._id, dispatch]);

    if (error) {
        console.log(error);
    }

    const deleteHandler = (deleteID, address) => {
        dispatch(deleteUser(deleteID, address))
            .then(() => {
                dispatch(getAllStudents(currentUser._id));
            })
    }

    const studentColumns = [
        { id: 'rollNum', label: 'Lin Number', minWidth: 100 },
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'sclassName', label: 'Class', minWidth: 170 },
        { id: 'markEntryStudents', label: 'Marks Entry(Subject)', minWidth: 150 }, // New column for marks entry
    ];

    const studentRows = studentsList && studentsList.length > 0 && studentsList.map((student) => {
        return {
            rollNum: student.rollNum,
            name: student.name,
            sclassName: student.sclassName.sclassName,
            markEntryStudents: (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate(`/Admin/students/student/marks/${student._id}`)}
                >
                    Marks Entry
                </Button>
            ),
            id: student._id,
        };
    })

    const StudentButtonHaver = ({ row }) => {
        return (
            <>
            <BlueButton variant="contained"
                onClick={() => navigate("/Admin/students/student/" + row.id)}>
                View
            </BlueButton>
            </>
        );
    };

    const actions = [
        {
            icon: <PersonAddAlt1Icon color="primary" />, name: 'Save',
            action: () => navigate("/Admin/addstudents")
        },
        {
            icon: <PersonRemoveIcon color="error" />, name: 'Update',
            action: () => deleteHandler(currentUser._id, "Students")
        },
    ];

    return (
        <>
            {loading ?
                <div>Loading...</div>
                :
                <>
                    {response ?
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
                            <GreenButton variant="contained" onClick={() => navigate("/Admin/addstudents")}>
                                Add Students
                            </GreenButton>
                        </Box>
                        :
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            {Array.isArray(studentsList) && studentsList.length > 0 &&
                                <TableTemplate buttonHaver={StudentButtonHaver} columns={studentColumns} rows={studentRows} />
                            }
                            <SpeedDialTemplate actions={actions} />
                        </Paper>
                    }
                </>
            }
        </>
    );
};

export default MarkEntryStudents;
