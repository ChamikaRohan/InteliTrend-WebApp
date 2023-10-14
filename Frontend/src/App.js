import { BrowserRouter as Router, Routes, Switch, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import React, {Component} from 'react';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Logout from './Pages/Logout';
import AboutUs from './Pages/AboutUs';
import FileShow from './Pages/FileShow';
import UserUploads from './Pages/UserUploads';
import ServicesPage from './Pages/ServicesPage';
import FileUpload from './Pages/FileUpload';
import Dashboard from './Pages/Dashboard';
import Doctors from './Pages/DoctorsPage';
import UploadedFilesShow from './Pages/UploadedFilesShow'
import DocSignup from './Pages/DocSignup';
import DocLogin from './Pages/DocLogin';
import DocProfilePage from './Pages/DocProfilePage';
import HeartPage from './Pages/FilesPages/HeartPage';
import BrainPage from './Pages/FilesPages/BrainPage';
import GeneralPage from './Pages/FilesPages/GeneralPage';
import BonePage from './Pages/FilesPages/BonePage';
import DiabeticPage from './Pages/FilesPages/DiabeticPage';
import OtherPage from './Pages/FilesPages/OtherPage';
import TestUp from './Pages/TestUp';
import Show from './Pages/Show';
import OCRTest from './Pages/OCRTest'
import './App.css';
import Appointments from './Components/Appointments';


function App() {
  return (
    <Router basename="/grp7">
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Home" element={<Home/>}/>
      <Route path="/Signup" element={<SignupPage/>}/>
      <Route path="/Login" element={<LoginPage/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Logout" element={<Logout/>}/>
      <Route path="/Aboutus" element={<AboutUs/>}/>
      <Route path="/FileUpload" element={<FileUpload/>}/>
      <Route path="/FileShow" element={<FileShow/>}/>
      <Route path="/Uploads" element={<UserUploads/>}/>
      <Route path="/Services" element={<ServicesPage/>}/>
      <Route path="/Doctors" element={<Doctors/>}/>
      <Route path="/UploadedFiles" element={<UploadedFilesShow/>}/>
      <Route path="/DocSignup" element={<DocSignup/>}/>
      <Route path="/DocLogin" element={<DocLogin/>}/>
      <Route path="/DocProfilePage" element={<DocProfilePage/>}/>
      <Route path="/HeartFiles" element={<HeartPage/>}/>
      <Route path="/BrainFiles" element={<BrainPage/>}/>
      <Route path="/GeneralFiles" element={<GeneralPage/>}/>
      <Route path="/BfractureFiles" element={<BonePage/>}/>
      <Route path="/DiabeticFiles" element={<DiabeticPage/>}/>
      <Route path="/OtherFiles" element={<OtherPage/>}/>
      <Route path="/Up" element={<TestUp/>}/>
      <Route path="/Show" element={<Show/>}/>
      <Route path="/OCR" element={<OCRTest/>}/>
      <Route path="/Appointments" element={<Appointments/>}/>
    </Routes>
    </Router>
  );
}

export default App;
