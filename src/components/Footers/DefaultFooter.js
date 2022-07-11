/*eslint-disable*/
import React from "react";

function DefaultFooter() {
	return (
		<footer className="footer-sec">
			<div className="container"> 
				<div className="row">
					<div className="col-md-4 col-footer">
						<div className="logo-fooer mb-4"><a href="">logo</a></div>
						<div className="fooer-text"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec consequat eget, eleifend sit amet turpis. Suspendisse sit amet sollicitudin velit. Etiam nulla est.</p></div>
						<div className="copyright">© 2021 All rights reserved.</div>
					</div>  
					<div className="col-md-4 col-footer">
						<div className="fooer-title"><h4>Company</h4></div>
						<div className="fooer-list">
							<ul>
								<li><a href="">Install our Chrome extension</a></li>
								<li><a href="">Join our Face book community</a></li>
								<li><a href="">Join our Affiliate program</a></li>
								<li><a href="">Work with us</a></li>
								<li><a href="">Privacy notice</a></li>
								<li><a href="">Terms of service</a></li>
							</ul>
						</div>
					</div>  
					<div className="col-md-4 col-footer">
						<div className="fooer-title"><h4>Support</h4></div>
						<div className="fooer-list">
							<ul>
								<li><a href="">Help center</a></li>
								<li><a href="">View tutorials</a></li>
								<li><a href="">Contact use</a></li>
								<li><a href="">Request a new feature</a></li>
								<li><a href="">Report a bug</a></li>
								<li><a href="">Report an outage</a></li>
							</ul>
						</div>
					</div> 
				</div>
			</div>  
		</footer>
	);
}

export default DefaultFooter;