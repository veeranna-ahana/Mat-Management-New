import React from "react";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as FaIcon from "react-icons/fa";
import * as GrIcon from "react-icons/gr";
import * as BsIcon from "react-icons/bs";
import * as MdIcon from "react-icons/md";
import * as SiIcon from "react-icons/si";
import * as MdNewLabel from "react-icons/md";

import { VscTypeHierarchySub } from "react-icons/vsc";
import { BiFoodMenu } from "react-icons/bi";
import { HiUsers } from "react-icons/hi";

export const customerSidebar = [
  /* {
    title: "Setup",
    // path: "/customer",
    icon: <BsIcon.BsListTask />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Server",
        path: "/materialmanagement/server",
        icon: <AiIcons.AiOutlineInfoCircle />,
      },
      
    ],
  },*/
  {
    title: "Receipt",
    // path: "/customer",
    icon: <MdIcon.MdOutlineSummarize />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Customer Job Work",
        // path: "/materialmanagement/receipt/customerjobwork",
        icon: <AiIcons.AiFillCustomerService />,
        subNav: [
          {
            title: "Parts",
            icon: <AiIcons.AiOutlinePartition />,
            subNav: [
              {
                title: "New",
                path: "/MaterialManagement/Receipt/CustomerJobWork/Parts/New",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Draft RV List",
                path: "/MaterialManagement/Receipt/CustomerJobWork/Parts/DraftRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Open RV List",
                path: "/MaterialManagement/Receipt/CustomerJobWork/Parts/OpenRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Closed RV List",
                path: "/MaterialManagement/Receipt/CustomerJobWork/Parts/ClosedRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
            ],
          },
          {
            title: "Units",
            icon: <AiIcons.AiOutlineDeploymentUnit />,
            subNav: [
              {
                title: "New",
                path: "/MaterialManagement/Receipt/CustomerJobWork/Units/New",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Draft RV List",
                path: "/MaterialManagement/Receipt/CustomerJobWork/Units/DraftRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Open RV List",
                path: "/MaterialManagement/Receipt/CustomerJobWork/Units/OpenRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Closed RV List",
                path: "/MaterialManagement/Receipt/CustomerJobWork/Units/ClosedRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
            ],
          },
          {
            title: "Sheets and Others",
            icon: <MdIcon.MdOutlineOtherHouses />,

            subNav: [
              {
                title: "New",
                path: "/MaterialManagement/Receipt/CustomerJobWork/SheetsAndOthers/New",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Draft RV List",
                path: "/MaterialManagement/Receipt/CustomerJobWork/SheetsAndOthers/DraftRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Open RV List",
                path: "/MaterialManagement/Receipt/CustomerJobWork/SheetsAndOthers/OpenRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Closed RV List",
                path: "/MaterialManagement/Receipt/CustomerJobWork/SheetsAndOthers/ClosedRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
            ],
          },
        ],
      },
      {
        title: "Purchase",
        // icon: <AiIcons.AiOutlineInfoCircle />,
        icon: <BiIcons.BiPurchaseTag />,
        subNav: [
          {
            title: "Parts",

            icon: <AiIcons.AiOutlinePartition />,

            subNav: [
              {
                title: "New",
                path: "/MaterialManagement/Receipt/Purchase/Parts/New",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Draft RV List",
                path: "/MaterialManagement/Receipt/Purchase/Parts/DraftRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Open RV List",
                path: "/MaterialManagement/Receipt/Purchase/Parts/OpenRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Closed RV List",
                path: "/MaterialManagement/Receipt/Purchase/Parts/ClosedRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
            ],
          },
          {
            title: "Units",
            icon: <AiIcons.AiOutlineDeploymentUnit />,
            subNav: [
              {
                title: "New",
                path: "/MaterialManagement/Receipt/Purchase/Units/New",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Draft RV List",
                path: "/MaterialManagement/Receipt/Purchase/Units/DraftRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Open RV List",
                path: "/MaterialManagement/Receipt/Purchase/Units/OpenRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Closed RV List",
                path: "/MaterialManagement/Receipt/Purchase/Units/ClosedRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
            ],
          },
          {
            title: "Others",
            icon: <MdIcon.MdOutlineOtherHouses />,

            subNav: [
              {
                title: "New",
                path: "/MaterialManagement/Receipt/Purchase/Others/New",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Draft RV List",
                path: "/MaterialManagement/Receipt/Purchase/Others/DraftRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Open RV List",
                path: "/MaterialManagement/Receipt/Purchase/Others/OpenRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
              {
                title: "Closed RV List",
                path: "/MaterialManagement/Receipt/Purchase/Others/ClosedRVList",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
            ],
          },
          {
            title: "Gas",
            icon: <BiIcons.BiGasPump />,
            subNav: [
              {
                title: "New",
                path: "/MaterialManagement/Receipt/Purchase/Gas/New",
                icon: <AiIcons.AiOutlineArrowRight />,
              },
            ],
          },
        ],
      },
      {
        title: "Branch Transfer",
        path: "/MaterialManagement/Receipt/BranchTransfer",
        icon: <AiIcons.AiOutlineBranches />,
      },
    ],
  },
  {
    title: "Return",
    // path: "/customer",
    icon: <SiIcon.SiMaterialdesignicons />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Customer Job Work",
        // path: "/materialmanagement/return/customerjobwork",
        icon: <AiIcons.AiFillCustomerService />,
        subNav: [
          {
            title: "New",
            path: "/MaterialManagement/Return/CustomerJobWork/New",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Pending Dispatch List",
            path: "/MaterialManagement/Return/CustomerJobWork/PendingDispatchList",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Customer IV List",
            path: "/MaterialManagement/Return/CustomerJobWork/CustomerIVList",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Sales IV List",
            path: "/MaterialManagement/Return/CustomerJobWork/SalesIVList",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Cancelled",
            path: "/MaterialManagement/Return/CustomerJobWork/Cancelled",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
        ],
      },
      {
        title: "Purchase  Planned for future",
        path: "/MaterialManagement/Return/PurchasePlannedForFuture",
        icon: <BiIcons.BiPurchaseTag />,
      },
    ],
  },
  {
    title: "Shop Floor Issue",
    // path: "/customer",
    icon: <BsIcon.BsListTask />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Service",
        // path: "/materialmanagement/shopfloorissue/service",
        icon: <MdIcon.MdMiscellaneousServices />,
        subNav: [
          {
            title: "Parts",
            path: "/MaterialManagement/ShopFloorIssue/Service/Parts",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Units",
            path: "/MaterialManagement/ShopFloorIssue/Service/Units",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
        ],
      },
      {
        title: "ProfileCutting",
        path: "/MaterialManagement/ShopFloorIssue/ProfileCutting",
        icon: <BiIcons.BiCut />,
      },
      {
        title: "IV List Service",
        icon: <MdIcon.MdMiscellaneousServices />,
        subNav: [
          {
            title: "Issued",
            path: "/MaterialManagement/ShopFloorIssue/IVListService/Issued",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Closed",
            path: "/MaterialManagement/ShopFloorIssue/IVListService/Closed",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
        ],
      },
      {
        title: "IV List Profile Cutting",
        icon: <BiIcons.BiCut />,
        subNav: [
          {
            title: "Current",
            path: "/MaterialManagement/ShopFloorIssue/IVListProfileCutting/Current",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Closed",
            path: "/MaterialManagement/ShopFloorIssue/IVListProfileCutting/Closed",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
        ],
      },
    ],
  },
  {
    title: "Shop Floor Returns",
    // path: "/customer",
    icon: <BsIcon.BsListTask />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Pending IV List",
        path: "/MaterialManagement/ShopFloorReturns/PendingList",
        icon: <AiIcons.AiOutlineArrowRight />,
      },
    ],
  },
  {
    title: "Reports",
    // path: "/customer",
    icon: <BsIcon.BsListTask />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Customer",
        icon: <AiIcons.AiFillCustomerService />,
        subNav: [
          {
            title: "Stock Report",
            path: "/MaterialManagement/Reports/Customer/StockList",
            icon: <MdIcon.MdOutlineSummarize />,
          },
          {
            title: "Parts Reports",
            path: "/MaterialManagement/Reports/Customer/PartList",

            icon: <MdIcon.MdOutlineSummarize />,
          },
        ],
      },
      {
        title: "Daily Report",
        path: "/MaterialManagement/Reports/DailyReports",
        icon: <MdIcon.MdOutlineSummarize />,
      },
      {
        title: " Monthly Report",
        path: "/MaterialManagement/Reports/MonthlyReports",
        icon: <MdIcon.MdOutlineSummarize />,
      },
    ],
  },
  {
    title: "Store Management",
    // path: "/customer",
    icon: <SiIcon.SiMaterialdesignicons />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: "Resize Sheets        ",
        path: "/MaterialManagement/StoreManagement/ResizeSheets",
        icon: <MdIcon.MdOutlineOtherHouses />,
      },
      {
        title: "Move Store",
        // path: "/materialmanagement/storemanagement/movestore",
        icon: <MdIcon.MdOutlineOtherHouses />,
        subNav: [
          {
            title: "Customer",
            path: "/MaterialManagement/StoreManagement/MoveStore/Customer",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Change Location",
            path: "/MaterialManagement/StoreManagement/MoveStore/ChangeLocation",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "All",
            path: "/MaterialManagement/StoreManagement/MoveStore/All",

            icon: <AiIcons.AiOutlineArrowRight />,
          },
        ],
      },
      {
        title: " Location List",
        path: "/MaterialManagement/StoreManagement/LocationList",
        icon: <BiIcons.BiPurchaseTag />,
      },
      {
        title: " Stock",
        icon: <BiIcons.BiPurchaseTag />,
        subNav: [
          {
            title: "Stock List",
            path: "/MaterialManagement/StoreManagement/Stock/StockList",
            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Stock Arrival",
            path: "/MaterialManagement/StoreManagement/Stock/StockArrival",

            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Stock Dispatch",
            path: "/MaterialManagement/StoreManagement/Stock/StockDispatch",

            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Stock Ledger",
            path: "/MaterialManagement/StoreManagement/Stock/StockLedger",

            icon: <AiIcons.AiOutlineArrowRight />,
          },
          {
            title: "Opening Stock",
            path: "/MaterialManagement/StoreManagement/Stock/OpeningStock",

            icon: <AiIcons.AiOutlineArrowRight />,
          },
        ],
      },
      {
        title: " Location Stock        ",
        path: "/MaterialManagement/StoreManagement/LocationStock",
        icon: <BiIcons.BiPurchaseTag />,
      },
    ],
  },
  {
    title: "Previous Menu",
    path: "/home",
    icon: <MdIcon.MdPreview />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
  },
];

export const adminSidebar = [
  {
    title: "Access",
    icon: <MdIcon.MdOutlineSecurity />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Menu Roles",
        path: "/admin/menuRoles",
        icon: <AiIcons.AiOutlineMenuFold />,
      },
    ],
  },

  {
    title: "Users",
    icon: <FaIcon.FaUsers />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: "Roles",
        path: "/admin/roles",
        icon: <VscTypeHierarchySub />,
      },
      {
        title: "Menus",
        path: "/admin/menus",
        icon: <BiFoodMenu />,
      },
      {
        title: "Users",
        path: "/admin/users",
        icon: <HiUsers />,
      },
    ],
  },
];
