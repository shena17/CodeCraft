import React, { useState, useEffect } from "react";
import "../styles/home.css";
import { Button, OverlayTrigger, Tooltip, Carousel } from "react-bootstrap";
import caro1 from "../images/caro1.png";
import caro2 from "../images/caro2.png";
import caro3 from "../images/caro3.png";
import empicon from "../images/emp-icon.png";
import taskicon from "../images/task-icon.png";
import departicon from "../images/industrial.png";
import projecticon from "../images/analytics.png";
import todoicon from "../images/to-do-list.png";
import chaticon from "../images/chat.png";
import memoicon from "../images/memo.png";
import meeticon from "../images/meet.png";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //TOOLTIP
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Login
    </Tooltip>
  );

  // CAROUSEL
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <div className="main-top">
        <div className="top-container">
          <div className="rightTop"></div>
          <div className="home-main container">
            <div className="left-main">
              <div className="left-inner">
                <p className="lead flex-wrap">
                  <span>Code</span> <span className="me-2">Learn &</span>
                  <span>Collaborate</span>
                </p>
                <p className="flex-wrap  lead-second">
                  A portal where creativity meets logic, unlocking the power to
                  create software and join a vibrant community.
                </p>
                <div className="top-btns">
                  <Button
                    variant="outline-light"
                    href="/codeEditor"
                    className="header-btn register reg-company-btn"
                  >
                    GET STARTED
                  </Button>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={renderTooltip}
                  >
                    <Button
                      variant="outline-light"
                      href="/login"
                      className="header-btn login reg-company-btn login-body"
                    >
                      <i className="fa-sharp fa-solid fa-right-to-bracket"></i>
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
            <div className="right-main img-fluid"></div>
          </div>
        </div>
      </div>
      {/* BODY */}
      <div className="topic topic-intro">FEATURED TOUR PACKAGES</div>
      <div className="topic topic-main">Browse Top Categories</div>

      {/* CATEGORIES */}

      <div className="categories-main">
        {/* UPPER SECTION */}
        <div className="categ-upper container ">
          <div className="left">
            <p className="categ-topic">
              <span>A wider view</span>
              <span>in your team</span>
              <span>management</span>
            </p>
            <section>
              <p className="categ-desc categ-subtopic">
                Automate and manage all your team and internal work in one place
                to simplify your workflow with our solutions.
              </p>
              <Button
                variant="outline-light"
                href="#"
                className="header-btn login reg-company-btn learn-more"
              >
                Learn More<i className="fa-solid fa-chevron-right ms-1"></i>
              </Button>
            </section>
          </div>
          <div className="right">
            <div className="category">
              <div className="categ-icon">
                <img src={taskicon} alt="icon" />
              </div>
              <p className="categ-name">Employee Monitoring</p>
              <p className="categ-desc">
                Measure and boost workforce productivity by capturing and
                analyzing activities in real time.
              </p>
            </div>
            <div className="category">
              <div className="categ-icon">
                <img src={projecticon} alt="icon" />
              </div>
              <p className="categ-name">Project Management</p>
              <p className="categ-desc">
                Enhance performance and boost trust with detailed insights about
                your team's workdays.
              </p>
            </div>
            <div className="category">
              <div className="categ-icon">
                <img src={empicon} alt="icon" />
              </div>
              <p className="categ-name">Task Monitoring</p>
              <p className="categ-desc">
                Allows teams to see which tasks are important for planning,
                testing, tracking, and reporting.
              </p>
            </div>
            <div className="category">
              <div className="categ-icon">
                <img src={departicon} alt="icon" />
              </div>
              <p className="categ-name">Department Management</p>
              <p className="categ-desc">
                Provides information at all levels of a department with cloud
                based staff details.
              </p>
            </div>
          </div>
        </div>

        {/* LOWER SECTION */}

        <div className="categ-upper categ-lower container">
          <div className="left">
            <p className="categ-topic categ-topic-lower">
              <span>Increase transparency</span>
              <span>and maximize</span>
              <span>collaboration</span>
            </p>
            <p className="categ-desc categ-subtopic">
              Communicate quickly and effortlessly making your team to set
              schedules, determine project goals, and set expectations together.
            </p>
            <Button
              variant="outline-light"
              href="#"
              className="header-btn login reg-company-btn learn-more"
            >
              Learn More<i className="fa-solid fa-chevron-right ms-1"></i>
            </Button>
          </div>
          <div className="right">
            <div className="category">
              <div className="categ-icon">
                <img src={todoicon} alt="icon" />
              </div>
              <p className="categ-name">To Do Application</p>
              <p className="categ-desc">
                Manage day-to-day tasks or list everything that is supposed to
                be done.
              </p>
            </div>
            <div className="category">
              <div className="categ-icon">
                <img src={chaticon} alt="icon" />
              </div>
              <p className="categ-name">Chat Application</p>
              <p className="categ-desc">
                Communicate with people within the organization by sending or
                receiving messages in real time.
              </p>
            </div>
            <div className="category">
              <div className="categ-icon">
                <img src={memoicon} alt="icon" />
              </div>
              <p className="categ-name">Memo Notepad</p>
              <p className="categ-desc">
                Quickly record and save any word, text, information, and
                knowledge immediately.
              </p>
            </div>
            <div className="category">
              <div className="categ-icon">
                <img src={meeticon} alt="icon" />
              </div>
              <p className="categ-name">Video Scheduling</p>
              <p className="categ-desc">
                Schedule meetings within the organization and host or attend
                virtual meetings with fellow employees.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="browse">
        <div className="d-flex flex-column bd-highlight mb-3 container">
          <div className="p-2 bd-highlight browse-intro topic">
            FEATURED TOUR PACKAGES
          </div>
          <div className="bd-highlight browse-main topic">
            Make a Difference with your Remote Workspace!
          </div>
          <div className="p-2 bd-highlight text-center browse-btn-div">
            <Button
              variant="outline-light"
              href="#"
              className="header-btn register browse-btn"
            >
              BROWSE ALL CATEGORIES
            </Button>
          </div>
        </div>
      </div>

      {/* CAROUSEL */}
      <div className="container carousel">
        <Carousel activeIndex={index} onSelect={handleSelect} variant="dark">
          <Carousel.Item className="caro-item">
            <div className="testi-item">
              <img src={caro1} alt="testimonial1" />
              <h5>Peter Lawson</h5>
              <p className="profession">CEO</p>
              <div className="rating">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
              </div>
              <p className="testi-desc">
                "Amazing tool and top class support. Workspace helped me above
                and beyond. Genuine service for you to enjoy and move forward!"
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item className="caro-item">
            <div className="testi-item">
              <img src={caro2} alt="testimonial2" />
              <h5>Amy Amrou</h5>
              <p className="profession">Manager</p>
              <div className="rating">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
              </div>

              <p className="testi-desc">
                "I'm a big fan of Workspace because it makes it so much easier
                for me to catch up on my work I may have missed."
              </p>
            </div>
          </Carousel.Item>
          <Carousel.Item className="caro-item">
            <div className="testi-item">
              <img src={caro3} alt="testimonial3" />
              <h5>Jay Doe</h5>
              <p className="profession">Manager</p>
              <div className="rating">
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star"></span>
              </div>
              <p className="testi-desc">
                "The Workspace really got me started on actually building
                something for my business."
              </p>
            </div>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}
