import React from "react";

// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DefaultFooter from "../components/Footers/DefaultFooter.js";
import IndexHeader from "../components/Headers/IndexHeader.js";


function Index() {
  
	return (
		<>
			<IndexNavbar />
			<div className="wrapper">
				<IndexHeader />
				<section className="home-page-sec-2">
					<div className="container"> 
						<div className="row">
							<div className="col-md-7">
								<h4>Hello, here is your new AI copywriting assistant.</h4>
								<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec consequat eget, eleifend sit amet turpis. Suspendisse sit amet sollicitudin velit. Etiam nulla est.</p>
							</div>
							<div className="col-md-5">
								<img src={require("../assets/images/local-img/hand.png")} alt="" />
							</div> 
						</div>
					</div>
				</section>


				<section className="home-page-sec-3">
					<div className="container"> 
						<h4 className="text-center">What can you create?</h4>
						<div className="row">
							<div className="col-md-4 sec-3-box-1 mb-4">
								<div className="sec-1-box">
									<div className="icon-box"><img src={require("../assets/images/local-img/mike.svg")} alt="" /></div>
									<h5>Digital ad copy</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div>

							<div className="col-md-4 sec-3-box-2 mb-4">
								<div className="sec-1-box">
									<div className="icon-box"><img src={require("../assets/images/local-img/social.svg")} alt="" /></div>
									<h5>Social media content</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div>
							
							<div className="col-md-4 sec-3-box-3 mb-4">
								<div className="sec-1-box">
									<div className="icon-box"><img src={require("../assets/images/local-img/website.svg")} alt="" /></div>
									<h5>Website copy</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div>
							
							<div className="col-md-4 sec-3-box-4 mb-4">
								<div className="sec-1-box">
									<div className="icon-box"><img src={require("../assets/images/local-img/e-com.svg")} alt="" /></div>
									<h5>eCommerce copy</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div>

							<div className="col-md-4 sec-3-box-5 mb-4">
								<div className="sec-1-box">
									<div className="icon-box"><img src={require("../assets/images/local-img/bolg.svg")} alt="" /></div>
									<h5>Blog content</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div>
							
							<div className="col-md-4 sec-3-box-6 mb-4">
								<div className="sec-1-box">
									<div className="icon-box"><img src={require("../assets/images/local-img/sales.svg")} alt="" /></div>
									<h5>Sales copy</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div>

						</div>
					</div>
				</section>

				<section className="home-page-sec-4">
					<div className="container"> 
						<h4 className="text-center">Who are we a perfect fit for?</h4>
						<div className="row">
							<div className="col-md-4">
								<div className="sec-4-box">
									<h5>Sales copy</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div> 
							<div className="col-md-4">
								<div className="sec-4-box">
									<h5>Marketers</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div> 
							<div className="col-md-4">
								<div className="sec-4-box">
									<h5>Agencies</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div> 
						</div>
					</div>
				</section>

				<section className="home-page-sec-5">
					<div className="container"> 
						<h4 className="text-center">Who are we a perfect fit for?</h4>
						<div className="row mb-5">
							<div className="col-md-4">
								<div className="sec-5-box">
									<div className="number-line w-100 ">
										<div className="number">1</div>
										<div className="line-down dn-one"><img src={require("../assets/images/local-img/path-down.svg")} alt="" /></div>
									</div>
									<h5>Choose a skill</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div>

							<div className="col-md-4">
								<div className="sec-5-box">
									<div className="number-line up-line w-100 ">
										<div className="number">2</div>
										<div className="line-down dn-two"><img src={require("../assets/images/local-img/path-up.svg")} alt="" /></div>
									</div>
									<h5>Input your product data</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div>

							<div className="col-md-4">
								<div className="sec-5-box">
									<div className="number-line w-100 ">
										<div className="number">3</div>                  
									</div>
									<h5>Generate AI content</h5>
									<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam purus ligula, faucibus nec.</p>
								</div>
							</div>
					 
						</div>
						<div className="content-box-button w-100 mt-5 text-center d-inline-block">
							<a href="#" className="new-button"> Get started </a>
						</div>
					</div>
				</section>



					<section className="home-page-sec-6 pt-5">
						<div className="container"> 
							<h4 className="text-center">Scale your marketing content infinite times over</h4>
							<div className="row col-container">

								<div className="col-md-3 col">
									<div className="sec-box-6">
										<h5>Empower your Team</h5>
										<p>Give time and bandwidth back to your team, avoid writer’s block and drive unprecedented growth</p>
									</div>
								</div>

								<div className="col-md-3 col">
									<div className="sec-box-6">
										<h5>Optimize workflows</h5>
										<p>Copysmith seamlessly integrates with the tools marketers use every day to save you time and hassle.</p>
									</div>
								</div>

								<div className="col-md-3 col">
									<div className="sec-box-6">
										<h5>Speed through ideation</h5>
										<p>Spend less time on discovery and more time generating content. Support more clients and generate more revenue</p>
									</div>
								</div>

								<div className="col-md-3 col">
									<div className="sec-box-6">
										<h5>Enhance your content</h5>
										<p>Machine learning improves your content over time to continuously generate high quality, growth-driven content at scale</p>
									</div>
								</div>
							</div>
						</div>

					</section>


					<section className="home-page-sec-7">
						<div className="container"> 
							<div className="sec-content text-center d-inline-block w-100">
								<h3>Create Content Faster With Artificial Intelligence</h3>
							</div>							
							<div className="content-box-button w-100 mt-5 text-center d-inline-block"><a href="#" className="new-button">Get started today</a></div>
						</div>
					</section> 
				<DefaultFooter />
			</div>
		</>
	);
}

export default Index;