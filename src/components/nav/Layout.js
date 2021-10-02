import React from "react";
import Header from "./Header";

import classes from "./Layout.module.scss";

const Layout = ({ children }, props) => {
    return (
        <>
            <Header props={props} />
            <div className={classes.containerNav}>{children}</div>
        </>
    );
};

export default Layout;