
// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Drawer from '@mui/material/Drawer';
// // import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// // import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// //import dayjs from 'dayjs';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';



// import Toolbar from '@mui/material/Toolbar';
// //import { Typography } from '@mui/material';

// const drawerWidth = 350;

// // const SelectedDate = ({selectedDate}) => {
// //   return (
// //     <Typography variant="h6" sx={{ mb: 2 }}>
// //       Selected Date: {selectedDate.format("ddd DD MMMM")}
// //     </Typography>
// //   );
// // };

// export default function CalendarComponent() {

//   // const [selectedDate, setSelectedDate] = React.useState(dayjs);
  
//   // const handleDateChange = (newDate) => {
//   //   setSelectedDate(newDate);
//   // };

//   return (
//     <Box sx={{ display: 'flex' }}>
      
      
//       <Drawer
//         variant="permanent"
//         sx={{
//           backgroundColor: '#C5ECF1',
//           width: drawerWidth,
//           flexShrink: 0,
//           '& .MuiDrawer-paper': {
//             width: drawerWidth,
//             boxSizing: 'border-box',
//             backgroundColor: '#C5ECF1',
//           },
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: 'auto' }}>
//         <Toolbar />
//         {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
//         <DateCalendar
//             sx={{
//                 width: '250px',
//                 height: '310px',
//                 fontSize: '16px',
//             }}
//             />
//         </LocalizationProvider> */}

// <LocalizationProvider dateAdapter={AdapterDayjs}>
//       {/* <SelectedDate sx={{
//                 width: '250px',
//                 height: '310px',
//                 fontSize: '16px',
//             }} selectedDate={selectedDate} /> */}
//       <StaticDatePicker 
      
//         displayStaticWrapperAs="desktop"
//         // value={selectedDate}
//         // onChange={handleDateChange}
//         slotProps={{
//           toolbar: { toolbarFormat: 'ddd DD MMMM', hidden: false },
//         }}
//       />
//     </LocalizationProvider>
//         </Box>
//       </Drawer>

     
    

//     </Box>
//   );
// }