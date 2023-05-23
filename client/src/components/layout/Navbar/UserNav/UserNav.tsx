import React, { useContext, useState, useEffect } from "react";
import NavItem from "components/layout/Navbar/NavItem";
import ThemeSwitch from "components/general/ThemeSwitch";
import Notification from "components/general/Notification";
import { useHistory, Link } from "react-router-dom";
import { UserContext, UserActionType } from "context/UserContext";
import { getNotifications, removeNotification } from "service";
import {
  FaSignOutAlt,
  FaUserAlt,
  FaHome,
  FaBell,
  FaChartBar,
} from "react-icons/fa";
import DropdownMenuItem from "components/general/DropdownMenu/DropdownMenuItem";
import "./UserNav.scss";
import { NotificationI } from "types/general";
import SearchInput from "components/general/SearchInput/SearchInput";

const UserNav: React.FC = () => {
  const history = useHistory();

  const {
    userState: { user },
    userDispatch,
  } = useContext(UserContext);
  const [notifications, setNotification] = useState<NotificationI[]>([]);

  const handlGetMyNotifications = async () => {
    const { data } = await getNotifications();
    if (!!data) setNotification(data.notifications);
  };

  useEffect(() => {
    handlGetMyNotifications();
    return () => {};
  }, []);

  const goToHomePage = () => {
    history.push("/");
  };

  const logOutUser = () => {
    userDispatch({ type: UserActionType.LOGOUT });
  };
  const removeMessage = async (index: number) => {
    const { status } = await removeNotification({
      notificationId: notifications[index]._id,
    });
    if (status)
      setNotification((notifications) => {
        const newNotification = [...notifications];
        newNotification.splice(index, 1);
        return newNotification;
      });
  };

  return (
    <>
      <form>
        <div className="relative">
          <input
            id="search"
            type="search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search..."
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      <ThemeSwitch />
      <NavItem name="home" onClick={goToHomePage} Icon={FaHome} />
      <NavItem name="dashboard" Icon={FaChartBar} />
      <NavItem
        name="profile"
        offset={{ x: -60, y: 10 }}
        Icon={FaUserAlt}
        label={user.username}
        className="profile-nav"
      >
        <DropdownMenuItem>
          <Link to="/profile">
            <FaUserAlt /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="logout-btn" onClick={logOutUser}>
            <FaSignOutAlt /> logout
          </span>
        </DropdownMenuItem>
      </NavItem>
      <NavItem
        name="notiications"
        onClick={handlGetMyNotifications}
        offset={{ x: -20, y: 10 }}
        className={`notification-nav ${
          notifications.length > 0 ? "badge" : ""
        }`}
        dropDownScrollableAt={400}
        dropDownOnClickClose={false}
        Icon={FaBell}
      >
        {notifications.map(({ _id, title, info, url }, index) => (
          <DropdownMenuItem key={_id}>
            <Notification
              message={info}
              boardTitle={title}
              url={url}
              removeNotification={() => removeMessage(index)}
            />
          </DropdownMenuItem>
        ))}
      </NavItem>
    </>
  );
};

export default UserNav;
