import './style-script/style-script'; // NEVER REMOVE THIS
import CatController from './components/CatClicker/CatClicker';
import SchoolAttendanceController from './components/SchoolAttendance/SchoolAttendance';
import { retain } from './components/Retain/Retain';

console.log('script loads!');
const cat = new CatController();
const sa = new SchoolAttendanceController();
retain();
