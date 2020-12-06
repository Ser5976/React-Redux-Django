import React from "react";
import {
    Route,
    Switch
} from 'react-router-dom'

// import NotFound from "../Pages/NotFound";
import MainPage from "../MainPage";

const MyRouter = () => (
         <Switch>
             <Route exact path={'/'} component={MainPage}/>
             {/* <Route component={NotFound} /> */}
         </Switch>
);

export default MyRouter;