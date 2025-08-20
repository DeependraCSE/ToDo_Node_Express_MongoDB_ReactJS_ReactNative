import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import {Popover,PopoverButton,PopoverGroup,PopoverPanel} from '@headlessui/react'
import {DocumentTextIcon,UserCircleIcon,EyeSlashIcon,PowerIcon, Cog6ToothIcon} from '@heroicons/react/24/outline'
import { ChevronDownIcon} from '@heroicons/react/20/solid'
import AppLogo from "./../assets/app_logo.png"
import { ChangePassword, Company, Dashboard, Features, Logout, Marketplace, Profile, Setting, TaskList } from '../navigation/path'

const products = [
  { key: 'todo', description: 'todo_description', href: TaskList, icon: DocumentTextIcon }
]

const profileOptions = [
  { key: "profile", href: Profile, icon: UserCircleIcon },
  { key: "change_password", href: ChangePassword, icon: EyeSlashIcon },
  { key: "setting", href: Setting, icon: Cog6ToothIcon },
  { key: "logout", href: Logout, icon: PowerIcon }
]

const pages = [
  {key : "features", redirect:Features},
  {key : "marketplace", redirect:Marketplace},
  {key : "company", redirect:Company}
]

const Header = ()=> {
  const { t } = useTranslation();

  return (
    <header className="bg-white">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <NavLink to={Dashboard} className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src={AppLogo} className="h-8 w-auto" />
          </NavLink>
        </div>
      
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              {t("product")}
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
            >
              {({ close }) => (
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        key={item.key}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-gray-50"
                      >
                        <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                        </div>
                        <div className="flex-auto">
                          <NavLink to={item.href} className="block font-semibold text-gray-900"
                            onClick={()=>close()}>
                            {t(item.key)}
                            <span className="absolute inset-0" />
                          </NavLink>
                          <p className="mt-1 text-gray-600">{t(item.description)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
              
              )}
            </PopoverPanel>
          </Popover>

          {pages.map((page)=>{
            return(
              <NavLink key={page.key} to={page.redirect} className="text-sm/6 font-semibold text-gray-900">{t(page.key)}</NavLink>
            )
          })}         
        </PopoverGroup>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900">
              {t("profile")}
              <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-gray-400" />
            </PopoverButton>

            <PopoverPanel
                transition
                className="absolute right-0 mt-2 w-64 overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition
                          data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
              >
              {({ close }) => (
                  <div className="p-4">
                    {profileOptions.map((item) => (
                      <div
                        key={item.key}
                        className="group relative flex items-center gap-x-3  rounded-lg p-1 text-sm/6 hover:bg-gray-50">
                        <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600" />
                        </div>
                        <div className="flex-auto">
                          <NavLink to={item.href} className="block font-semibold text-gray-900"
                          onClick={()=>close()}>{t(item.key)}</NavLink> 
                        </div>
                      </div>
                    ))}
                  </div>
               )}
            </PopoverPanel>
          </Popover>
        </PopoverGroup>
        </div>
      </nav>
    </header>
  )
}
export default Header