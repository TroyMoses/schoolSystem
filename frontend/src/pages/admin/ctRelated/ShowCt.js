import { useEffect, useState } from 'react';
import { IconButton, Box, Menu, MenuItem, ListItemIcon, Tooltip } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../../../redux/userRelated/userHandle';
import { getAllClassTeacherComment } from '../../../redux/ctRelated/ctHandle';
import { BlueButton, GreenButton } from '../../../components/buttonStyles';
import TableTemplate from '../../../components/TableTemplate';

import PostAddIcon from '@mui/icons-material/PostAdd';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import AddCardIcon from '@mui/icons-material/AddCard';
import styled from 'styled-components';
import SpeedDialTemplate from '../../../components/SpeedDialTemplate';
import Popup from '../../../components/Popup';

const ShowCt = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { ClassTeacherCommentList, loading, error, getresponse } = useSelector((state) => state.ClassTeacherComment);
  const { currentUser } = useSelector(state => state.user)

  const adminID = currentUser._id

  useEffect(() => {
    dispatch(getAllClassTeacherComment(adminID, "ClassTeacherComment"));
  }, [adminID, dispatch]);

  if (error) {
    console.log(error)
  }

  const [showPopup, setShowPopup] = useState(false);
  // const [message, setMessage] = useState("");
  const [message ] = useState("");

  const deleteHandler = (deleteID, address) => {
    // console.log(deleteID);
    // console.log(address);
    // setMessage("Sorry the delete function has been disabled for now.")
    // setShowPopup(true);
    dispatch(deleteUser(deleteID, address))
      .then(() => {
        dispatch(getAllClassTeacherComment(adminID, "ClassTeacherComment"));
      })
  }

  const ClassTeacherCommentColumns = [
    { id: 'from', label: 'From', minWidth: 170 },
    { id: 'to', label: 'To', minWidth: 170 },
    { id: 'comment', label: 'Comment', minWidth: 170 },
  ]

  const ClassTeacherCommentRows = ClassTeacherCommentList && ClassTeacherCommentList.length > 0 && ClassTeacherCommentList.map((ClassTeacherComment) => {
    return {
      from: ClassTeacherComment.from,
      to: ClassTeacherComment.to,
      comment: ClassTeacherComment.comment,
      id: ClassTeacherComment._id,
    };
  });

  const ClassTeacherCommentButtonHaver = ({ row }) => {
    const navigate = useNavigate();
    const actions = [
      { icon: <PostAddIcon />, name: 'Add Subjects', action: () => navigate("/Admin/addsubject/" + row.id) },
      { icon: <PersonAddAlt1Icon />, name: 'Add Student', action: () => navigate("/Admin/class/addstudents/" + row.id) },
    ];

    return (
      <ButtonContainer>
        <IconButton onClick={() => deleteHandler(row.id, "ClassTeacherComment")} color="secondary">
          <DeleteIcon color="error" />
        </IconButton>
        <BlueButton variant="contained"
          onClick={() => navigate("/Admin/updatect/" + row.id)}>
          Edit
        </BlueButton>
        <ActionMenu actions={actions} />
      </ButtonContainer>
    );
  };

  const ActionMenu = ({ actions }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
      <>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
          <Tooltip title="Add Students & Subjects">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <h5>Add</h5>
              <SpeedDialIcon />
            </IconButton>
          </Tooltip>
        </Box> */}
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: styles.styledPaper,
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {actions.map((action) => (
            <MenuItem onClick={action.action}>
              <ListItemIcon fontSize="small">
                {action.icon}
              </ListItemIcon>
              {action.name}
            </MenuItem>
          ))}
        </Menu>
      </>
    );
  }

  
  const actions = [
    {
      icon: <AddCardIcon color="primary" />, name: 'Add New Comment',
      action: () => navigate("/Admin/addct")
    },
    {
      icon: <DeleteIcon color="error" />, name: 'Delete All Comments',
      action: () => deleteHandler(adminID, "Sclasses")
    },
  ];

  return (
    <>
      {loading ?
        <div>Loading...</div>
        :
        <>
          {getresponse ?
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <GreenButton variant="contained" onClick={() => navigate("/Admin/addterm")}>
                Add Term
              </GreenButton>
            </Box>
            :
            <>
              {Array.isArray(ClassTeacherCommentList) && ClassTeacherCommentList.length > 0 &&
                <TableTemplate buttonHaver={ClassTeacherCommentButtonHaver} columns={ClassTeacherCommentColumns} rows={ClassTeacherCommentRows} />
              }
              <SpeedDialTemplate actions={actions} />
            </>}
        </>
      }
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />

    </>
  );
};

export default ShowCt;

const styles = {
  styledPaper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1.5,
    '& .MuiAvatar-root': {
      width: 32,
      height: 32,
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  }
}

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;