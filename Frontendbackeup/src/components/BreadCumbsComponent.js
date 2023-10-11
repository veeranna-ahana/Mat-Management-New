import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { BreadcrumbItem } from "react-bootstrap";
// import { sr } from "date-fns/locale";
// MemoryRouter,    //assign initilal state
{
  /* <MemoryRouter initialEntries={['/inbox']} initialIndex={0}></MemoryRouter> */
} //this will wrap whole return

const BreadcrumbsComponent = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  console.log(pathnames);
  const propertyNames = Object.values(pathnames);
  console.log(propertyNames);

  // function capitalizeWords(arr) {
  //   return arr.map((word) => {
  //     const capitalizedFirst = word.charAt(0).toUpperCase();
  //     const rest = word.slice(1).toLowerCase();
  //     return capitalizedFirst + rest;
  //   });
  // }

  // console.log(capitalizeWords(propertyNames));
  // const finalArr = capitalizeWords(propertyNames);
  // console.log(finalArr);

  return (
    <div style={{ marginLeft: "10px", marginTop: "0px" }}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb" style={{ margin: "0px" }}>
          <li className="breadcrumb-item">
            <a href="#">
              {""}

              {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;

                const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                return last ? (
                  // <typography key={index}>{value}</typography>

                  <typography className="breadcrumb-item active" key={index}>
                    {" "}
                    {value}
                  </typography>
                ) : (
                  // <Link to={to} key={index} style={{ textDecoration: "none" }}>
                  //   {" > "}
                  //   {value}
                  // </Link>
                  <Link
                    className="breadcrumb-item "
                    to={to}
                    key={index}
                    style={{ textDecoration: "none" }}
                  >
                    {" "}
                    {value}
                  </Link>
                );
              })}
            </a>
          </li>
        </ol>
      </nav>
      {/* <Breadcrumb aria-label="breadcrumb" separator=">">
        {finalArr.map((value, index) => {
          const last = index === finalArr.length - 1;

          const to = `/${finalArr.slice(0, index + 1).join("/")}`;

          return last ? (
            <typography key={index}>{value}</typography>
          ) : (
            <Link to={to} key={index} style={{ textDecoration: "none" }}>
              {"->"}
              {value}
            </Link>
          );
        })}
      </Breadcrumb> */}
    </div>
  );
};

export default BreadcrumbsComponent;
