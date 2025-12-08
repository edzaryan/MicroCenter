
import React, {
    createContext,
    useContext,
    useCallback,
    useEffect,
    useState,
    useRef,
} from 'react';

import {
    createBrowserRouter,
    useLocation,
    useNavigate,
    useParams,
    Outlet,
    Link,
} from 'react-router-dom';

import {
    FaCloudUploadAlt,
    FaShoppingCart,
    FaAngleRight,
    FaLinkedinIn,
    FaAngleLeft,
    FaInstagram,
    FaFacebook,
    FaYoutube,
    FaStarHalf,
    FaTiktok,
    FaStar,
    FaEye,
} from 'react-icons/fa';

import { FaRegCircleUser, FaXTwitter } from 'react-icons/fa6';
import { IoMdClose, IoMdEyeOff } from "react-icons/io";
import { MdModeEditOutline } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { CiCamera } from "react-icons/ci";
import { CgClose } from "react-icons/cg";

import UserContext from '../../context/userContext';
import Context from '../../context';

import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import displayINRCurrency from '../helpers/displayCurrency';
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import addToCart from '../helpers/addToCart';
import scrollTop from "../helpers/scrollTop";

import moment from "moment";

import SummaryApi from '../../common';
import role from '../../common/role';

import imageToBase64 from "../../utils/helpers/imageToBase64";
import { toast } from 'react-toastify';

import CategoryWiseProductDisplay from "../../components/CategoryWiseProductDisplay";
import ProductSliderSmall from "../../components/HorizontalCardProduct";
import VerticalProductCard from "../../components/VerticalProductCard";
import AdminUploadProduct from "../../components/AdminUploadProduct";
import AdminEditProduct from "../../components/AdminEditProduct";
import AdminProductCard from "../../components/AdminProductCard";
import ChangeUserRole from "../../components/ChangeUserRole";
import BannerProduct from "../../components/BannerProduct";
import SliderButton from "../../components/SliderButton";
import DisplayImage from "../../components/DisplayImage";
import VerticalCard from "../../components/VerticalCard";
import CategoryList from "../../components/CategoryList";
import SearchInput from '../../components/SearchInput';
import NavLink from "../../components/NavLink";
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import Header from "../../layout/Header";
import Footer from "../../layout/Footer";

import image1 from "../../assets/banner/img1.webp";
import image2 from "../../assets/banner/img2.webp";
import image3 from "../../assets/banner/img3.jpg";
import image4 from "../../assets/banner/img4.jpg";
import image5 from "../../assets/banner/img5.webp";

import image1Mobile from "../../assets/banner/img1_mobile.jpg";
import image2Mobile from "../../assets/banner/img2_mobile.webp";
import image3Mobile from "../../assets/banner/img3_mobile.jpg";
import image4Mobile from "../../assets/banner/img4_mobile.jpg";
import image5Mobile from "../../assets/banner/img5_mobile.png";

import resetPasswordIcons from "../../assets/icons/forgotpasswnedSend.gif";
import loginIcons from "../../assets/icons/signin.gif";
import lock from "../../assets/icons/lock.png";

import CategoryProductPage from "../../pages/CategoryProductPage";
import ForgotPasswordPage from "../../pages/ForgotPasswordPage";
import ProductDetailsPage from "../../pages/ProductDetailsPage";
import SearchProductPage from "../../pages/SearchProductPage";
import AllProductsPage from "../../pages/AllProductsPage";
import AdminPanelPage from "../../pages/AdminPanelPage";
import AllUsersPage from "../../pages/AllUsersPage";
import SignUpPage from "../../pages/SignUpPage";
import LoginPage from "../../pages/LoginPage";
import HomePage from "../../pages/HomePage";
import CartPage from "../../pages/CartPage";
import App from "../../App";

import { ToastContainer } from "react-toastify";

export {
    CategoryWiseProductDisplay,
    fetchCategoryWiseProduct,
    CategoryProductPage,
    createBrowserRouter,
    VerticalProductCard,
    ForgotPasswordPage,
    ProductDetailsPage,
    displayINRCurrency,
    ProductSliderSmall,
    AdminUploadProduct,
    resetPasswordIcons,
    SearchProductPage,
    MdModeEditOutline,
    AdminEditProduct,
    FaCloudUploadAlt,
    AdminProductCard,
    AllProductsPage,
    FaRegCircleUser,
    productCategory,
    AdminPanelPage,
    ToastContainer,
    FaShoppingCart,
    ChangeUserRole,
    imageToBase64,
    createContext,
    BannerProduct,
    AllUsersPage,
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile,
    FaAngleRight,
    CategoryList,
    VerticalCard,
    SliderButton,
    DisplayImage,
    FaLinkedinIn,
    FaAngleLeft,
    useCallback,
    UserContext,
    SearchInput,
    useLocation,
    useNavigate,
    uploadImage,
    FaInstagram,
    SignUpPage,
    loginIcons,
    FaStarHalf,
    useContext,
    SummaryApi,
    FaFacebook,
    FaXTwitter,
    IoMdEyeOff,
    MdModeEdit,
    LoginPage,
    useEffect,
    scrollTop,
    addToCart,
    useParams,
    IoMdClose,
    FaYoutube,
    HomePage,
    CartPage,
    useState,
    IoSearch,
    MdDelete,
    CiCamera,
    FaTiktok,
    NavLink,
    Context,
    CgClose,
    Header,
    Footer,
    image1,
    image2,
    image3,
    image4,
    image5,
    FaStar,
    useRef,
    Button,
    Outlet,
    moment,
    React,
    FaEye,
    toast,
    Link,
    role,
    Logo,
    App,
    lock
}