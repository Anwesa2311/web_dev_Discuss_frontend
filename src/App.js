import { Routes, Route } from 'react-router-dom';

import 'react-notifications/lib/notifications.css';

import NavBar from './components/NavBar';
import ClassroomPage from './pages/ClassroomPage';
import ClassModifier from './pages/ClassModifier';
import NewPost from './pages/NewPost';
import Login from './pages/Login';
import ViewPost from './pages/ViewPost';
import SignUp from './pages/SignUp';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';
import { AppProvider } from './AppContext';
import GuestRoute from './components/GuestRoute';
import PrivateRoute from './components/PrivateRoute';
import SiginSuccessPage from './pages/SigninSuccessPage';

function App() {
  return (
    <AppProvider>
      <NavBar />
      <Routes>
        <Route
          exact
          path={'/'}
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route
          exact
          path={'/signup'}
          element={
            <GuestRoute>
              <SignUp />
            </GuestRoute>
          }
        />
        <Route
          exact
          path={'/signin/success'}
          element={
            <PrivateRoute>
              <SiginSuccessPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path={'/classroom/:classroomId'}
          element={
            <PrivateRoute>
              <ClassroomPage />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path={'/classroom/:classroomId/question/new'}
          element={
            <PrivateRoute>
              <NewPost />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path={'/classroom/:classroomId/question/:questionId'}
          element={
            <PrivateRoute>
              <ViewPost />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path={'/classroom/:classroomId/question/:questionId/edit'}
          element={
            <PrivateRoute>
              <NewPost editMode={true} />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path={'/join'}
          element={
            <PrivateRoute>
              <ClassModifier />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path={'/classroom/:classroomId/edit'}
          element={
            <PrivateRoute>
              <ClassModifier editMode={true} />
            </PrivateRoute>
          }
        />
      </Routes>
      <NotificationContainer />
    </AppProvider>
  );
}

export default App;
