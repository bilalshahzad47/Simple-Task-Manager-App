import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientLayout from "../../components/ClientLayout";
import Login from "../../views/login";
import SignUp from "../../views/signUp";
import ProtectedRoute from "../../views/protectedRoute";
import Profile from "../../views/profile";
import Dashboard from "../../views/dashboard";
import TaskManagement from "../../views/taskManagement";
import TaskDetails from "../../views/taskManagement/taskDetails";
import CreateTask from "../../views/taskManagement/createTask";
import UsersManagement from "../../views/usersManagement";
import CreateProfile from "../../views/profile/createProfile";

const MyRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" index element={<Login />} />
        <Route path="/signUp" index element={<SignUp />} />
        
        <Route
          path="/createProfile"
          index
          element={
            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
            >
              <CreateProfile />
            </ClientLayout>
          }
        />
        <Route
          path="/profile"
          index
          element={
            <ProtectedRoute>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <Profile />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          index
          element={
            <ProtectedRoute>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <Dashboard />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/taskManagement"
          index
          element={
            <ProtectedRoute>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <TaskManagement />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/taskManagement/:id"
          index
          element={
            <ProtectedRoute>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <TaskDetails />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/createTask"
          index
          element={
            <ProtectedRoute>
              <ClientLayout
                head={{ title: "Dashboard", description: "Some Description." }}
                headerStyle={{ height: { base: "40px", md: 14 } }}
              >
                <CreateTask />
              </ClientLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/userManagement"
          index
          element={
            <ProtectedRoute>

            <ClientLayout
              head={{ title: "Dashboard", description: "Some Description." }}
              headerStyle={{ height: { base: "40px", md: 14 } }}
              >
              <UsersManagement />
            </ClientLayout>
              </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default MyRouter;