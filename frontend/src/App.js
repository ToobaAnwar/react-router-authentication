import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { checkAuthLoader, loader as tokenLoader } from './util/auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkAuthLoader
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkAuthLoader
          },
        ],
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// Authentication means certain routes should not be accessible by everyone
// after user sents a valid credentials(e.g: username password) to server , server should send a token
// we create some string (token) based on some algo which includes some information such token create on BE
// and sent back this token to client
// special thing about token is its validity check and proven by BE that created that token
// bcz token is created by some private key which is only known by the BE
// so in future request from client to BE we attach those token to that request and BE is able to look
// at that token and validated and see that this token was created by that BE.
// and if its valid taken then permission granted to that resources

// When we login, we're actually performing authentication, which tells our system WHO we are. So
// authentication is about identity. In this case we tell our application who we are by providing a
// username and password.

// The information returned by the login system after authenticating can then include information about
// our permissions. Another word for permissions is authorisations. So authorization is about WHAT we are
// authorised to do.
