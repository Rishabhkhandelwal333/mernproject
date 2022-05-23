import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.png";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  navColor2: "white",
  navColor3: "white",
  logoHoverSize: "10px",
  logoHoverColor: "red",
  link1Text: "Home",
  link2Text: "Movies",
  link3Text: "Search",
  link4Text: "Login",
  link5Text:"Profile",
  link1Url: "/",
  link2Url: "/movies",
  link3Url: "/search",
  link4Url: "/login",
  link5Url:"/account",
  link1Size: "1.3vmax",
  link1Color: "black",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "red",
  link1Margin: "1vmax",
  profileIconUrl: "/login",
  profileIconColor: "black",
  searchIconColor: "red",
  cartIconColor: "black",
  profileIconColorHover: "white",
  searchIconColorHover: "white",
  cartIconColorHover: "white",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
