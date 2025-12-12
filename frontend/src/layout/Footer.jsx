import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
      <div className="container mx-auto mt-12 border-t border-gray-300">
        <div className="w-full pt-12 grid gap-4">
          <div className="grid grid-cols-[200px_1fr] xl:grid-cols-[200px_1fr_200px]">
            <div>
              <Link to="/" onClick={handleLogoClick}>
                <Logo w={77} />
              </Link>
            </div>
            <div className="grid gap-16">
              <div className="grid lg:grid-flow-col sm:grid-cols-[auto_auto] gap-14">
                <div className="flex flex-col gap-4">
                  <div className="font-bold uppercase">Get support</div>
                  <Link to="">Help Center</Link>
                  <Link to="">Live chat</Link>
                  <Link to="">Check order status</Link>
                  <Link to="">Refunds</Link>
                  <Link to="">Report abuse</Link>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="font-bold uppercase">Trade Assurance</div>
                  <Link to="">Safe and easy payments</Link>
                  <Link to="">Money-back policy</Link>
                  <Link to="">On-time shipping</Link>
                  <Link to="">After-sales protections</Link>
                  <Link to="">Product monitoring services</Link>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="font-bold uppercase">Sell on AmitShop.com</div>
                  <Link to="">Start selling</Link>
                  <Link to="">Seller Central</Link>
                  <Link to="">Become a Verified Supplier</Link>
                  <Link to="">Partnerships</Link>
                  <Link to="">Download the app for suppliers</Link>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="font-bold uppercase">Get to know us</div>
                  <Link to="">About Alibaba.com</Link>
                  <Link to="">News center</Link>
                  <Link to="">Careers</Link>
                </div>
              </div>
              <div className="grid md:grid-cols-[auto_auto] sm:grid-rows-[auto_auto] gap-7 justify-between">
                <div className="grid grid-flow-col items-center gap-5">
                  <Link to="">
                    <FaXTwitter size={24} />
                  </Link>
                  <Link to="">
                    <FaFacebook size={24} />
                  </Link>
                  <Link to="">
                    <FaInstagram size={24} />
                  </Link>
                  <Link to="">
                    <FaYoutube size={24} />
                  </Link>
                  <Link to="">
                    <FaTiktok size={24} />
                  </Link>
                  <Link to="">
                    <FaLinkedinIn size={24} />
                  </Link>
                </div>
                <div className="grid items-center grid-flow-col md:grid-flow-row lg:grid-flow-col gap-4">
                  <div className="hidden xl:block">
                    Trade on the go with the <a href="" className="underline font-semibold">MicroCenter.com app</a>
                  </div>
                  <Link className="footer-app-link" to="/">
                    <img className="h-10" src="https://s.alicdn.com/@img/imgextra/i4/O1CN01i9Aj641atkjJJ9I6y_!!6000000003388-2-tps-396-132.png" alt="Download from App Store" />
                  </Link>
                  <Link className="footer-app-link" to="/">
                    <img className="h-10" src="https://s.alicdn.com/@img/imgextra/i4/O1CN018KnDNq1JleFgkjLRq_!!6000000001069-2-tps-447-132.png" alt="Download from Google Play" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            <Link to="about" className="hover:underline">About Us</Link>
            <Link to="contacts" className="hover:underline">Contact Us</Link>
            <Link to="privacy" className="hover:underline">Privacy & Security</Link>
            <Link to="terms" className="hover:underline">Terms of Use</Link>
            <Link to="help" className="hover:underline">Help</Link>
          </div>
          <div className="grid justify-center text-sm py-3">
            Copyright © 2009-2024 MicroCenter Inc. All Rights Reserved.
          </div>
        </div>
      </div>
  )
}

export default Footer;
