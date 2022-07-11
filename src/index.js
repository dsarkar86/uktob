import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import 'react-notifications/lib/notifications.css';

// styles for this kit
import "./assets/css/bootstrap.min.css";
import "./assets/vendors/perfect-scrollbar/perfect-scrollbar.css";
import "./assets/vendors/bootstrap-icons/bootstrap-icons.css";
import "./assets/css/app.css";
import "./assets/css/font-awesome.min.css";


import "./assets/css/pages/auth.css";
import "./assets/css/custom.css";
import "./assets/css/navbar.css";
// pages for this kit
import Index from "./views/Index.js";
import LoginPage from "./views/pages/LoginPage.js";
import RegisterPage from "./views/pages/RegisterPage.js";
import DashboardPage from "./views/pages/DashboardPage.js";
import DocumentPage from "./views/pages/DocumentPage.js";
import OutputPage from "./views/pages/OutputPage.js";
import TemplatePage from "./views/pages/TemplatePage.js";
import TemplateContentPage from "./views/pages/TemplateContentPage.js";
import CreateProjectPage from "./views/pages/CreateProjectPage.js";
import SettingsPage from "./views/pages/SettingsPage.js";
import CreateProjectEditor from "./views/pages/CreateProjectEditor";
import EditProjectPage from "./views/pages/EditProjectPage";
import Simplepage from "./views/pages/Simplepage";
import PaymentPage from "./views/pages/Payment";


ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Switch>
				<Route path="/index" render={(props) => <Index {...props} />} />
				<Route path="/login" render={(props) => <LoginPage {...props} />} />
				<Route path="/register" render={(props) => <RegisterPage {...props} />} />
				<Route path="/dashboard" render={(props) => <DashboardPage {...props} />} />
				<Route path="/documents" render={(props) => <DocumentPage {...props} />} />
				<Route path="/templates" render={(props) => <TemplatePage {...props} />} />
				<Route path="/outputs" render={(props) => <OutputPage {...props} />} />
				<Route path="/create-template-content/:id" component={TemplateContentPage} />
				<Route path="/edit-project/:id" component={EditProjectPage}/>
				<Route path="/create-project" render={(props) => <CreateProjectPage {...props} />} />
				<Route path="/create-project-edior" render={(props) => <CreateProjectEditor {...props} />} />
				<Route path="/settings" render={(props) => <SettingsPage {...props} />} />
				<Route path="/simplepage" render={(props) => <Simplepage {...props} />} />
				<Route path="/payment" render={(props) => <PaymentPage {...props} />} />
				<Redirect to="/index" />
				<Redirect from="/" to="/index" />
				
			</Switch>
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);

