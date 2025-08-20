import { useTranslation } from "react-i18next";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { About, Contact, Dashboard, Services } from "../navigation/path";
import { NavLink } from "react-router-dom";
const pages = [
  {key : "home", redirect:Dashboard},
  {key : "about", redirect:About},
  {key : "services", redirect:Services},
  {key : "contact", redirect:Contact}
]

const socials = [
  {key : "Facebook", redirect : "", icon : FaFacebookF},
  {key : "Twitter", redirect : "", icon : FaTwitter},
  {key : "LinkedIn", redirect : "", icon : FaLinkedinIn}
]
const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-white text-gray-800 border-t border-gray-200 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-semibold">MyApp</h2>
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm font-medium">
          {pages.map((page)=>{
            return(
              <NavLink key={page.key} to={page.redirect} className="hover:text-indigo-600">{t(page.key)}</NavLink>
            )
          })}
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          {socials.map((social)=>{
            return(
              <NavLink key={social.key} aria-label={social.key} to={social.redirect} className="hover:text-blue-600">{<social.icon/>}</NavLink>
            )
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
