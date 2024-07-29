import * as React from 'react';
import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Link, useLocation } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import ReportIcon from '@mui/icons-material/Report';
import AssignmentIcon from '@mui/icons-material/Assignment';
import GradeIcon from '@mui/icons-material/Grade';

const SideBar = () => {
    const location = useLocation();
    const activeBgColor = 'rgba(0, 0, 255, 0.5)'; // Light blue background for active links
    const hoverBgColor = 'rgba(0, 0, 255, 0.2)'; // Darker blue on hover

    return (
        <>
            <React.Fragment>
                <ListItemButton 
                    component={Link} 
                    to="/" 
                    sx={{
                        backgroundColor: location.pathname === "/" || location.pathname === "/Admin/dashboard" ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <HomeIcon color={location.pathname === "/" || location.pathname === "/Admin/dashboard" ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                {/* year */}
                <ListItemButton 
                    component={Link} 
                    to="/Admin/years" 
                    sx={{
                        backgroundColor: location.pathname.startsWith('/Admin/years') ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <CalendarTodayIcon color={location.pathname.startsWith('/Admin/years') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Years" />
                </ListItemButton>
                {/* year */}

                {/* term */}
                <ListItemButton 
                    component={Link} 
                    to="/Admin/terms" 
                    sx={{
                        backgroundColor: location.pathname.startsWith('/Admin/terms') ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <CalendarTodayIcon color={location.pathname.startsWith('/Admin/terms') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Terms" />
                </ListItemButton>
                {/* term */}

                <ListItemButton 
                    component={Link} 
                    to="/Admin/classes" 
                    sx={{
                        backgroundColor: location.pathname.startsWith('/Admin/classes') ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <ClassOutlinedIcon color={location.pathname.startsWith('/Admin/classes') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Classes" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/subjects" 
                    sx={{
                        backgroundColor: location.pathname.startsWith("/Admin/subjects") ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/Admin/subjects") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Subjects" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/teachers" 
                    sx={{
                        backgroundColor: location.pathname.startsWith("/Admin/teachers") ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/Admin/teachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/students" 
                    sx={{
                        backgroundColor: location.pathname.startsWith("/Admin/students") ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname.startsWith("/Admin/students") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/grading" 
                    sx={{
                        backgroundColor: location.pathname.startsWith("/Admin/grading") ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <GradeIcon color={location.pathname.startsWith("/Admin/grading") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Grading" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/notices" 
                    sx={{
                        backgroundColor: location.pathname.startsWith("/Admin/notices") ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <AnnouncementOutlinedIcon color={location.pathname.startsWith("/Admin/notices") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Notices" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/complains" 
                    sx={{
                        backgroundColor: location.pathname.startsWith("/Admin/complains") ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <ReportIcon color={location.pathname.startsWith("/Admin/complains") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Complains" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton 
                    component={Link} 
                    to="/Admin/profile" 
                    sx={{
                        backgroundColor: location.pathname.startsWith("/Admin/profile") ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/Admin/profile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton 
                    component={Link} 
                    to="/logout" 
                    sx={{
                        backgroundColor: location.pathname.startsWith("/logout") ? activeBgColor : 'inherit',
                        '&:hover': {
                            backgroundColor: hoverBgColor,
                        },
                    }}
                >
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/logout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </React.Fragment>
        </>
    )
}

export default SideBar;
