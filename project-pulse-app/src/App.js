//import app css
import './App.css';

import { createBrowserRouter,RouterProvider } from 'react-router-dom';


//import components
import Homepage from './components/homepage/Homepage';
import RootComponent from './components/RootComponent';
import ErrorPage from './components/ErrorPage';
import Register from './components/register/Register';
import ForgetPassword from './components/login/ForgetPassword';
import SuperAdmin from './components/superadmin/SuperAdmin';
import Admin from './components/admin/Admin';
import GDO from './components/gdo/GDO';
import ProjectManager from './components/projectmanager/ProjectManager';
import AllUsers from './components/superadmin/AllUsers';
import NewUsers from './components/superadmin/NewUsers';
import BlockedUsers from './components/superadmin/BlockedUsers';
import AllProjects from './components/common_components/AllProjects';
import GetAllAdminProjects from './components/admin/GetAllAdminProjects';
import AddProjects from './components/admin/AddProjects';
import GetAllProjectsGDO from './components/gdo/GetAllProjectsGDO';
import GetAllProjectsPM from './components/projectmanager/GetAllProjectsPM';
import AddProjectsGDO from './components/gdo/AddProjectsGDO';
import Concerns from './components/projectmanager/Concerns';
import ProjectDetailedViewAdmin from './components/admin/ProjectDetailedViewAdmin';


function App() {

  //create router object
  const routerObject=createBrowserRouter([
      {
        path:"",
        element:<RootComponent/>,
        errorElement:<ErrorPage/>,
        children:[
          {
            path:"",
            element:<Homepage/>
          },
          {
            path:"register",
            element:<Register/>
          },
          {
            path:"forget-password",
            element:<ForgetPassword/>
          },
          {
            path:"super-admin",
            element:<SuperAdmin/>,
            children:[
              {
                path:"all-users",
                element:<AllUsers/>
              },
              {
                  path:"",
                  element:<NewUsers/>
              },
              {
                path:"new-users",
                element:<NewUsers/>
            },
              {
                path:"blocked-users",
                element:<BlockedUsers/>
              }
            ]
          },
          {
            path:"admin",
            element:<Admin/>,
            children:[
              {
                path:"all-projects",
                element:<GetAllAdminProjects/>
              },
              {
                path:"",
                element:<GetAllAdminProjects/>
              }
              ,
              {
                path:"add-project",
                element:<AddProjects/>
              },
              {
                path:"project/:project_id",
                element:<ProjectDetailedViewAdmin/>
              }
            ]
          },
          {
            path:"gdo",
            element:<GDO/>,
            children:[
              {
                path:"",
                element:<GetAllProjectsGDO/>
              },
              {
                path:"all-projects",
                element:<GetAllProjectsGDO/>
              },
              {
                path:"add-project",
                element:<AddProjectsGDO/>
              }
            ]
          },
          {
            path:"project-manager",
            element:<ProjectManager/>,
            children:[
              {
                path:"",
                element:<GetAllProjectsPM/>
              },
              {
                path:"all-projects",
                element:<GetAllProjectsPM/>
              },
              {
                path:"concerns",
                element:<Concerns/>
              }
            ]
          }
        ]
      }
  ])


  return (
    <div className="App">
      <RouterProvider router={routerObject}/>

    </div>
  );
}

export default App;
