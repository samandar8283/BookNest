import ProfilePanel from "../components/profile/ProfilePanel.jsx";
import { Outlet } from "react-router-dom";

const Profile = () => (
  <div className="container">
    <div className="row">
      <div className="col-12 col-lg-4 col-xl-3">
        <ProfilePanel />
      </div>
      <div className="col-12 col-lg-8 col-xl-9">
        <Outlet />
      </div>
    </div>
  </div>
);

export default Profile;