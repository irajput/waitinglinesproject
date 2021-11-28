import './Profile.css';
import Checkbox from './Checkbox';
import Switch from './Switch';

function Profile() {
  return (
    <div className="profile">
      <h1>Profile Page</h1>
      <h3>Receive notifications</h3>
      <Switch />
      <div id="container">
        <button id = "dummy-button" className="dummy-button"/>
        <div id = "notification-opts" disabled>
          <h3>Maximum wait time before notification:</h3>
          <input type="number" id="wait-min" name="wait-min" min="1" max="60" />
          <h3>Receive notifications for these halls:</h3>
          <div id="outer">
              <Checkbox className = "inner"/>
              <p className = "inner"> Hall 1 </p>
          </div>
          <div id="outer">
              <Checkbox className = "inner"/>
              <p className = "inner"> Hall 2 </p>
          </div>
          <div id="outer">
              <Checkbox className = "inner"/>
              <p className = "inner"> Hall 3 </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
